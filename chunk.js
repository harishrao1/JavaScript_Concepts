function _chunk(array, size) {
  let result = [];

  for (let i = 0; i < array.length; i++) {
    result.push(array.slice(i, i + size));
  }

  return result;
}
// let x = _chunk([1,3,7,9,12,5,66],2);
let x = _chunk([1, 3, 7, 9, 12, 5, 66], 4);

console.log(x);
