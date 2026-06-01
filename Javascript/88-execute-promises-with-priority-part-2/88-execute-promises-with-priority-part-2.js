// Execute Promises with Priority – Part 2
//
// Priority is defined by array index (index 0 = highest priority).
// Return the value of the first fulfilled promise that has no unfulfilled
// higher-priority promise before it.
//
// Two approaches:
//
// Approach 1 — Parallel execution
//   All promises run simultaneously. Track state per index.
//   On each settle, scan from index 0:
//     - pending  → stop (wait for it)
//     - rejected → continue to next
//     - fulfilled → resolve with this value
//   If all rejected → reject with AggregateError
//
// Approach 2 — Sequential execution
//   Await each promise in order; return on first resolve.
//   If all rejected → throw Error.

// ─── Approach 1: Parallel ────────────────────────────────────────────────────

function priorityResolve(promises) {
  return new Promise((resolve, reject) => {
    // TODO: create states array: each entry { status:'pending', value, reason }
    // TODO: let settled = false; let rejectedCount = 0
    // TODO: define checkPromisesThatAreFulfilled():
    //         if settled → return
    //         for each state at index i:
    //           if pending → return (wait)
    //           if rejected → continue
    //           if fulfilled → settled=true; resolve(value); return
    //         if rejectedCount === states.length → settled=true; reject(AggregateError)
    // TODO: promises.forEach((p, i) => Promise.resolve(p).then(resolve handler).catch(reject handler))
    const states = promises.map(() => ({
      status: "pending",
      value: undefined,
      reason: undefined,
    }));
    let settled = false;
    let rejectedCount = 0;

    function checkPromisesThatAreFulfilled() {
      if (settled) return;
      for (let i = 0; i < promises.length; i++) {
        const s = states[i];
        if (s.status == "pending") {
          return;
        }
        if (s.status == "rejected") {
          continue;
        }

        settled = true;
        resolve(s.value);
        return;
      }
      if (rejectedCount == promises.length) {
        settled = true;
        reject(
          new AggregateError(
            states.map((s) => s.reason),
            "All promises rejected",
          ),
        );
      }
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          states[index] = { status: "fulfilled", value };
          checkPromisesThatAreFulfilled();
        })
        .catch((reason) => {
          states[index] = { status: "rejected", reason };
          rejectedCount++;
          checkPromisesThatAreFulfilled();
        });
    });
  });
}

// ─── Approach 2: Sequential ──────────────────────────────────────────────────

async function priorityResolveSequential(promises) {
  for (const p of promises) {
    try {
      return await p;
    } catch {
      // rejected — try next
    }
  }
  throw new Error("All promises rejected");
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
const res = (val, ms) => new Promise((r) => setTimeout(() => r(val), ms));
const rej = (val, ms) => new Promise((_, r) => setTimeout(() => r(val), ms));

(async () => {
  // ── Approach 1: Parallel ──────────────────────────────────────────────────

  // TC1: all resolve — returns index-0 value (slowest but highest priority)
  test(
    "PAR TC1: all resolve → returns index-0 value",
    await priorityResolve([res("A", 150), res("B", 50), res("C", 80)]),
    "A",
  );

  // TC2: index 0 rejects → returns index 1 (next fulfilled)
  test(
    "PAR TC2: index-0 rejects → returns index-1",
    await priorityResolve([rej("A", 100), res("B", 50), res("C", 80)]),
    "B",
  );

  // TC3: indices 0 and 1 reject → returns index 2
  test(
    "PAR TC3: indices 0+1 reject → returns index-2",
    await priorityResolve([rej("A", 100), rej("B", 50), res("C", 80)]),
    "C",
  );

  // TC4: all reject → AggregateError
  let caught = null;
  try {
    await priorityResolve([rej("A", 50), rej("B", 30), rej("C", 70)]);
  } catch (e) {
    caught = e;
  }
  test(
    "PAR TC4: all reject → throws AggregateError",
    caught instanceof AggregateError,
    true,
  );

  // TC5: single promise resolves
  test(
    "PAR TC5: single promise resolves",
    await priorityResolve([res("X", 30)]),
    "X",
  );

  // TC6: single promise rejects
  let caughtSingle = null;
  try {
    await priorityResolve([rej("fail", 30)]);
  } catch (e) {
    caughtSingle = e;
  }
  test(
    "PAR TC6: single promise rejects → AggregateError",
    caughtSingle instanceof AggregateError,
    true,
  );

  // TC7: index-0 resolves last but still wins (parallel: all running)
  test(
    "PAR TC7: index-0 resolves last, still highest priority",
    await priorityResolve([res("A", 150), res("B", 20), res("C", 50)]),
    "A",
  );

  // ── Approach 2: Sequential ────────────────────────────────────────────────

  // TC8: all resolve — returns index-0 value
  test(
    "SEQ TC1: all resolve → returns index-0",
    await priorityResolveSequential([res("A", 50), res("B", 20)]),
    "A",
  );

  // TC9: index-0 rejects → returns index-1
  test(
    "SEQ TC2: index-0 rejects → returns index-1",
    await priorityResolveSequential([rej("A", 50), res("B", 20)]),
    "B",
  );

  // TC10: all reject → throws
  let caughtSeq = null;
  try {
    await priorityResolveSequential([rej("X", 30), rej("Y", 30)]);
  } catch (e) {
    caughtSeq = e;
  }
  test(
    "SEQ TC3: all reject → throws an error",
    caughtSeq instanceof Error,
    true,
  );
  test(
    "SEQ TC4: error message is 'All promises rejected'",
    caughtSeq?.message,
    "All promises rejected",
  );

  // TC11: single resolves
  test(
    "SEQ TC5: single promise resolves",
    await priorityResolveSequential([res("Z", 30)]),
    "Z",
  );

  console.log("\nAll tests done");
})();
