// Create PromiseSchedular that can be Paused and Resumed
//
// PromiseSchedular(promises, options) — executes async functions serially
//   options: { startIndex, callbacks: { onStart, onPause, onCompleted } }
//
// Methods:
//   run()                      — start/resume execution from current startIndex
//   pause()                    — halt after current promise finishes
//   getState()                 — { state: 'in-progress'|'paused'|'completed', unexecutedFunctionsIndices }
//   runAllUnexecutedFunctions() — execute ALL unexecuted functions (handles gaps from pause)
//
// Internal helpers:
//   processHelper()            — recursive async executor; respects isProcessing flag
//   unexecutedFunctionsIndices() — returns indices where promisesExecutedIndices[i] === false

class PromiseSchedular {
  constructor(promises, options) {
    // TODO: store this.promises, this.startIndex (options.startIndex ?? 0), this.callbacks
    // TODO: build this.promisesExecutedIndices = { 0: false, 1: false, ... } for each index
    // TODO: this.isProcessing = false
    // TODO: this.runningAllUnExecuted = false
    this.promises = promises;
    this.startIndex = options?.startIndex ?? 0;
    this.callbacks = options?.callbacks ?? {};

    this.promiseExecutedIndices = Object.keys(promises).reduce((a, b) => {
      a[b] = false;
      return a;
    }, {});
    this.isProcessing = false;
    this.runningAllUnexecuted = false;
  }

  async processHelper() {
    // TODO: if !isProcessing → return (paused or completed externally)
    // TODO: if promisesExecutedIndices[startIndex] is already true → all done:
    //         set isProcessing=false, runningAllUnExecuted=false, call onCompleted, return
    // TODO: mark promisesExecutedIndices[startIndex] = true; get promise = promises[startIndex++]
    // TODO: try { await promise() } catch { console.error('Error while processing promise') }
    // TODO: finally:
    //         if startIndex < promises.length → recurse processHelper()
    //         else:
    //           isProcessing = false
    //           if no unexecuted left → onCompleted()
    //           else if runningAllUnExecuted → runAllUnexecutedFunctions() (wrap around)
    if (!this.isProcessing) {
      return;
    }

    if (this.promiseExecutedIndices[this.startIndex]) {
      this.isProcessing = false;
      this.runningAllUnexecuted = false;
      this.callbacks?.onCompleted?.();
      return;
    }

    this.promiseExecutedIndices[this.startIndex] = true;
    const promise = this.promises[this.startIndex++];

    try {
      await promise();
    } catch (e) {
      console.error("Error while processing promise");
    } finally {
      if (this.startIndex < this.promises.length) {
        this.processHelper();
      } else {
        const wasProcessing = this.isProcessing;
        this.isProcessing = false;
        if (this.unexecutedFunctionsIndices().length == 0 && wasProcessing) {
          this.callbacks?.onCompleted?.();
        } else {
          if (this.runningAllUnexecuted) {
            this.runAllUnexecutedFunctions();
          }
        }
      }
    }
  }

  run() {
    // TODO: set isProcessing = true; call processHelper(); call onStart callback
    this.isProcessing = true;
    this.processHelper();
    this.callbacks?.onStart?.();
  }

  async pause() {
    // TODO: isProcessing = false; runningAllUnExecuted = false; call onPause callback
    this.isProcessing = false;
    this.runningAllUnexecuted = false;
    this.callbacks?.onPause?.();
  }

  getState() {
    // TODO: get unexecutedFunctionsIndices
    // TODO: derive state:
    //         if unexecuted.length > 0 → isProcessing ? 'in-progress' : 'paused'
    //         else → 'completed'
    // TODO: return { state, unexecutedFunctionsIndices }
    const unexecutedFunctionsIndices = this.unexecutedFunctionsIndices();
    const state = (() => {
      const promisesPending = unexecutedFunctionsIndices.length > 0;
      if (promisesPending) {
        if (this.isProcessing) {
          return "in-progress";
        } else {
          return "paused";
        }
      } else {
        return "completed";
      }
    })();
    return { state, unexecutedFunctionsIndices };
  }

  unexecutedFunctionsIndices() {
    // TODO: filter keys of promisesExecutedIndices where value === false
    return Object.keys(this.promiseExecutedIndices).filter(
      (e) => this.promiseExecutedIndices[e] === false,
    );
  }

