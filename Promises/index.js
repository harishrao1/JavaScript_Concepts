/*
    JavaScript Promises 
    A promise is an object which represents the eventual completion or failure of an async operation.
		Why promises are important?
			* To prevent callback hell
			* Prevent inversion of control
			* They make the code more readable and also gives the guarantee that the function will be called in a async and only once.
    create a promise object
    resolve - a callback run when prosessing successfully completes
    reject - optional (run when a failure occurs)

    states of Javascript promise
        pending    
        fulfilled
        rejected

      createOrder
      proceedToPayment
      showOrderSummary
      updateItems

*/

const cart = [
  {
    itemName: "shoes",
    itemPrice: 2000,
  },
  {
    itemName: "Shirt",
    itemPrice: 4000,
  },
  {
    itemName: "Bags",
    itemPrice: 1500,
  },
];

let walletBalance = 10000;

createOrder(cart)
  .then((orderId) => orderId)
  .then((orderId) => proceedToPayment(orderId))
  .then((orderStatus) => showOrderSummary(orderStatus))
  .then((orderHistory) => updateWallet(orderHistory))
  .then((res) => console.log(res))
  .catch((err) => console.log(err.message));

// const promise = createOrder(cart);

// promise.then(function(orderId) {
//     console.log(orderId);
// })

function createOrder(cart) {
  const pr = new Promise(function (resolve, reject) {
    // createOrder
    //ValidateCart
    //OrderId

    if (!validateCart(cart)) {
      const err = new Error("Cart is Empty");
      reject(err);
    }
    // logic for createOrder

    const orderId = 12345;

    if (orderId) {
      resolve(orderId);
    }
  });

  return pr;
}
function proceedToPayment(orderId) {
  return new Promise(function (resolve, reject) {
    if (orderId) {
      resolve({ paymentStatus: 1, message: "Payment successfully completed" });
    } else {
      reject(new Error("payment Failed"));
    }
  });
}

function showOrderSummary(orderStatus) {
  return new Promise(function (resolve, reject) {
    if (orderStatus.paymentStatus === 1) {
      resolve({ status: "success", orders: cart });
    } else {
      reject(new Error("Something went Wrong"));
    }
  });
}

function updateWallet(orderHistory) {
  return new Promise(function (resolve, reject) {
    if (orderHistory.status === "success") {
      let orderAmount = 4500;

      walletBalance = walletBalance - orderAmount;
      resolve({ balance: walletBalance, message: "Wallet updated" });
    } else {
      reject(new Error("Wallet balanced not updated"));
    }
  });
}

function validateCart(cart) {
  return true;
}
