function createObject (o) {
  const clone = Object.create(o)
  // 添加额外的属性 方法
  clone.say = function () {
    console.log('say...')
  }
  return clone
}