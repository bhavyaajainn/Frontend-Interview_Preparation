// Retry promises N number of times with delay
// Asked in Google's frontend interview and Impact Analytics SSE

// Resolves after `ms` milliseconds
const wait = (ms) => {
  // TODO
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(), ms);
  });
};

// Retry using then...catch
const retryWithDelay = (
  operation,
  retries = 3,
  delay = 50,
  finalErr = "Retry failed",
) => {
  // TODO
  return new Promise((resolve, reject) => {
    return operation()
      .then(resolve)
      .catch(() => {
        if (retries > 0) {
          return wait(delay)
            .then(
              retryWithDelay.bind(
                null,
                operation,
                retries - 1,
                delay,
                finalErr,
              ),
            )
            .then(resolve)
            .catch(reject);
        }
      });
    return reject(finalErr);
  });
};

// Retry using async...await
const retryWithDelayAsync = async (
  operation,
  retries = 3,
  interval = 50,
  finalErr = "Retry failed",
) => {
  // TODO
  try {
    await operation();
    resolve();
  } catch (err) {
    if (retries > 0) {
      await wait(interval);
      return retryWithDelay(operation, retries - 1, interval, finalErr);
    }

    return Promise.reject(finalErr);
  }
};

// --- Tests ---

// Helper: fails until called `threshold` times, then resolves
const getTestFunc = (threshold = 5) => {
  let callCounter = 0;
  return async () => {
    callCounter += 1;
    if (callCounter < threshold) {
      throw new Error("Not yet");
    }
  };
};

// Test case 1 — then...catch version
const testThen = async () => {
  await retryWithDelay(getTestFunc(5), 10);
  console.log("success"); // should print

  await retryWithDelay(getTestFunc(5), 3);
  console.log("will fail before getting here"); // should NOT print
};

testThen().catch(console.error); // "Retry failed"

// Test case 2 — async...await version
const testAsync = async () => {
  await retryWithDelayAsync(getTestFunc(5), 10);
  console.log("success"); // should print

  await retryWithDelayAsync(getTestFunc(5), 3);
  console.log("will fail before getting here"); // should NOT print
};

testAsync().catch(console.error); // "Retry failed"
