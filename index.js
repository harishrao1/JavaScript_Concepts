// Event Loop

// console.log(`Start`);

// setTimeout(() => {
//   console.log(`Timeout`);
// }, 0);

// Promise.resolve().then(() => {
//   console.log(`Promise`);
// });

// console.log(`End`);

/**
 *
 * Execution Order
 *
 * Sync -> Start
 * setTimeout - macroTask Queue
 * Promise.then -> microTask Queue
 * Sync - End
 * Microtask -> Promise
 * MacroTask -> Timeouts
 */

function micro_macro() {
  console.log(`A`);

  setTimeout(() => {
    console.log(`B`);
  }, 0);

  Promise.resolve()
    .then(() => {
      console.log(`C`);
    })
    .then(() => {
      console.log(`D`);
    });

  queueMicrotask(() => console.log(`E`));

  console.log(`F`);

  /*
  
   Output - A -> F -> C -> E -> D -> B
   
   
   Execution : 
    - First A and F  - synchronous
    
    
    MicroTask Queue after Synchronous 
    - First then C
    - queueMicroTask - E

    Here D did not run because I was Scheduled After the Execution of the first then (Like When C is Logged the D Will push into MicroTask Which Eventually Runs After the queueMicroTask)    

    
    - After E , D is Logged From second then()
    - B - logged From MacroTasks (setTimeout)
    
   
    
     - Promise chaining is Dynamic 
     - queueMicroTask Order Matters
   */
}

async function async_await_test() {
  console.log(1);
  await Promise.resolve();

  // Executes Synchronously Until the above await - Immediately Returns an Promise

  // Pause this Function and Schedule the remaining code as a microtask

  // await means - Pause this Function not the entire thread
  console.log(2);
}

async_await_test();
console.log(3);

function loop() {
  Promise.resolve().then(loop);
}

loop();

// This Creates infinite MicroTasks
/**
 *
 * Event Loop Always Processes Microtask before macroTasks
 * Rendering happens after MicroTasks
 *
 * Since MicroTasks never finishes, rendering is Blocked
 *
 *
 * this is Called MicroTask starvation
 */

// MacroTask inside MicroTasks
console.log(1);

Promise.resolve().then(() => {
  console.log(2);

  setTimeout(() => {
    console.log(3);
  }, 0);
});

setTimeout(() => console.log(4), 0);

console.log(5);

// 1 -> 5 -> 2 -> 4 -> 3

setTimeout(() => {
  console.log(`A`);

  Promise.resolve().then(() => {
    console.log(`B`);
  });
}, 0);

setTimeout(() => {
  console.log(`C`);
}, 0);

// When MicroTasks are Written inside MacroTasks they Run Immediately After Current MacroTask Completes

setTimeout(() => {
  console.log(1);

  Promise.resolve().then(() => {
    console.log(2);
  });

  console.log(3);
}, 0);

setTimeout(() => {
  console.log(4);
}, 0);

// 1 -> 3 -> 2 -> 4

// MicroTasks Scheduled Inside a MacroaTask Execute immediately after that MacroTask Finishes, before the Event Loop Process the next MacroTask

Promise.resolve().then(() => {
  console.log("A");

  setTimeout(() => console.log("B"), 0);

  Promise.resolve().then(() => console.log("C"));
});

setTimeout(() => console.log("D"), 0);

// A -> C -> D -> B
