class Context {
  constructor () {
    this.next = 0
    this.done = false
    this.sent = undefined
  }
  stop () {
    this.done = true
  }
}
const regeneratorRuntime = {
  mark (gen) { return gen },
  wrap (outerFn, innterFn) {
    let iter = {}
    const context = new Context()
    iter.next = function (val) {
      context.sent = val
      const value = outerFn(context)
      return {
        value,
        done: context.done
      }
    }
    return iter
  }
}

var _marked = /*#__PURE__*/regeneratorRuntime.mark(gen);

function gen() {
  var a, b, c;
  return regeneratorRuntime.wrap(function gen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 10;

        case 2:
          a = _context.sent;
          console.log('a: ', a);
          _context.next = 6;
          return 20;

        case 6:
          b = _context.sent;
          console.log('b: ', b);
          _context.next = 10;
          return 20;

        case 10:
          c = _context.sent;
          console.log('c: ', c);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

const g = gen()
console.log(g.next())
console.log(g.next(1))
console.log(g.next(2))
console.log(g.next(3))