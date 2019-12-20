// 实现 isArray 方法
if (!Array.prototype.mozillaIsArray) {
  Array.mozillaIsArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };

  console.time('mozillaIsArray');
  console.log(Array.mozillaIsArray([1, 2, 3, 4, 5]));
  console.timeEnd('mozillaIsArray');
}

console.time('isArray');
console.log(Array.isArray([1, 2, 3, 4, 5]));
console.timeEnd('isArray');
