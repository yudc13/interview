function debounce (fn, delay, immediate) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    if (immediate) {
      fn.apply(context, args)
      immediate = false
    } else {
      timer = setTimeout(() => fn.apply(context, args), delay)
    }
  }
}