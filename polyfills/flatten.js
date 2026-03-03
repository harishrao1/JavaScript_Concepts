function flatten() {
  let array = this;
  let fa = [];
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i])) {
      //   fa.push(...flatten.call(array[i]))
      // fa.push(...array[i].myFlattenArray())
      fa = fa.concat(array[i].myFlattenArray());
    } else {
      fa.push(array[i]);
    }
  }

  return fa;
}
Array.prototype.myFlattenArray = flatten;

let input = [
  1,
  2,
  3,
  [4],
  [5, 6, [7], [8, [9, [10]]]],
  11,
  12,
  13,
  [14, [[[[[15, [16]]]]]]],
  17,
  18,
  [19, [20, [21, [22, [23, [24, [[[[[25]]]]]]]]]]],
];

let flatArray = input.myFlattenArray();
console.log(flatArray);
