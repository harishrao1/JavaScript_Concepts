if (!Array.prototype.polyfillMap) {
  Array.prototype.polyfillMap = function (mapLogicFn) {
    const context = this;
    const result = [];
    for (let i = 0; i < context.length; i++) {
      result.push(mapLogicFn(this[i], i));
    }

    return result;
  };
}

const numbers = [1, 2, 3, 4, 5];

const multipleTwo = numbers.polyfillMap((num, index) => num * index);
console.log(multipleTwo);

if (!Array.prototype.polyfillFilter) {
  Array.prototype.polyfillFilter = function (filterLogicFn) {
    let context = this;

    let res = [];
    for (let i = 0; i < context.length; i++) {
      if (filterLogicFn(context[i], i)) {
        res.push(context[i]);
      }
    }

    return res;
  };
}

const filterEvens = numbers.polyfillFilter((x) => x % 2 === 0);
console.log(filterEvens);

Array.prototype.polyfillReduce = function (reduceFn, initialValue) {
  let output = initialValue;
  let context = this;

  for (let i = 0; i < context.length; i++) {
    output = reduceFn(output, this[i], i);
  }
  return output;
};

const sum = numbers.polyfillReduce((acc, current) => acc + current, 0);
console.log(sum);

Array.prototype.polyfillFlat = function () {
  let output = [];

  for (let i = 0; i < this.length; i++) {
    if (Array.isArray(this[i])) {
      output.push(...this[i].polyfillFlat());
    } else {
      output.push(this[i]);
    }
  }

  return output;
};

numbers.push([1, 2, [1, 3, 8]]);
console.log(numbers.polyfillFlat());

Array.prototype.polyfillInclude = function (valueToFind, fromIndex) {
  let startIndex = fromIndex ?? 0;

  for (let i = startIndex; i < this.length; i++) {
    if (this[i] === valueToFind) {
      return true;
    }
  }
  return false;
};

console.log(numbers.includes(3, 4));

Array.prototype.someFunction = function (someFn) {
  let context = this;
  for (let i = 0; i < context.length; i++) {
    if (someFn(this[i], i, this)) {
      return true;
    }
  }

  return false;
};
console.log(numbers.someFunction((x) => x % 2 === 0));
console.log(numbers.someFunction((x, i, arr) => arr.includes(1)));

if (!Promise.all) {
  Promise.all = function promise(promises) {
    const result = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  };
}

function customPromiseAll(promises) {
  const result = [];
  let completedCount = 0;
  promises.forEach((promise, index) => {
    Promise.resolve(promise)
      .then((value) => {
        result[index] = value;
        completedCount++;

        if (completedCount === promises.length) {
          resolve(result);
        }
      })
      .catch(reject);
  });
}

function A(promises) {
  return new Promise((resolve, reject) => {
    // If not Array reject

    const result = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(result);
          }
        })
        .catch(reject);
    });
  });
}

function stringRepeatedValues(str) {
  let result = 0;
  let left = 0;
  let set = new Set();

  for (let right = 0; right < str.length; i++) {
    while (set.has(str[right])) {
      set.delete(str[left]);
      left++;
    }

    set.add(str[right]);
    result = Math.max(result, right - left + 1);
  }
  return result;
}
