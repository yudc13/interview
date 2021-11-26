;(() => {
	// 存放所有模块
	var modules = {}
	var caches = {}
	function require(moduleId) {
		const cachedModule = caches[moduleId]
		if (cachedModule !== undefined) {
			return cachedModule.exports
		}
		var module = (caches[moduleId] = { exports: {} })
		modules[moduleId].call(module.exports, module, module.exports, require)
		return module.exports
	}
	require.p = '/'
	// 返回代码块的文件名
	require.u = (chunkId) => {
		return chunkId + '.js'
	}
	require.f = {}
	// 表示已经安装的模块 0 表示已经加载完毕
	let installedChunks = {
		bundle: 0,
		// title: [resolve, reject]
	}
	// 通过jsonp异步加载chunkId
	require.f.j = (chunkId, promises) => {
		let promise = new Promise((resolve, reject) => {
			installedChunks[chunkId] = [resolve, reject]
		})
		promises.push(promise)
		// 发请求
		// require.p publicPath
		var url = require.p + require.u(chunkId)
		require.l(url)
	}
	require.l = (url) => {
		let script = document.createElement('script')
		script.url = url
		document.head.appendChild(script)
	}
	var webpackJsonpCallback = ([moduleIds, moreModules]) => {
    moduleIds.forEach(chunkId => installedChunks[chunkId][0]())
		// 遍历所有的模块
		// 将异步加载的模块 全部放到modules中去
		for (moduleId in moreModules) {
			modules[moduleId] = moreModules[moduleId]
		}
	}
	var chunkLoadingGlobal = (window['webpackChunk_15_webpack'] = [])
	chunkLoadingGlobal.push = webpackJsonpCallback
	require.e = (chunkId) => {
		var promises = []
		require.f.j(chunkId, promises)
		return Promise.all(promises)
	}
})()
