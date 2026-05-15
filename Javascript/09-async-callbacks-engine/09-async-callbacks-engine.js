// Implement an engine that processes async callbacks
// Controlled concurrency queue with FIFO/LIFO ordering and queue limit

const QueueCallbacks = function (
  order = "FIFO",
  concurrentTasks = 2,
  queueLimit = 6,
) {
  this.order = order;
  this.allowedConcurrentTasks = concurrentTasks;
  this.queueLimit = queueLimit;
  this.callbacksQueue = [];
  this.ongoingExecution = 0;

  this.process = async (callback) => {
    // TODO
    if (this.ongoingExecution < this.allowedConcurrentTasks) {
      this.ongoingExecution++;
      await callback;
      this.ongoingExecution--;
      executeNext();
    } else {
      if (this.callbacksQueue.length < this.queueLimit) {
        this.callbacksQueue.push(callback);
      }
    }
  };

  const executeNext = () => {
    // TODO
    if (this.order == "FIFO") {
      if (this.callbacksQueue.length !== 0 && this.ongoingExecution < 2) {
        this.process(this.callbacksQueue.shift());
      }
    } else {
      if (this.callbacksQueue.length !== 0 && this.ongoingExecution < 2) {
        this.process(this.callbacksQueue.pop());
      }
    }
  };
};

// --- Helper ---
const dummyApi = (index) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(index), index * 1000);
  });

// --- Tests ---
// Run with Node.js: node 09-async-callbacks-engine.js
// Each test prints results over time; verify the order matches expectations.

// Test 1: FIFO — 2 concurrent, 6 queued, 2 discarded → 8 outputs in order
console.log("=== FIFO Test ===");
const fifoQueue = new QueueCallbacks("FIFO");
fifoQueue.process(dummyApi(1));
fifoQueue.process(dummyApi(2));
fifoQueue.process(dummyApi(6));
fifoQueue.process(dummyApi(4));
fifoQueue.process(dummyApi(5));
fifoQueue.process(dummyApi(6));
fifoQueue.process(dummyApi(7));
fifoQueue.process(dummyApi(8));
fifoQueue.process(dummyApi(9)); // discarded (queue full)
fifoQueue.process(dummyApi(10)); // discarded (queue full)
// Expected output order: 1, 2, 4, 5, 6, 6, 7, 8

// Test 2: LIFO — same inputs, queue drained last-in-first-out
setTimeout(() => {
  console.log("\n=== LIFO Test ===");
  const lifoQueue = new QueueCallbacks("LIFO");
  lifoQueue.process(dummyApi(1));
  lifoQueue.process(dummyApi(2));
  lifoQueue.process(dummyApi(6));
  lifoQueue.process(dummyApi(4));
  lifoQueue.process(dummyApi(5));
  lifoQueue.process(dummyApi(6));
  lifoQueue.process(dummyApi(7));
  lifoQueue.process(dummyApi(8));
  lifoQueue.process(dummyApi(9)); // discarded
  lifoQueue.process(dummyApi(10)); // discarded
  // Expected output order: 1, 2, 8, 7, 6, 5, 4, 6
}, 40000); // run after FIFO test finishes (~35s total)

// --- Follow-up: executor variant ---

let taskCounter = 0;

function dummyApiTask(delay, shouldFail = false, { onSuccess, onError } = {}) {
  return {
    id: `task-${++taskCounter}`,
    execute: () =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          if (shouldFail) reject(new Error(`Failed after ${delay}s`));
          else resolve(`Completed in ${delay}s`);
        }, delay * 1000);
      }),
    onSuccess,
    onError,
  };
}

const defaultExecutor = async (task) => {
  // TODO — log start, await task.execute(), call onSuccess/onError, log finish
};

const QueueCallbacksWithExecutor = function (
  order = "FIFO",
  concurrentTasks = 2,
  queueLimit = Infinity,
  executor = defaultExecutor,
) {
  // TODO — same structure as QueueCallbacks but call executor(task) instead of callback.then(...)
};
