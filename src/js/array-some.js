// 实现 some 方法
if (!Array.prototype.mozillaSome) {
  Array.prototype.mozillaSome = function(callback) {
    if (this == null) {
      throw new TypeError('this is null');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }

    const O = Object(this);
    const len = O.length >>> 0;
    const target = arguments.length > 1 ? arguments[1] : void 0;

    for (let idx = 0; idx < len; idx++) {
      if (idx in O) {
        if (callback.call(target, O[idx], idx, O)) {
          return true;
        }
      }
    }

    return false;
  };

  console.time('mozillaSome');
  console.log([1, 2, 3, 4, 5].mozillaSome((aa) => aa > 3));
  console.timeEnd('mozillaSome');
}

if (!Array.prototype.mySome) {
  Array.prototype.mySome = function(callback) {
    if (this == null) {
      throw new TypeError('this is null');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('callback must be a function');
    }

    const arr = Array.prototype.slice(this);

    if (!arr.length) {
      return false;
    }

    let T;

    if (arguments.length > 1) {
      T = arguments[1];
    }

    for (let idx = 0; idx < arr.length; idx++) {
      if (idx in arr) {
        const res = callback.call(T, arr[idx], idx, this);
        if (res) {
          return true;
        }
      }
    }

    return false;
  };

  console.time('mySome');
  console.log([1, 2, 3, 4, 5].mySome((aa) => aa > 3));
  console.timeEnd('mySome');
}

console.time('some');
console.log([1, 2, 3, 4, 5].some((aa) => aa > 3));
console.timeEnd('some');
