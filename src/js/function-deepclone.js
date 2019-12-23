const MY_IMMER = Symbol('immer');

// 只是简单实现以下，具体请移步： ./object-isplainobject.js
const isPlainObject = (val) =>
  Object.prototype.toString.call(val) === '[object Object]';

const isProxy = (value) => !!value && !!value[MY_IMMER];

const proxies = new Map();
const copies = new Map();

const objectTraps = {
  get(target, key) {
    if (key === MY_IMMER) {
      return target;
    }

    const date = copies.get(target) || target;

    return getProxy(date[key]);
  },
  set(target, key, value) {
    const copy = getCopy(target);
    const newValue = getProxy(value);

    copy[key] = isProxy(newValue) ? newValue[MY_IMMER] : newValue;

    return true;
  },
};

const getProxy = (data) => {
  if (isProxy(data)) {
    return data;
  }

  if (isPlainObject(data) || Array.isArray(data)) {
    if (proxies.has(data)) {
      return proxies.get(data);
    }

    const proxy = new Proxy(data, objectTraps);
    proxies.set(data, proxy);

    return proxy;
  }
  return data;
};

const getCopy = (data) => {
  if (copies.has(data)) {
    return copies.get(data);
  }

  const copy = Array.isArray(data) ? Array.prototype.slice(data) : { ...data };
  copies.set(data, copy);

  return copy;
};

const isChange = (data) => {
  if (proxies.has(data) || copies.has(data)) {
    return true;
  }

  return false;
};

const finalize = (data) => {
  if (isPlainObject(data) || Array.isArray(data)) {
    if (!isChange(data)) {
      return data;
    }

    const copy = getCopy(data);

    Object.keys(copy).forEach((key) => {
      copy[key] = finalize(copy[key]);
    });

    return copy;
  }

  return data;
};

function produce(baseState, fn) {
  const proxy = getProxy(baseState);

  fn(proxy);

  return finalize(baseState);
}

// 示例
const state = {
  info: {
    name: 'yck',
    career: {
      first: {
        name: '111',
      },
    },
  },
  data: [1],
};

const data = produce(state, (draftState) => {
  draftState.info.age = 26;
  draftState.info.career.first.name = '222';
});

console.time('aaa');
console.log(data.info);
console.log(state.info);
console.log(data.data === state.data);
console.timeEnd('aaa');
