// Async Methods Chaining
//
// Implement UberDriver with async method chaining.
// Methods execute in the order they are called; delay-based methods wait before
// the next method runs.
//
// Two approaches:
//
// Approach 1 — Queue + debounce
//   Store tasks as async functions in a queue; use setTimeout(0) debounce so
//   execution starts only after the full chain is built.
//
// Approach 2 — Promise chain (optimal)
//   Keep this.queue = Promise.resolve(); each method appends to the chain via
//   this.queue = this.queue.then(...), so execution starts immediately and
//   flows in the correct order.

// ─── Approach 1: Queue + debounce ────────────────────────────────────────────

class UberDriverV1 {
  constructor() {
    this.queue = [];
    this.queueProcessing = false;
    this.timerId = null;
  }

  // TODO: helper normal(msg)  → returns () => Promise that logs msg and resolves
  normal(msg) {
    return () => {
      return new Promise((resolve) => {
        console.log(msg);
        resolve();
      });
    };
  }

  // TODO: helper delay(msg, s) → returns () => Promise that logs msg, waits s*1000ms, resolves
  delay(msg, s) {
    return () => {
      return new Promise((resolve) => {
        console.log(msg);
        setTimeout(() => {
          resolve();
        }, s * 1000);
      });
    };
  }

  processQueue() {
    // TODO: clearTimeout(this.timerId)
    // TODO: this.timerId = setTimeout(() => this.executeInSequence(), 0)
    if (this.queueProcessing) {
      return;
    }
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.executeInSequence();
    }, 0);
  }

  executeInSequence() {
    // TODO: shift first task from queue, call it
    // TODO: in .then(), if queue still has items recurse; else stop
    let promise = this.queue.shift();
    promise().then(() => {
      if (this.queue.length > 0) {
        this.executeInSequence();
      } else {
        this.queueProcessing = false;
      }
    });
  }

  pick(passenger) {
    this.queue.push(this.normal(`User ${passenger} is picked`));
    this.processQueue();
    return this;
  }

  drop(passenger) {
    this.queue.push(this.normal(`Drop ${passenger}`));
    this.processQueue();
    return this;
  }

  drive(duration) {
    this.queue.push(this.delay(`Driver is driving...`, duration));
    this.processQueue();
    return this;
  }

  rest(duration) {
    this.queue.push(this.delay(`Driver is in offline mode!`, duration));
    this.processQueue();
    return this;
  }
}

// ─── Approach 2: Promise chain (optimal) ─────────────────────────────────────

class UberDriverV2 {
  constructor() {
    // have a resolved promise at the beginning
    this.queue = Promise.resolve();
  }

  delay(seconds) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
      }, seconds * 1000);
    });
  }

  pick(passenger) {
    this.queue = this.queue.then(() => {
      console.log(`User ${passenger} is picked`);
    });
    return this;
  }

  drop(passenger) {
    this.queue = this.queue.then(() => {
      console.log(`Drop ${passenger}`);
    });
    return this;
  }

  drive(duration) {
    this.queue = this.queue.then(async () => {
      console.log(`Driver is driving...`);
      await this.delay(duration);
    });
    return this;
  }

  rest(duration) {
    this.queue = this.queue.then(async () => {
      console.log(`Driver is in offline mode!`);
      await this.delay(duration);
    });
    return this;
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────
// These tests capture console.log output and verify execution order & timing.

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function runTest(DriverClass) {
  const log = [];
  const origLog = console.log;
  console.log = (...args) => log.push(args.join(" "));

  const driver = new DriverClass();
  driver
    .pick("Alice")
    .pick("Bob")
    .drive(1)
    .drop("Bob")
    .drive(1)
    .drop("Alice")
    .rest(1);

  // wait for the full chain to complete (3 × 1s delays + buffer)
  await delay(3500);

  console.log = origLog;
  return log;
}

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

(async () => {
  for (const [label, Cls] of [
    ["V1", UberDriverV1],
    ["V2", UberDriverV2],
  ]) {
    const log = await runTest(Cls);

    test(
      `${label} TC1: pick Alice logged first`,
      log[0],
      "User Alice is picked",
    );
    test(`${label} TC2: pick Bob logged second`, log[1], "User Bob is picked");
    test(
      `${label} TC3: drive logged before drop Bob`,
      log[2],
      "Driver is driving...",
    );
    test(`${label} TC4: drop Bob logged after first drive`, log[3], "Drop Bob");
    test(
      `${label} TC5: second drive logged after drop Bob`,
      log[4],
      "Driver is driving...",
    );
    test(
      `${label} TC6: drop Alice logged after second drive`,
      log[5],
      "Drop Alice",
    );
    test(
      `${label} TC7: rest logged last`,
      log[6],
      "Driver is in offline mode!",
    );
    test(`${label} TC8: exactly 7 log entries`, log.length, 7);
  }

  console.log("\nAll tests done");
})();
