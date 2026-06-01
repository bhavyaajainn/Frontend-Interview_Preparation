// Sum up Functions Return Value Running in Parallel and in Sequence
//
// wait(num) — resolves with `num` after num * 1000 ms
// A()       — returns 2 after 2 seconds
// B()       — returns 3 after 3 seconds
//
// series()  — awaits A then B sequentially → total ~5 s, sum = 5
// parallel()— starts A and B simultaneously → total ~3 s, sum = 5

const wait = (num) => {
  // TODO: return a Promise that resolves with `num` after num * 1000 ms
  return new Promise((resolve) => setTimeout(resolve, num * 1000, num));
};

const A = async () => {
  // TODO: return wait(2)
  return wait(2);
};

const B = async () => {
  // TODO: return wait(3)
  return wait(3);
};

const series = async () => {
  // TODO: await A(), then await B(), return their sum
  // Total time: ~5 seconds (sequential)
  const taskA = await A();
  const taskB = await B();
  const result = taskA + taskB;
  return result;
};

const parallel = async () => {
  // TODO: start A() and B() without awaiting immediately
  // TODO: then await both and return their sum
  // Total time: ~3 seconds (concurrent)
  // Bonus alternative: use Promise.all([A(), B()])
  const taskA = A();
  const taskB = B();

  const resultA = await taskA;
  const resultB = await taskB;

  return resultA + resultB;
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

function testApprox(name, actual, min, max) {
  const ok = typeof actual === "number" && actual >= min && actual <= max;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected number in [${min}, ${max}]`);
    console.log(`  Got: ${actual}`);
  }
}

(async () => {
  // --- wait() ---
  const t0 = Date.now();
  const wResult = await wait(1);
  const elapsed = Date.now() - t0;
  test("WAIT TC1: resolves with the input number", wResult, 1);
  testApprox("WAIT TC2: resolves after ~1000ms", elapsed, 900, 1200);

  // --- A() and B() ---
  test("A TC1: A() resolves to 2", await A(), 2);
  test("B TC1: B() resolves to 3", await B(), 3);

  // --- series() ---
  const t1 = Date.now();
  const sResult = await series();
  const sElapsed = Date.now() - t1;
  test("SEQ TC1: series() returns correct sum", sResult, 5);
  testApprox(
    "SEQ TC2: series() takes ~5000ms (sequential)",
    sElapsed,
    4800,
    5500,
  );

  // --- parallel() ---
  const t2 = Date.now();
  const pResult = await parallel();
  const pElapsed = Date.now() - t2;
  test("PAR TC1: parallel() returns correct sum", pResult, 5);
  testApprox(
    "PAR TC2: parallel() takes ~3000ms (concurrent)",
    pElapsed,
    2800,
    3500,
  );

  // --- parallel is faster than series ---
  test("PAR TC3: parallel is faster than series", pElapsed < sElapsed, true);

  // --- both return the same value ---
  test("CMP TC1: series and parallel return same sum", sResult, pResult);

  console.log("\nAll tests done");
})();
