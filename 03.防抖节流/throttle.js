function throttle (fn, delay) {
  let last = new Date().getTime()
  const context = this
  return function () {
    let current = new Date().getTime()
    if (current - last >= delay) {
      fn.apply(context, arguments)
      last = current
    }
  }
}

function throttle2 (fn, delay) {
  let timer
  return function () {
    const context = this
    const args = arguments
    if (!timer) {
      timer = setTimeout(function () {
        timer = null
        fn.apply(context, args)
      }, delay)
    }
  }
}

function throttle3 (fn, delay) {
  // 记录上一次触发的时间
  let last = new Date().getTime()
  let timer
  return function () {
    const context = this
    const args = arguments
    // 当前时间
    const current = new Date().getTime()
    clearTimeout(timer)
    if (current - last >= delay) {
      last = current
      // 执行函数
      fn.apply(context, args)
    } else {
      timer = setTimeout(() => fn.apply(context, args), delay)
    }
  }
}