// 实现 filter 方法
if (!Array.prototype.forFilter) {
  Array.prototype.forFilter = function(callback) {
    if (this == null) {
      throw new TypeError('this is null');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('请使用函数');
    }

    let T;

    if (arguments.length > 1) {
      T = arguments[1];
    }

    const arr = Array.prototype.slice.call(this);

    const filterArr = [];

    for (let i = 0; i < arr.length; i++) {
      if (i in arr) {
        if (callback.call(T, arr[i], i, this)) {
          filterArr.push(arr[i]);
        }
      }
    }

    return filterArr;
  };

  console.time('forFilter');
  console.log([1, 2, 3, 4, 5].forFilter((aa) => aa > 3));
  console.timeEnd('forFilter');
}

if (!Array.prototype.reduceFilter) {
  Array.prototype.reduceFilter = function(callback) {
    if (this == null) {
      throw new TypeError('this is null');
    }

    if (typeof callback !== 'function') {
      throw new TypeError('请使用函数');
    }

    let T;

    if (arguments.length > 1) {
      T = arguments[1];
    }

    const arr = Array.prototype.slice.call(this);

    return arr.reduce((pre, cur, idx) => {
      return callback.call(T, cur, idx, this) ? [...pre, cur] : [...pre];
    }, []);
  };

  console.time('reduceFilter');
  console.log([1, 2, 3, 4, 5].reduceFilter((aa) => aa > 3));
  console.timeEnd('reduceFilter');
}

console.time('filter');
console.log([1, 2, 3, 4, 5].filter((aa) => aa > 3));
console.timeEnd('filter');
