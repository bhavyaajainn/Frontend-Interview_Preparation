// function createAuthStore() {
//   let user = null;
//   let observers = [];

//   function notify() {
//     observers.forEach((func) => {
//       try {
//         func(user);
//       } catch (error) {
//         console.log("Error Ocurred: ", error);
//       }
//     });
//   }

//   return {
//     subscribe(func) {
//       observers.push(func);
//       return () => {
//         observers = observers.filter((o) => o !== func);
//       };
//     },
//     login(userData) {
//       user = userData;
//       notify();
//     },
//     logout() {
//       user = null;
//       notify();
//     },
//     getUser() {
//       return user;
//     },
//   };
// }

// const authStore = createAuthStore();
// authStore.subscribe((user) => {
//   console.log("Navbar:", user ? "Show Logout" : "Show Login");
// });

// authStore.subscribe((user) => {
//   if (user) {
//     console.log("Dashboard loaded for", user.name);
//   } else {
//     console.log("Dashboard hidden");
//   }
// });

// authStore.subscribe((user) => {
//   if (user) {
//     console.log("Analytics: Track login event");
//   }
// });

// authStore.login({ name: "abc" });
// authStore.logout();

// //Result
// // Navbar: Show Logout
// // Dashboard loaded for abc
// // Analytics: Track login event
// // Navbar: Show Login
// // Dashboard hidden

// function createCartStore() {
//   let items = [];
//   let observers = [];

//   function notify() {
//     observers.forEach((func) => {
//       try {
//         func(items);
//       } catch (err) {
//         console.log("Error Occurred: ", err);
//       }
//     });
//   }

//   return {
//     subscribe(func) {
//       observers.push(func);
//       return () => (observers = observers.filter((o) => o !== func));
//     },
//     addItem(item) {
//       items.push(item);
//       notify();
//     },
//     removeItem(id) {
//       items = items.filter((item) => item.id != id);
//       notify();
//     },
//     getItems() {
//       return items;
//     },
//   };
// }

// // Create store
// const cartStore = createCartStore();

// // Cart badge
// cartStore.subscribe((items) => {
//   console.log("Cart badge count:", items.length);
// });

// // Total calculator
// cartStore.subscribe((items) => {
//   const total = items.reduce((sum, item) => sum + item.price, 0);
//   console.log("Total price:", total);
// });

// // Discount system
// cartStore.subscribe((items) => {
//   if (items.length >= 3) {
//     console.log("Apply bulk discount");
//   }
// });

// // Simulate actions
// cartStore.addItem({ id: 1, price: 100 });
// cartStore.addItem({ id: 2, price: 200 });
// cartStore.addItem({ id: 3, price: 300 });
// cartStore.removeItem(2);

// //Result
// // Cart badge count: 1
// // Total price: 100
// // Cart badge count: 2
// // Total price: 300
// // Cart badge count: 3
// // Total price: 600
// // Apply bulk discount
// // Cart badge count: 2
// // Total price: 400

// function Events() {
//   const events = {};
//   (this.subscribe = function (name, callback) {
//     if (!events[name]) {
//       events[name] = [];
//     }
//     events[name].push({ callback, once: false });

//     return () => {
//       events[name] = events[name].filter(o.callback !== callback);
//     };
//   }),
//     (this.subscribeOnce = function (name, callback) {
//       if (!events[name]) {
//         events[name] = [];
//       }
//       events[name].push({ callback, once: true });
//     });

//   this.subscribeOnceAsync = function (name) {
//     return new Promise((resolve) => {
//       if (!events[name]) {
//         events[name] = [];
//       }
//       events[name].push({
//         callback: resolve,
//         once: true,
//       });
//     });
//   };
//   this.publish = function (name, data) {
//     if (!events[name]) return;
//     events[name] = events[name].filter((o) => {
//       try {
//         o.callback(data);
//       } catch (err) {
//         console.log("Error occurred: ", error);
//       }
//       return !o.once;
//     });
//   };
//   this.publishAll = function (data) {
//     Object.keys(events).forEach((eventName) => {
//       this.publish(eventName, data);
//     });
//   };
// }

// const events = new Events();

// // Payment Service
// events.subscribe("order:placed", (data) => {
//   console.log("Processing payment for:", data.orderId);
// });

// // Inventory Service
// events.subscribe("order:placed", (data) => {
//   console.log("Reducing stock for items:", data.items);
// });

// // Email Service (runs only once)
// events.subscribeOnce("order:placed", (data) => {
//   console.log("Sending confirmation email to:", data.email);
// });

// // Async Listener (Analytics Service)
// async function trackOrder() {
//   const order = await events.subscribeOnceAsync("order:placed");
//   console.log("Analytics received order:", order.orderId);
// }

// trackOrder();

// // Publish event
// events.publish("order:placed", {
//   orderId: "ORD123",
//   items: ["Shoes", "Bag"],
//   email: "user@example.com",
// });

// //Result
// // Processing payment for: ORD123
// // Reducing stock for items: [ 'Shoes', 'Bag' ]
// // Sending confirmation email to: user@example.com
// // Analytics received order: ORD123
