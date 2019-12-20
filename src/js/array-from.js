// 实现 from 方法
if (!Array.mozillaFrom) {
  Array.mozillaFrom = (function() {
    const isCallable = (fn) => {
      const toStr = Object.prototype.toString;
      return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
    };

    const toInteger = (value) => {
      const number = Number(value);
      if (isNaN(number)) {
        return 0;
      }
      if (number === 0 || !isFinite(number)) {
        return number;
      }
      return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
    };

    const maxSafeInteger = Math.pow(2, 53) - 1;

    const toLength = (value) => {
      const len = toInteger(value);
      return Math.min(Math.max(len, 0), maxSafeInteger);
    };

    return function(arrayLike /*, mapFn, thisArg */) {
      const C = this;

      const items = Object(arrayLike);

      if (arrayLike == null) {
        throw new TypeError('this is null');
      }

      const mapFn = arguments.length > 1 ? arguments[1] : void undefined;
      let T;

      if (typeof mapFn !== 'undefined') {
        if (!isCallable(mapFn)) {
          throw new TypeError('当有第二个参数的时候，第二个参数必须是函数');
        }

        if (arguments.length > 2) {
          T = arguments[2];
        }
      }

      const len = toLength(items.length);

      const A = isCallable(C) ? Object(new C(len)) : new Array(len);

      let k = 0;
      let kValue;

      while (k < len) {
        kValue = items[k];

        if (mapFn) {
          A[k] =
            typeof T === 'undefined'
              ? mapFn(kValue, k)
              : mapFn.call(T, kValue, k);
        } else {
          A[k] = kValue;
        }

        k++;
      }

      A.length = len;

      return A;
    };
  })();

  console.time('mozillaFrom');
  console.log(
    Array.mozillaFrom({ length: 5 }, (v, i) => i),
    'mozillaFrom'
  );
  console.timeEnd('mozillaFrom');
}

console.time('from');
console.log(
  Array.from({ length: 5 }, (v, i) => i),
  'from'
);
console.timeEnd('from');
