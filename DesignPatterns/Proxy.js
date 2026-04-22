const user = { name: "abc" };

const proxy = new Proxy(user, {
  get(target, prop) {
    console.log(`Trying ${prop}`);
    return target[prop];
  },
});

console.log(proxy.name);

// Result
// Trying name
// abc

// const user = {};

// const proxy = new Proxy(user, {
//   set(target, prop, value) {
//     if (prop == "age" && value < 0) {
//       console.log("Invalid age");
//       return false;
//     }
//     target[prop] = value;
//     return true;
//   },
// });

// console.log((proxy.age = 25));
// console.log((proxy.age = -10));
