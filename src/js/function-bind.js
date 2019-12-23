if (!Function.prototype.mozillaBind) {
  (function() {
    const slice = Array.prototype.slice;
    Function.prototype.mozillaBind = function() {
      const thatFunc = this;
      const thatArg = arguments[0];
      const args = slice.call(arguments, 1);

      if (typeof thatFunc !== 'function') {
        throw new TypeError('必须是个函数');
      }

      return function() {
        const funcArgs = args.concat(slice.call(arguments));
        return thatFunc.apply(thatArg, funcArgs);
      };
    };
  })();
}
