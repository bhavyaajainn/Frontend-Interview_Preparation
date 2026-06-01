// Method Chaining with Priority
//
// Extension of async method chaining (problem 71).
// coffeeBreak(duration, priority=1) must execute at position `priority` in the
// queue, regardless of where it appears in the chain.
//
// Key insight: use the queue + debounce approach from problem 71 and
// splice the coffeeBreak task into the queue at the right index.
//
// priority=1  → executes first (before all other queued tasks)
// priority=2  → executes second, etc.
//
// Default: only one coffeeBreak allowed; remove the guard to allow multiple.

class UberDriver {
  constructor() {
    this.queue = [];
    this.queueProcessing = false;
    this.hasTakenCoffeeBreak = false; // Execute coffee break only once
    this.timerId = null;
    console.log("Hello uber driver is online");
  }

  processQueue() {
    if (this.queueProcessing) {
      return;
    }

    // this acts a debounce call
    // invoke the execution from the last method so that the queue is full before processing
    clearTimeout(this.timerId);
    this.timerId = setTimeout(() => {
      this.executeInSequence();
    }, 0);
  }

  executeInSequence() {
    // get the top task
    let promise = this.queue.shift();
    //execute the task
    promise().then(() => {
      //recursively call the same function
      if (this.queue.length > 0) {
        this.executeInSequence();
      } else {
        // terminate the execution when all the items in the queue is processed
        this.queueProcessing = false;
      }
    });
  }

  delay(msg, seconds) {
    return () => {
      return new Promise((resolve) => {
        console.log(msg);
        setTimeout(() => {
          resolve();
        }, seconds * 1000);
      });
    };
  }

  normal(msg) {
    return () => {
      return new Promise((resolve) => {
        console.log(msg);
        resolve();
      });
    };
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

  coffeeBreak(duration, priority = 1) {
    // execute the coffee break only once
    if (!this.hasTakenCoffeeBreak) {
      // add the coffee within the queue at the requested position based on its priority
      this.queue.splice(
        priority - 1,
        0,
        this.delay(`Driver is taking coffee break...`, duration),
      );
      this.hasTakenCoffeeBreak = true;
    }

    this.processQueue();
    return this;
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

const tick = (ms) => new Promise((r) => setTimeout(r, ms));

async function capture(fn) {
  const log = [];
  const orig = console.log;
  console.log = (...a) => log.push(a.join(" "));
  fn();
  await tick(3500); // enough for 3 × 1s delays + buffer
  console.log = orig;
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
  // ── TC set 1: coffeeBreak at priority=1 (first) ──────────────────────────
  const log1 = await capture(() => {
    new UberDriver()
      .pick("Alice")
      .pick("Bob")
      .coffeeBreak(1, 1) // should go first
      .drive(1)
      .drop("Bob");
  });

  // skip index 0 — it's the constructor log ("Hello uber driver is online")
  test(
    "PRI TC1: coffeeBreak executes first (priority=1)",
    log1[1],
    "Driver is taking coffee break...",
  );
  test("PRI TC2: pick Alice executes second", log1[2], "User Alice is picked");
  test("PRI TC3: pick Bob executes third", log1[3], "User Bob is picked");
  test("PRI TC4: drive executes after picks", log1[4], "Driver is driving...");
  test("PRI TC5: drop Bob executes last", log1[5], "Drop Bob");

  // ── TC set 2: coffeeBreak at priority=2 (second) ─────────────────────────
  const log2 = await capture(() => {
    new UberDriver()
      .pick("Alice")
      .pick("Bob")
      .coffeeBreak(1, 2) // should go second (after Alice)
      .drop("Bob");
  });

  test(
    "PRI TC6: pick Alice executes first (priority=2 coffee)",
    log2[1],
    "User Alice is picked",
  );
  test(
    "PRI TC7: coffeeBreak executes second",
    log2[2],
    "Driver is taking coffee break...",
  );
  test("PRI TC8: pick Bob executes third", log2[3], "User Bob is picked");
  test("PRI TC9: drop Bob executes last", log2[4], "Drop Bob");

  // ── TC set 3: single-break guard ─────────────────────────────────────────
  const log3 = await capture(() => {
    new UberDriver()
      .coffeeBreak(1, 1) // first break — allowed
      .coffeeBreak(1, 1) // second break — should be ignored
      .pick("Alice");
  });

  const breakCount = log3.filter((l) => l.includes("coffee break")).length;
  test(
    "GUARD TC1: only one coffeeBreak logged (single-break guard)",
    breakCount,
    1,
  );

  // ── TC set 4: coffeeBreak at end of chain still inserts at priority index ──
  const log4 = await capture(() => {
    new UberDriver().pick("X").pick("Y").pick("Z").coffeeBreak(1, 3); // insert at position 3
  });

  test("PRI TC10: pick X first", log4[1], "User X is picked");
  test("PRI TC11: pick Y second", log4[2], "User Y is picked");
  test(
    "PRI TC12: coffeeBreak third (priority=3)",
    log4[3],
    "Driver is taking coffee break...",
  );
  test("PRI TC13: pick Z fourth", log4[4], "User Z is picked");

  console.log("\nAll tests done");
})();
