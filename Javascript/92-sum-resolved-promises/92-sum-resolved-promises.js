// Sum of All the Resolved Promises
//
// sumResolvedPromises(promises) — resolves with the sum of all resolved values.
//   If ALL promises reject → reject with "All promises rejected".
//   Individual rejections are ignored as long as at least one resolves.
//
// Two approaches:
//   Approach 1 — Manual forEach with settled/resolved counters
//   Approach 2 — Promise.allSettled (cleaner)

// Approach 1 — forEach with counters
function sumResolvedPromises(promises) {
  return new Promise((resolve, reject) => {
    let resolvedSum = 0;
    let resolvedCount = 0;
    let settledCount = 0;
    promises.forEach((promise) => {
      Promise.resolve(promise)
        .then((val) => {
          resolvedSum += val;
          resolvedCount++;
        })
        .catch(() => {})
        .finally(() => {
          settledCount++;
          if (settledCount == promises.length) {
            if (resolvedCount == 0) {
              reject("All promises rejected");
            } else {
              resolve(resolvedSum);
            }
          }
        });
    });
  });
}

// Approach 2 — Promise.allSettled
function sumResolvedPromises2(promises) {
  return Promise.allSettled(promises).then((res) => {
    const resolved = res
      .filter((r) => r.status == "fulfilled")
      .map((r) => r.value);
    if (resolved.length == 0) {
      throw new Error("All promises rejected");
    }
    return resolved.reduce((a, b) => a + b, 0);
  });
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

(async () => {
  // ── Approach 1 ───────────────────────────────────────────────────────────

  // TC1: mix of resolved and rejected → sum of resolved
  test(
    "A1 TC1: mix → sum of resolved (35)",
    await sumResolvedPromises([
      Promise.resolve(10),
      Promise.reject("err"),
      Promise.resolve(20),
      Promise.reject("fail"),
      Promise.resolve(5),
    ]),
    35,
  );

  // TC2: all resolve
  test(
    "A1 TC2: all resolve → sum (6)",
    await sumResolvedPromises([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ]),
    6,
  );

  // TC3: all reject → rejects with message
  let caught1 = null;
  try {
    await sumResolvedPromises([
      Promise.reject("e1"),
      Promise.reject("e2"),
      Promise.reject("e3"),
    ]);
  } catch (e) {
    caught1 = e;
  }
  test(
    "A1 TC3: all reject → rejection value is 'All promises rejected'",
    caught1,
    "All promises rejected",
  );

  // TC4: single resolve among many rejections
  test(
    "A1 TC4: single resolve → that value (42)",
    await sumResolvedPromises([
      Promise.reject("x"),
      Promise.resolve(42),
      Promise.reject("y"),
    ]),
    42,
  );

  // TC5: single promise resolves
  test(
    "A1 TC5: single resolve",
    await sumResolvedPromises([Promise.resolve(7)]),
    7,
  );

  // TC6: single promise rejects
  let caught2 = null;
  try {
    await sumResolvedPromises([Promise.reject("only")]);
  } catch (e) {
    caught2 = e;
  }
  test(
    "A1 TC6: single reject → 'All promises rejected'",
    caught2,
    "All promises rejected",
  );

  // TC7: resolved values are 0 — still should sum to 0, not reject
  test(
    "A1 TC7: resolved value of 0 is counted",
    await sumResolvedPromises([Promise.resolve(0), Promise.reject("x")]),
    0,
  );

  // ── Approach 2 ───────────────────────────────────────────────────────────

  test(
    "A2 TC1: mix → sum of resolved (35)",
    await sumResolvedPromises2([
      Promise.resolve(10),
      Promise.reject("err"),
      Promise.resolve(20),
      Promise.reject("fail"),
      Promise.resolve(5),
    ]),
    35,
  );

  test(
    "A2 TC2: all resolve → sum (6)",
    await sumResolvedPromises2([
      Promise.resolve(1),
      Promise.resolve(2),
      Promise.resolve(3),
    ]),
    6,
  );

  let caught3 = null;
  try {
    await sumResolvedPromises2([Promise.reject("e1"), Promise.reject("e2")]);
  } catch (e) {
    caught3 = e;
  }
  test("A2 TC3: all reject → throws", caught3 instanceof Error, true);

  test(
    "A2 TC4: single resolve among rejections",
    await sumResolvedPromises2([
      Promise.reject("x"),
      Promise.resolve(99),
      Promise.reject("y"),
    ]),
    99,
  );

  console.log("\nAll tests done");
})();
