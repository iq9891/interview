// 实现 filter 方法
if (!Array.prototype.mozillaMap) {
  (function() {
    Array.prototype.mozillaMap = function(callback) {
      let T;

      if (this == null) {
        throw new TypeError('this is null');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
      }

      if (arguments.length > 1) {
        T = arguments[1];
      }

      const O = Object(this);
      const len = O.length >>> 0;
      const A = new Array(len);
      let k = 0;

      while (k < len) {
        if (k in O) {
          const kValue = O[k];
          let mappedValue = callback.call(T, kValue, k, O);
          A[k] = mappedValue;
        }

        k++;
      }

      return A;
    };

    console.time('mozillaMap');
    console.log([1, 2, 3, 4, 5].mozillaMap((aa) => aa * 2));
    console.timeEnd('mozillaMap');
  })();
}

if (!Array.prototype.forMap) {
  (function() {
    Array.prototype.forMap = function(callback) {
      if (this == null) {
        throw new TypeError('this is null');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
      }

      let context;

      if (arguments.length > 1) {
        context = arguments[1];
      }

      let arr = Array.prototype.slice.call(this);
      let mappedArr = new Array();
      for (let i = 0; i < arr.length; i++) {
        if (i in arr) {
          mappedArr[i] = callback.call(context, arr[i], i, this);
        }
      }
      return mappedArr;
    };

    console.time('forMap');
    console.log([1, 2, 3, 4, 5].forMap((aa) => aa * 2));
    console.timeEnd('forMap');
  })();
}

if (!Array.prototype.reduceMap) {
  (function() {
    Array.prototype.reduceMap = function(callback) {
      if (this == null) {
        throw new TypeError('this is null');
      }

      if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
      }

      let context;

      if (arguments.length > 1) {
        context = arguments[1];
      }

      let arr = Array.prototype.slice.call(this);

      return arr.reduce((pre, cur, idx) => {
        return [...pre, callback.call(context, cur, idx, this)];
      }, []);
    };

    console.time('reduceMap');
    console.log([1, 2, 3, 4, 5].reduceMap((aa) => aa * 2));
    console.timeEnd('reduceMap');
  })();
}

console.time('true map');
console.log([1, 2, 3, 4, 5].map((bb) => bb * 2));
console.timeEnd('true map');
