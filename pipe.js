function pipe(...fns) {
  return function (input) {
    return fns.reduce((acc, current) => {
      return current[acc];
    }, input);
  };
}

function asyncPipe(...fns) {
  return function (input) {
    return fns.reduce((acc, current) => {
      return acc.then(current);
    }, Promise.resolve(input));
  };
}