  runAllUnexecutedFunctions() {
    // TODO: if nothing unexecuted → return
    // TODO: isProcessing = true; runningAllUnExecuted = true
    // TODO: if startIndex !== promises.length → run() (resume from pause point)
    //         else → startIndex = 0; run() (wrap around from beginning)
    if (this.unexecutedFunctionsIndices().length === 0) {
      return;
    }
    this.isProcessing = true;
    this.runningAllUnexecuted = true;
    if (this.startIndex !== this.promises.length) {
      this.run();
    } else {
      this.startIndex = 0;
      this.run();
    }
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const tick = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  // ── TC1: run executes all functions in order ──────────────────────────────
  const order = [];
  const fns = [
    async () => {
      order.push(0);
    },
    async () => {
      order.push(1);
    },
    async () => {
      order.push(2);
    },
  ];
  const s1 = new PromiseSchedular(fns, { startIndex: 0, callbacks: {} });
  s1.run();
  await tick(50);
  test(
    "TC1: all functions executed in order",
    JSON.stringify(order),
    JSON.stringify([0, 1, 2]),
  );

  // ── TC2: getState returns 'completed' after all done ──────────────────────
  test("TC2: state is completed after run", s1.getState().state, "completed");
  test(
    "TC3: no unexecuted indices after completion",
    s1.getState().unexecutedFunctionsIndices.length,
    0,
  );

  // ── TC3: startIndex skips earlier functions ───────────────────────────────
  const order2 = [];
  const fns2 = [
    async () => {
      order2.push(0);
    },
    async () => {
      order2.push(1);
    },
    async () => {
      order2.push(2);
    },
  ];
  const s2 = new PromiseSchedular(fns2, { startIndex: 1, callbacks: {} });
  s2.run();
  await tick(50);
  test("TC4: startIndex=1 skips index 0", order2.includes(0), false);
  test(
    "TC5: startIndex=1 executes 1 and 2",
    JSON.stringify(order2),
    JSON.stringify([1, 2]),
  );
  test("TC6: index 0 is unexecuted", s2.getState().unexecutedFunctionsIndices, [
    "0",
  ]);

  // ── TC4: pause halts execution ────────────────────────────────────────────
  const order3 = [];
  const fns3 = [
    async () => {
      order3.push(0);
      await tick(100);
    },
    async () => {
      order3.push(1);
      await tick(100);
    },
    async () => {
      order3.push(2);
    },
  ];
  const s3 = new PromiseSchedular(fns3, { startIndex: 0, callbacks: {} });
  s3.run();
  await tick(150); // fn0 finishes, fn1 starts
  s3.pause();
  await tick(150); // fn1 finishes but fn2 should NOT run
  test(
    "TC7: pause stops execution after current promise",
    order3.includes(2),
    false,
  );
  test("TC8: state is paused after pause()", s3.getState().state, "paused");

  // ── TC5: run() resumes from where it was paused ───────────────────────────
  s3.run();
  await tick(200);
  test(
    "TC9: run() after pause executes remaining functions",
    order3.includes(2),
    true,
  );
  test(
    "TC10: state is completed after resuming",
    s3.getState().state,
    "completed",
  );

  // ── TC6: onStart and onPause callbacks fire ───────────────────────────────
  let started = false,
    paused = false,
    completed = false;
  const s4 = new PromiseSchedular(
    [
      async () => {
        await tick(100);
      },
    ],
    {
      startIndex: 0,
      callbacks: {
        onStart: () => {
          started = true;
        },
        onPause: () => {
          paused = true;
        },
        onCompleted: () => {
          completed = true;
        },
      },
    },
  );
  s4.run();
  test("TC11: onStart fires on run()", started, true);
  s4.pause();
  test("TC12: onPause fires on pause()", paused, true);
  await tick(200);
  test("TC13: onCompleted does NOT fire while paused", completed, false);

  // ── TC7: runAllUnexecutedFunctions executes skipped indices ───────────────
  const order4 = [];
  const fns4 = [
    async () => {
      order4.push(0);
    },
    async () => {
      order4.push(1);
    },
    async () => {
      order4.push(2);
    },
  ];
  const s5 = new PromiseSchedular(fns4, { startIndex: 1, callbacks: {} });
  s5.run(); // executes 1, 2
  await tick(50);
  s5.runAllUnexecutedFunctions(); // should execute 0
  await tick(50);
  test("TC14: runAllUnexecuted runs skipped index 0", order4.includes(0), true);
  test(
    "TC15: all indices executed after runAllUnexecuted",
    s5.getState().state,
    "completed",
  );

  console.log("\nAll tests done");
})();
