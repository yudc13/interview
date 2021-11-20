
/**
 * 箭头函数注意点：
 * 1. 函数体的this对象，就是定义时所在的对象，也就是当前函数定义时所在的上下文
 * 2. 不能当做构造函数，箭头函数没有prototype
 * 3. 箭头函数不能使用arguments对象 super new.target
 * 4. 不能使用yield，因为箭头函数不能用做Generator函数
 * 
 * 不实用箭头函数的情况：
 * 1. 对象的方法
 * 2. dom事件绑定
 */


function a () {
  console.log('a--> ', new.target) // 检测是否通过new调用
  function b () {
    console.log('b--> ', new.target)
  }
  b()
}
a()

const fn = () => {
  console.log('fn', new.target)
  return 'fn'
}

// 没有返回值
const f = () => void fn()
console.log(f())


function foo() {
  setTimeout(() => {
    console.log('id:', this.id);
  }, 100);
}
var id = 21;
foo.call({ id: 42 });
// id: 42 如果不使用箭头函数 id: 21 (Window)