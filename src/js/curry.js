function curry(fn) {
  const c = (...args) =>
    args.length === fn.length
      ? fn(...args)
      : (...args2) => c(...args, ...args2);

  return c;
}

const add = (a, b, c, d) => a + b + c + d;
const curryAdd = curry(add);

console.log(curryAdd(1)(2)(3)(4));

const add2 = (a) => a + 1;
const curryAdd2 = curry(add2);

console.log(curryAdd2(1));
