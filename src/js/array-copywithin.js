// 实现 copyWithin 方法
if (!Array.prototype.mozillaCopyWithin) {
  Array.prototype.mozillaCopyWithin = function(target, start /*, end*/) {
    if (this == null) {
      throw new TypeError('this is null');
    }

    const O = Object(this);
    const len = O.length >>> 0;
    const relativeTarget = target >> 0;
    let to =
      relativeTarget < 0
        ? Math.max(len + relativeTarget, 0)
        : Math.min(relativeTarget, len);
    const relativeStart = start >> 0;
    let from =
      relativeStart < 0
        ? Math.max(len + relativeStart, 0)
        : Math.min(relativeStart, len);
    const end = arguments[2];
    const relativeEnd = end === 'undefined' ? len : end >> 0;
    const final =
      relativeEnd < 0
        ? Math.max(len + relativeEnd, 0)
        : Math.min(relativeEnd, len);
    let count = Math.min(final - from, len - to);
    let direction = 1;

    if (from < to && to < from + count) {
      direction = -1;
      from += count - 1;
      to += count - 1;
    }

    while (count > 0) {
      if (from in O) {
        O[to] = O[from];
      } else {
        delete O[to];
      }

      from += direction;
      to += direction;
      count--;
    }

    return O;
  };

  console.time('mozillaCopyWithin');
  console.log([1, 2, 3, 4, 5].mozillaCopyWithin(-2, -3, -1));
  console.timeEnd('mozillaCopyWithin');
}

console.time('copyWithin');
console.log([1, 2, 3, 4, 5].copyWithin(-2, -3, -1));
console.timeEnd('copyWithin');
