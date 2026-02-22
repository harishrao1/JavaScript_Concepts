// do not change function name
function getRepeatedArray(collection) {
  // write your solution below

  let result = [];

  for (let i = 0; i < collection.length; i++) {
    if (i % 2 === 0) {
      const value = collection[i];
      let valueToUpdate = "";
      //   for (let j = 0; j <= i; j++) {
      //     valueToUpdate = valueToUpdate + value;
      //   }
      //   result.push(valueToUpdate || value);

      result.push(collection[i].repeat(i + 1));
    }
  }

  return result;
}

console.log(getRepeatedArray(["a", "b", "c", "d", "e"]));
