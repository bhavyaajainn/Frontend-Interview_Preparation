// Execute a Set of Async Tasks with Dependencies (like a build graph)
//
// TaskRunner class that executes tasks respecting a dependency graph:
//   - Tasks with no pending dependencies run in parallel
//   - A task runs only after ALL its dependencies have completed successfully
//   - If a dependency fails, all downstream tasks are skipped (marked failed)
//   - Deadlock detected when progress stalls with tasks still pending
//
// runTasks(tasks, dependencies) → Promise<{ results, errors, success }>

class TaskRunner {
  constructor(tasks, dependencies = {}) {
    this.tasks = tasks;
    this.dependencies = dependencies;
    this.completed = new Set();
    this.failed = new Set();
    this.results = {};
    this.errors = {};
  }

  canRun(taskId) {
    // TODO: get deps = this.dependencies[taskId] || []
    // TODO: return deps.every(dep => this.completed.has(dep))
    const deps = this.dependencies[taskId] || [];
    return deps.every((dep) => this.completed.has(dep));
  }

  getReadyTasks() {
    // TODO: filter Object.keys(this.tasks):
    //   - skip if already completed or failed
    //   - if any dependency is in failed → mark this task failed too (skip), return false
    //   - return canRun(taskId)
    return Object.keys(this.tasks).filter((taskId) => {
      if (this.completed.has(taskId) || this.failed.has(taskId)) {
        return false;
      }
      const deps = this.dependencies[taskId] || [];
      const hasFailedDeps = deps.some((dep) => this.failed.has(dep));
      if (hasFailedDeps) {
        this.failed.add(taskId);
        this.errors[taskId] = new Error("Skipped: dependency failed");
        console.log(`Skipping task: ${taskId} (dependency failed)`);
        return false;
      }
      return this.canRun(taskId);
    });
  }

  async runTask(taskId) {
    // TODO: try { result = await this.tasks[taskId](); store result; completed.add(taskId) }
    // TODO: catch { store error; failed.add(taskId); return null }
    const task = this.tasks[taskId];
    console.log(`Starting task: ${taskId}`);
    try {
      const result = await task();
      this.results[taskId] = result;
      this.completed.add(taskId);
      console.log(`Completed task: ${taskId}`);
      return result;
    } catch (error) {
      this.errors[taskId] = error || new Error("Task failed");
      this.failed.add(taskId);
      console.error(
        `Failed task: ${taskId} - ${error?.message || "Unknown error"}`,
      );
      return null;
    }
  }

  async run() {
    // TODO: while (completed.size + failed.size < total tasks):
    //         ready = getReadyTasks()
    //         if ready.length === 0 → throw Error('Deadlock detected')
    //         await Promise.allSettled(ready.map(id => this.runTask(id)))
    // TODO: return { results, errors, success: failed.size === 0 }
    console.log("Starting task execution...");
    while (
      this.completed.size + this.failed.size <
      Object.keys(this.tasks).length
    ) {
      const ready = this.getReadyTasks();
      if (ready.length == 0) {
        throw new Error("Deadlock detected: no tasks can run");
      }
      await Promise.allSettled(ready.map((taskId) => this.runTask(taskId)));
    }
    console.log("Task execution finished!");
    console.log(
      `Completed: ${this.completed.size}, Failed: ${this.failed.size}`,
    );

    return {
      results: this.results,
      errors: this.errors,
      success: this.failed.size === 0,
    };
  }
}

async function runTasks(tasks, dependencies) {
  // TODO: new TaskRunner(tasks, dependencies).run()
  const runner = new TaskRunner(tasks, dependencies);
  return await runner.run();
}

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const tick = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  // ── TC set 1: all tasks pass ──────────────────────────────────────────────
  const tasks1 = {
    A: async () => {
      await tick(50);
      return "Result A";
    },
    B: async () => {
      await tick(60);
      return "Result B";
    },
    C: async () => {
      await tick(40);
      return "Result C";
    },
    D: async () => {
      await tick(50);
      return "Result D";
    },
    E: async () => {
      await tick(40);
      return "Result E";
    },
  };
  const deps1 = { D: ["A", "B"], E: ["C", "D"] };
  const r1 = await runTasks(tasks1, deps1);

  test("ALL PASS TC1: success is true", r1.success, true);
  test("ALL PASS TC2: A completed", r1.results.A, "Result A");
  test("ALL PASS TC3: B completed", r1.results.B, "Result B");
  test("ALL PASS TC4: C completed", r1.results.C, "Result C");
  test("ALL PASS TC5: D completed after A and B", r1.results.D, "Result D");
  test("ALL PASS TC6: E completed after C and D", r1.results.E, "Result E");
  test("ALL PASS TC7: no errors", Object.keys(r1.errors).length, 0);

  // ── TC set 2: one task fails — downstream skipped ─────────────────────────
  const tasks2 = {
    A: async () => {
      await tick(30);
      return "Result A";
    },
    B: async () => {
      await tick(30);
      return "Result B";
    },
    C: async () => {
      await tick(30);
      throw new Error("C failed");
    },
    D: async () => {
      await tick(30);
      return "Result D";
    },
    E: async () => {
      await tick(30);
      return "Result E";
    },
  };
  const deps2 = { D: ["A", "B"], E: ["C", "D"] };
  const r2 = await runTasks(tasks2, deps2);

  test("PARTIAL FAIL TC1: success is false", r2.success, false);
  test("PARTIAL FAIL TC2: A still completed", r2.results.A, "Result A");
  test("PARTIAL FAIL TC3: B still completed", r2.results.B, "Result B");
  test("PARTIAL FAIL TC4: C not in results", r2.results.C, undefined);
  test("PARTIAL FAIL TC5: D completed (no dep on C)", r2.results.D, "Result D");
  test("PARTIAL FAIL TC6: E skipped (dep C failed)", r2.results.E, undefined);
  test(
    "PARTIAL FAIL TC7: C has error entry",
    r2.errors.C instanceof Error,
    true,
  );
  test(
    "PARTIAL FAIL TC8: E has error entry (skipped)",
    r2.errors.E instanceof Error,
    true,
  );

  // ── TC set 3: no dependencies — all run in parallel ───────────────────────
  const order = [];
  const tasks3 = {
    X: async () => {
      await tick(60);
      order.push("X");
      return "X";
    },
    Y: async () => {
      await tick(20);
      order.push("Y");
      return "Y";
    },
    Z: async () => {
      await tick(40);
      order.push("Z");
      return "Z";
    },
  };
  const r3 = await runTasks(tasks3, {});

  test("PARALLEL TC1: all tasks complete", r3.success, true);
  test("PARALLEL TC2: 3 results", Object.keys(r3.results).length, 3);
  test("PARALLEL TC3: fastest task finishes first", order[0], "Y");

  // ── TC set 4: single task, no deps ────────────────────────────────────────
  const r4 = await runTasks({ A: async () => "solo" }, {});
  test("SINGLE TC1: single task completes", r4.results.A, "solo");
  test("SINGLE TC2: success true", r4.success, true);

  console.log("\nAll tests done");
})();
