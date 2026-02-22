function makeCounter(initialValue = 0) {
  let counter = initialValue;

  return function () {
    return counter++;
  };
}

const counter = makeCounter();
console.log(counter());
console.log(counter());
console.log(counter());
console.log(counter());

function toggle(...values) {
  let state = -1;
  let length = values.length;

  return function () {
    state = (state + 1) % length;
    console.log(values[state]);
    return values[state];
  };
}

var hello = toggle("hello");
var onOff = toggle("on", "off");
var speed = toggle("slow", "medium", "fast");

hello(); // "hello"
hello(); // "hello"

onOff(); // "on"
onOff(); // "off"
onOff(); // "on"

speed(); // "slow"
speed(); // "medium"
speed(); // "fast"
speed(); // "slow"

function multiply(num1) {
  return function (num2) {
    return num1 * num2;
  };
}

// curry

function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn(...args);
    }

    return function (...nextArgs) {
      return curried(...args, ...nextArgs);
    };
  };
}

function multiply(a, b) {
  return a * b;
}

const curriedMultiply = curry(multiply);

// console.log(curriedMultiply(1)(2)(3));
console.log(curriedMultiply(1)(3));
// console.log(curriedMultiply(1, 2, 3));
// console.log(curriedMultiply(1, 2, 3));

function debounce(fn, delay, context) {
  let timer;

  return function (...args) {
    if (timer) clearTimeout(timer);

    context = this ?? context;
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, delay);
  };
}

// Throttle

function throttle(fn, delay, context) {
  let timer;
  let lastArgs;

  return function (...args) {
    lastArgs = args;
    context = this ?? context;

    if (timer) return;

    timer = setTimeout(() => {
      fn.apply(context, lastArgs);
      clearTimeout(timer);
    }, delay);
  };
}

function sampler(fn, count, context) {
  let counter = 0;

  return function (...args) {
    lastArgs = args;
    context = this ?? context;
    if (++counter !== count) {
      return;
    }

    fn.apply(context, args);
    counter = 0;
  };
}

var singleton = (function () {
  var instance;
  function createInstance() {
    var object = new Object(`I am the instance`);
    return object;
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const instance1 = singleton.getInstance();
const instance2 = singleton.getInstance();

function range(start, end) {
  if (end === undefined) {
    return function (end) {
      return range(start, end);
    };
  }

  const result = [];

  for (let i = start; i <= end; i++) {
    result.push(i);
  }
  return result;
}

function memoize(fn) {
  const cache = new Map();

  return function () {
    const key = JSON.stringify(arguments);

    if (cache.has(key)) {
      return cache.get(key);
    } else {
      cache.set(key, fn(...arguments));
      return cache.get(key);
    }
  };
}
