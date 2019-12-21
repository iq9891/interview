// new 关键字
function mockNew() {
  var obj = {}; // 从Object.prototype上克隆一个空对象 此时 __proto__ 指向Object.prototype
  var Constructor = [].shift.call(arguments); //取得构造器
  obj.__proto__ = Constructor.prototype; // 指向构造器的prototype
  var ret = Constructor.apply(obj, arguments); // 将步骤1新创建的对象作为 this 的上下文 ；
  return typeof ret === 'object' ? ret : obj; // 如果该函数没有返回对象，则返回this
}

function Animal(type) {
  this.type = type;
}

let animal = mockNew(Animal, '牙千');

console.log(animal.type); // 牙千
