// closures
function outer() {
  let count = 0;

  function inner() {
    count++;
    console.log(count);
  }

  return inner;
}

const fn = outer();
fn(); // 1
fn(); // 2

function createCounter() {
  let x = 10;

  return function () {
    console.log(x);
  };
}

let fn1 = createCounter();
let fn2 = createCounter();

fn1(); // 10
fn2(); // 10
// Each Call Created a New Lexical Environment
// fn1 and fn2 do not share memory

/**
 *
 *
 * A closure is Formed when an inner function retains access to variables of its outer lexical Scope even After the outer function has finished Execution
 *
 *
 *
 *
 *
 * outer() - lexical envs are created
 * counter - stored in memory
 * inner gets reference to that environment
 * even after outer fibishes that memory is not garbage collected
 *
 *
 *
 *outer execution context
   count: 0
   inner: function -> holds reference

   
   - When outer returns 
   
   Execution context is removed but lexical env stays in heap because inner references it.  -> This is closure
 *
 *
 * 
 * 
 * Data Encapsulation
 * Private Variables
 * Function Factories
 * Memoization
 * Currying 
 * Event handler state
 */

for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 0);
}

// Separate Closures With Mutation
function counterFactory() {
  let x = 10;

  return function () {
    x++;
    console.log(x);
  };
}

let c1 = counterFactory();
let c2 = counterFactory();

c1(); // 11
c1(); // 12
c2(); // 11
c2(); // 12

function sharedFactory() {
  let x = 0;

  return {
    getX: () => x,
    setX: (val) => (x = val),
  };
}

let obj1 = sharedFactory();
let obj2 = obj1; // uses same reference of obj1

obj1.setX(200);

console.log(obj2.getX()); // 200

// Private State
function privateVariables() {
  let x = 0;

  return {
    increment() {
      x++;
      console.log(x);
    },
    decrement() {
      x--;
      console.log(x);
    },
  };
}

const counter = privateVariables();

counter.increment(); // 1
counter.increment(); // 2
counter.decrement(); // 1

function gcExample() {
  let x = 0;

  return function () {
    x++;
    return x;
  };
}

let gcFn = gcExample();

console.log(gcFn()); // 1
console.log(gcFn()); // 2

gcFn = null;
// After this, lexical environment will be Removed From Memory (Garabe collector )

function bigMemoryExample() {
  let bigData = new Array(1000000).fill("🔥");

  return function () {
    console.log("Closure still alive");
  };
}

let memoryFn = bigMemoryExample();

// bigData remains in memory as long as memoryFn exists.

function staleClosureExample() {
  let count = 0;

  function increment() {
    count++;
  }

  let message = `Count is ${count}`;

  function log() {
    console.log(message);
  }

  return { increment, log };
}

const stale = staleClosureExample();

stale.increment();
stale.increment();
stale.log(); // "Count is 0"
// message captured old value of count.
// This is a stale closure.

// can Be solved using IIFE
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => {
      console.log(j);
    }, 0);
  })(i);
}
