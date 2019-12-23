// 实现 isPlainObject 方法，判断是否普通对象
const isPlainObject = (value) => {
  if (
    !value ||
    typeof value !== 'object' ||
    {}.toString.call(value) !== '[object Object]'
  ) {
    return false;
  }

  const proto = Object.getPrototypeOf(value);

  if (proto === null) {
    return true;
  }

  try {
    const Ctor =
      Object.prototype.hasOwnProperty.call(proto, 'constructor') &&
      proto.constructor;
    return (
      typeof Ctor === 'function' &&
      Ctor instanceof Ctor &&
      Function.prototype.toString.call(Ctor) ===
        Function.prototype.toString.call(Object)
    );
  } catch (e) {
    return false;
  }
};

console.time('isPlainObject');
console.log('[1, 2, 3, 4, 5] =>', isPlainObject([1, 2, 3, 4, 5]));
console.log('{} =>', isPlainObject({}));
console.timeEnd('isPlainObject');
