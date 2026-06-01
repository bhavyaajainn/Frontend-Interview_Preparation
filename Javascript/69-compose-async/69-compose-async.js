// Create composeAsync Function with Chaining Support
//
// Two variations:
//
// Variation 1 — Promise-based (handles async + sync functions)
//   composeAsync(...fns) → async (...args) → Promise<result>
//   Executes right-to-left; each fn receives the result of the previous one.
//   First fn can receive multiple args; subsequent fns receive a single value.
//
// Variation 2 — Callback-based (Node-style error-first callback)
//   composeAsync(...fns) → (...args, done) — last arg is done(err, result)
//   Each fn receives (value, next); calls next(null, val) to advance or next(err) to abort.
//   Also executes right-to-left.

// ─── Variation 1: Promise-based ──────────────────────────────────────────────

const composeAsync =
  (...fns) =>
  async (...input) => {
    // TODO: return an async function that accepts ...input
    // TODO: iterate fns in reverse (right-to-left)
    // TODO: await each fn; spread array results as multiple args for the first call
    // TODO: return final result
    //
    // Alternative: use reduceRight with a Promise chain
    let result = input;
    const reversedFunctionsList = [...fns].reverse();
    for (const func of reversedFunctionsList) {
      result = await func(...(Array.isArray(result) ? result : [result]));
    }
    return result;
  };

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

// ── Helpers ──────────────────────────────────────────────────────────────────

// Async versions (Variation 1)
const asyncMul = (x, y) => new Promise((r) => setTimeout(() => r(x * y), 20));
const asyncAdd = (z) => new Promise((r) => setTimeout(() => r(z + 5), 20));
const asyncDiv = (r) => new Promise((r2) => setTimeout(() => r2(r / 10), 20));

// Sync versions (Variation 1)
const syncMul = (x, y) => x * y;
const syncAdd = (z) => z + 5;
const syncDiv = (r) => r / 10;

// Callback versions (Variation 2)
const cbMul = (x, y, next) => setTimeout(() => next(null, x * y), 20);
const cbAdd = (z, next) => setTimeout(() => next(null, z + 5), 20);
const cbDiv = (r, next) => setTimeout(() => next(null, r / 10), 20);
const cbErr = (v, next) => next(new Error("boom"));

(async () => {
  // ── Variation 1: async functions ─────────────────────────────────────────

  // TC1: basic right-to-left execution — (5*3=15 → +5=20 → /10=2)
  const r1 = await composeAsync(asyncDiv, asyncAdd, asyncMul)(5, 3);
  test("V1 TC1: async compose right-to-left (5*3+5)/10 = 2", r1, 2);

  // TC2: single async function
  const r2 = await composeAsync(asyncAdd)(10);
  test("V1 TC2: single async fn", r2, 15);

  // TC3: sync functions work too
  const r3 = await composeAsync(syncDiv, syncAdd, syncMul)(5, 3);
  test("V1 TC3: sync functions supported", r3, 2);

  // TC4: mixed async + sync
  const r4 = await composeAsync(asyncDiv, syncAdd, asyncMul)(5, 3);
  test("V1 TC4: mixed async and sync functions", r4, 2);

  // TC5: single-arg first function (no spread needed after first)
  const r5 = await composeAsync(asyncDiv, asyncAdd)(10);
  test("V1 TC5: two-function compose (10+5)/10 = 1.5", r5, 1.5);

  // TC6: returns a promise

  console.log("\nAll tests done");
})();
