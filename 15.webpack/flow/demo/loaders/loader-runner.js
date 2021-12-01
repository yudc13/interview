const fs = require('fs')
const path = require('path')

const readFile = fs.readFileSync.bind(this)

// 分割路径 查询参数
let PATH_QUERY_FARGMENT_REG = /^([^?#]*)(\?[^#]*)?(#.*)?$/
const parsePathQueryFargment = (resource) => {
	let result = PATH_QUERY_FARGMENT_REG.exec(resource)
	return {
		path: result[1], // 资源路径
		query: result[2], // 查询参数
		fargment: result[3], //锚点
	}
}

// 处理loaders
const createLoaderObjects = (request) => {
	const loader = {
		path: '', // loader的绝对路径
		query: '', // loader的查询参数
		fargment: '',
		normal: null, // loader函数
		pitch: null, // loader的pitch函数
		raw: false, // 是否需要将结果转为Buffer
		data: {}, // loader的自定义数据
		normalExecuted: false, // loader是否已经执行
		pitchExecuted: false, // pitch函数是否已经执行过了
	}
	// 请求的loader路径
	Object.defineProperty(loader, 'request', {
		get() {
			return `${loader.path}${loader.query}${loader.fargment}`
		},
		set(request) {
			const { path, query, fargment } = parsePathQueryFargment(request)
			loader.path = path
			loader.query = query
			loader.fargment = fargment
		},
	})
	loader.request = request
	const normal = require(loader.request)
	loader.normal = normal
	loader.pitch = normal.pitch
	loader.raw = normal.raw
	return loader
}

//执行loader的pitch方法
// 依次执行loader的pitch方法
const iteratePitchingLoaders = (processOptions, loaderContext, callback) => {
	const { loaders, loaderIndex, remainingRequest, previousRequest, data } = loaderContext
	// pitch已经全部执行完了
	// 开始读取文件
	if (loaderIndex > loaders.length - 1) {
		return processResource(processOptions, loaderContext, callback)
	}
	// 当前的loader
	const currentLoader = loaders[loaderIndex]
	// 已经执行过了 跳过执行下一个
	if (currentLoader.pitchExecuted) {
		loaderContext.loaderIndex += 1
		return iteratePitchingLoaders(processOptions, loaderContext, callback)
	}
	const pitch = currentLoader.pitch
	// 表示已经执行过了
	currentLoader.pitchExecuted = true
	// 没有pitch 直接执行下一个loader的pitch
	if (!pitch) {
		return iteratePitchingLoaders(processOptions, loaderContext, callback)
	}
	// 执行pitch
	runSyncOrAsync(
		pitch,
		loaderContext,
		[remainingRequest, previousRequest, data],
		(err, ...args) => {
			// pitch方法有返回值
			if (args.length && args[0]) {
				loaderIndex--
				// 执行normal
				iterateNormalLoaders(processOptions, loaderContext, callback)
			} else {
				// 继续执行下一个pitch
				iteratePitchingLoaders(processOptions, loaderContext, callback)
			}
		}
	)
}

// 执行normal
const iterateNormalLoaders = (processOptions, loaderContext, args, callback) => {
	// 说明所有的normal执行完了
	if (loaderContext.loaderIndex < 0) {
		callback(null, args)
	} else {
		const { loaderIndex, loaders } = loaderContext
		const currentLoader = loaders[loaderIndex]
		if (currentLoader.normalExecuted) {
			loaderContext.loaderIndex--
			return iterateNormalLoaders(processOptions, loaderContext, args, callback)
		}
		const normal = currentLoader.normal
		currentLoader.normalExecuted = true
		// 转换参数
		convertArgs(args, currentLoader.raw)
		runSyncOrAsync(normal, loaderContext, args, (err, vals) => {
			if (err) {
				callback(err)
			} else {
				iterateNormalLoaders(processOptions, loaderContext, vals, callback)
			}
		})
	}
}

const convertArgs = (args, raw) => {
	if (raw && !Buffer.isBuffer(args[0])) {
		args[0] = Buffer.from(args[0])
	} else if (!raw && Buffer.isBuffer(args[0])) {
		args[0] = args[0].toString('utf8')
	}
}

// 读文件
const processResource = (processOptions, loaderContext, callback) => {
	// 重置索引
	// 倒序
	loaderContext.loaderIndex = loaders.length - 1
	const { readResource, resourcePath } = loaderContext
	// 读文件
	readResource(resourcePath, (err, buffer) => {
		if (err) {
			callback(err)
		} else {
			processOptions.resourceBuffer = buffer
			// 开始执行normal
			iterateNormalLoaders(processOptions, loaderContext, [buffer], callback)
		}
	})
}

const runSyncOrAsync = (pitch, loaderContext, args, callback) => {
	// 是否是同步
	let isSync = true
	// 是否执行完成
	let isDone = false
	// 同步回调
	// 调用就说嘛执行完毕
	const innerCallback = (loaderContext.callback = function (err, args) {
		isDone = true
		isSync = true
		callback(err, ...args)
	})
	// 异步回调
	loaderContext.async = function () {
		isSync = false
		return innerCallback
	}
	// 执行pitch函数
	// 返回值可有可无
	const result = pitch.apply(loaderContext, ...args)
	if (isSync) {
		isDone = true
		return callback(null, result)
	}
}

/**
 *
 * @param {*} options { resource: 需要加载和转换的资源，loaders: loader绝对路径，context: loader上下文，readResoource：读取文件的方法 }
 * @param {*} callback
 */
function runLoaders(options, callback) {
	let {
		resource = '',
		loaders = [],
		context: loaderContext = {},
		readResource = readFile,
	} = options

	const splittedResource = parsePathQueryFargment(resource)
	let { path: resourcePath, query: resourceQuery, fargment: resourceFargment } = splittedResource

	// 拿到相对于资源的父路径
	// 比如resource: /User/src/index.ts
	// 那么contextDirectory = /User/src/
	const contextDirectory = path.dirname(resourcePath)

	// 处理loader上下文对象
	loaderContext.context = contextDirectory
	loaderContext.readResource = readResource
	loaderContext.resourcePath = resourcePath
	loaderContext.resourceQuery = resourceQuery
	loaderContext.resourceFargment = resourceFargment
	//当前执行loader的索引
	loaderContext.loaderIndex = 0
	// 处理loaders
	loaderContext.loaders = loaders.map(createLoaderObjects)
	// 同步loader
	loaderContext.callback = null
	// 异步loader
	loaderContext.async = null

	// 要加载的资源
	// /User/src/index.ts
	Object.defineProperty(loaderContext, 'resource', {
		get() {
			const { resourcePath, resourceQuery, resourceFargment } = loaderContext
			return `${resourcePath}${resourceQuery}${resourceFargment}`
		},
	})
	// 要加载的资源 包含loader信息
	// loader1!loader2!/User/src/index.ts
	Object.defineProperty(loaderContext, 'request', {
		get() {
			const { loaders, resource } = loaderContext
			return loaders
				.map((l) => l.request)
				.concat(resource)
				.join('!')
		},
	})

	// 剩下的loaders请求
	Object.defineProperty(loaderContext, 'remainingRequest', {
		get() {
			const { loaders, loaderIndex, resource } = loaderContext
			return loaders
				.slice(loaderIndex + 1)
				.concat(resource)
				.join('!')
		},
	})
	// 已经处理的loaders请求
	Object.defineProperty(loaderContext, 'previousRequest', {
		get() {
			const { loaders, loaderIndex, resource } = loaderContext
			return loaders.slice(0, loaderIndex).concat(resource).join('!')
		},
	})
	// 当前的loader请求
	Object.defineProperty(loaderContext, 'currentRequest', {
		get() {
			const { loaders, loaderIndex, resource } = loaderContext
			return loaders.slice(loaderIndex).concat(resource).join('!')
		},
	})
	// 当前loader的query
	Object.defineProperty(loaderContext, 'query', {
		get() {
			const { loaders, loaderIndex } = loaderContext
			const currentLoader = loaders[loaderIndex]
			return currentLoader ? currentLoader.options || currentLoader.query : ''
		},
	})
	// pitch阶段和normal阶段共享的数据
	Object.defineProperty(loaderContext, 'data', {
		get() {
			const { loaders, loaderIndex } = loaderContext
			return loaders[loaderIndex] ? loaders[loaderIndex].data : {}
		},
	})

	let processOptions = {
		resourceBuffer: null,
		readResource,
	}

	// 执行loader的pitch
	iteratePitchingLoaders(processOptions, loaderContext, (err, result) => {
		callback(err, { result, resourceBuffer: processOptions.resourceBuffer })
	})
}

exports.runLoaders = runLoaders
