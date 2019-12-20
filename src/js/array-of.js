// 实现 isArray 方法
if (!Array.prototype.mozillaOf) {
  Array.mozillaOf = function() {
    return Array.prototype.slice.call(arguments);
  };

  console.time('mozillaOf');
  console.log(Array.mozillaOf([1, 2, 3, 4, 5]));
  console.timeEnd('mozillaOf');
}

console.time('of');
console.log(Array.of([1, 2, 3, 4, 5]));
console.timeEnd('of');
