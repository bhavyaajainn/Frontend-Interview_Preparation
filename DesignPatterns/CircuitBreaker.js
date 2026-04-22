// function createCircuitBreaker(fn, threshold = 3, cooldown = 3000) {
//   let failures = 0;
//   let openUntil = 0;
//   return async function (...args) {
//     if (Date.now() < openUntil) {
//       throw new Error("Circuit is OPEN");
//     }
//     try {
//       const result = await fn(...args);
//       failures = 0;
//       return result;
//     } catch (err) {
//       failures++;
//       if (failures >= threshold) {
//         openUntil = Date.now() + cooldown;
//       }
//       throw err;
//     }
//   };
// }

// async function unstable() {
//   if (Math.random() > 0.6) return "Success";
//   throw new Error("Failure");
// }

// const safeCall = createCircuitBreaker(unstable);

// setInterval(() => {
//   safeCall()
//     .then(console.log)
//     .catch((err) => console.log("Blocked:", err.message));
// }, 1000);

// //Result
// // Success
// // Blocked: Failure
// // Success
// // Success
// // Success
// // Blocked: Failure
// // Success
// // Blocked: Failure
// // Blocked: Failure
// // Blocked: Failure
// // Blocked: Circuit is OPEN
// // Blocked: Circuit is OPEN
// // Blocked: Failure
// // Blocked: Circuit is OPEN
// // Blocked: Circuit is OPEN
// // Blocked: Failure

function createCircuitBreaker(fn, threshold = 3, cooldown = 4000) {
  let failures = 0;
  let state = "CLOSED";
  let nextTry = 0;
  return async function (...args) {
    if (state === "OPEN") {
      if (Date.now() < nextTry) {
        throw new Error("Circuit OPEN");
      }
      state = "HALF_OPEN";
    }

    try {
      const result = fn(...args);
      failures = 0;
      state = "CLOSED";
      return result;
    } catch (err) {
      failures++;
      if (failures >= threshold) {
        state = "OPEN";
        nextTry = Date.now() + cooldown;
      }
      throw err;
    }
  };
}

async function api() {
  if (Math.random() > 0.7) return "API OK";
  throw new Error("API Failed");
}

const protectedAPI = createCircuitBreaker(api);

setInterval(() => {
  protectedAPI()
    .then(console.log)
    .catch((err) => console.log(err.message));
}, 1000);

//Result
// API Failed
// API Failed
// API Failed
// API Failed
// API Failed
// API Failed
// API Failed
// API Failed
// API Failed
// API Failed
// API OK
// API Failed
// API OK
// API Failed
// API Failed
