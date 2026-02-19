// `this` depends on How a function is called not where it is defined

// function test() {
//   console.log(this);
// }

// test(); // window or undefined (when in strict Mode)

// const obj = {
//   name: "Harish",
//   greet() {
//     console.log(this.name);
//   },
// };

// obj.greet();

// const greetFn = obj.greet;
// greetFn(); // undefined due to its a Normal Function Call

// const obj1 = {
//   name: "Harish",
//   greet() {
//     function inner() {
//       console.log(this.name);
//     }
//     inner();
//   },
// };

// obj1.greet();

const obj = {};

console.log(Object.getPrototypeOf(obj));

function Person(name) {
  this.name = name;
}
console.log(Person.prototype);

const p1 = new Person(`Harish`);

Person.prototype.greet = function () {
  console.log(`Hi` + this.name);
};

function A() {}
A.prototype.x = 10;

const obj2 = new A();

console.log(obj2.x);

console.log(obj2);
