//防抖 (debounce): 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。
function debounce(fn, wait = 1000, immediate) {
  let timer = null;

  return function() {
    const context = this;
    const args = arguments;

    if (immediate && !timer) {
      fn.apply(context, args);
    }

    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}
