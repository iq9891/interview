// 实现 reduce 方法
if (!Array.prototype.mozillaDeduce) {
  Object.defineProperty(Array.prototype, 'mozillaDeduce', {
    value: function(callback) {
      if (this == null) {
        throw new TypeError('this is null');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('请使用函数');
      }

      const O = Object(this);
      const len = O.length >>> 0;

      let k = 0;
      let value;

      if (arguments.length > 1) {
        value = arguments[1];
      } else {
        while (k < len && !(k in O)) {
          k++;
        }

        if (k >= len) {
          throw new TypeError('空数组，并没有后面的初始值');
        }

        value = O[k++];
      }

      while (k < len) {
        if (k in O) {
          value = callback(value, O[k], k, O);
        }

        k++;
      }

      return value;
    },
  });

  console.time('mozillaDeduce');
  console.log([1, 2, 3, 4, 5].mozillaDeduce((aa, item) => aa + item));
  console.timeEnd('mozillaDeduce');

  console.time('mozillaDeduce1');
  console.log([].mozillaDeduce((aa, item) => aa + item));
  console.timeEnd('mozillaDeduce1');
}

console.time('reduce');
console.log([1, 2, 3, 4, 5].reduce((aa, item) => aa + item));
console.timeEnd('reduce');
