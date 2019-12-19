// 实现 flat 方法
if (!Array.prototype.mozillaFlat) {
  Array.prototype.mozillaFlat = function(depth = 1) {
    if (this == null) {
      throw new TypeError('this is null');
    }

    const O = Object(this);

    if (depth < 1) {
      return O;
    }

    return O.reduce((pre, cur) => {
      if (Array.isArray(cur)) {
        return [...pre, ...cur.mozillaFlat(depth - 1)];
      } else {
        return [...pre, cur];
      }
    }, []);
  };

  console.time('mozillaFlat');
  console.log(
    [[1], [2, 3], [4, 5], [6, [7, [8, [9, 10]]]]].mozillaFlat(Infinity)
  );
  console.timeEnd('mozillaFlat');
}

console.time('flat');
console.log([[1], [2, 3], [4, 5], [6, [7, [8, [9, 10]]]]].flat());
console.timeEnd('flat');
