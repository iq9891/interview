function myInstanceOf(leftValue, rightValue) {
  let left = leftValue.__proto__;
  const right = rightValue.prototype;

  while (true) {
    if (left == null) {
      return false;
    }

    if (left === right) {
      return true;
    }

    left = left.__proto__;
  }
}

function Foo() {}

console.log(myInstanceOf(Object, Object));
console.log(myInstanceOf(Function, Function));
console.log(myInstanceOf(Function, Object));
console.log(myInstanceOf(Foo, Foo));
console.log(myInstanceOf(Foo, Object));
console.log(myInstanceOf(Foo, Function));
