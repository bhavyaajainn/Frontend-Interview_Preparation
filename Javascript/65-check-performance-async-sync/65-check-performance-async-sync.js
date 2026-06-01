// Check Performance of Async and Sync Functions
//
// measurePerformance(fn, options) — runs fn N times, returns timing stats
//   options: { name, iterations, warmup, logResults }
//   returns: { name, iterations, isAsync, timings[], average, min, max, total }
//
// comparePerformance(functions, options) — runs measurePerformance for each fn,
//   sorts results by average, logs comparison table
//   functions: [{ fn, name }, ...]

async function measurePerformance(fn, options = {}) {
  // TODO: destructure options with defaults:
  //         name = fn.name || 'Anonymous Function'
  //         iterations = 1, warmup = true, logResults = true
  // TODO: build results object with name, iterations, isAsync, timings[], average, min, max, total
  //         isAsync: fn.constructor.name === 'AsyncFunction'
  // TODO: if warmup, await fn() inside try/catch (warn on failure, don't abort)
  // TODO: loop iterations times:
  //         record performance.now() before and after await fn()
  //         push elapsed to results.timings; update min/max/total
  //         on error, log and continue (don't count that iteration)
  // TODO: compute average = total / timings.length
  // TODO: if logResults, print the formatted summary block
  // TODO: return results
  const {
    name = fn.name || "Anonymous Function",
    iterations = 1,
    warmup = true,
    logResults = true,
  } = options;

  const results = {
    name,
    iterations,
    isAsync: fn.constructor.name === "AsyncFunction",
    timings: [],
    average: 0,
    min: Infinity,
    max: -Infinity,
    total: 0,
  };
  if (warmup) {
    try {
      await fn();
    } catch (error) {
      console.warn(`warmup run failed for ${name}:`, error);
    }
  }

  for (let i = 0; i < iterations; i++) {
    const start = performance.now();
    try {
      await fn();
    } catch {
      continue;
    }
    const end = performance.now();
    const duration = end - start;

    results.timings.push(duration);
    results.min = Math.min(results.min, duration);
    results.max = Math.max(results.max, duration);
    results.total += duration;
  }

  results.average = results.total / results.timings.length;

  if (logResults) {
    console.log(`\nPerformance Results for ${name}:`);
    console.log("----------------------------------------");
    console.log(`Type: ${results.isAsync ? "Async" : "Sync"}`);
    console.log(`Iterations: ${iterations}`);
    console.log(`Average: ${results.average.toFixed(2)}ms`);
    console.log(`Min: ${results.min.toFixed(2)}ms`);
    console.log(`Max: ${results.max.toFixed(2)}ms`);
    console.log("----------------------------------------\n");
  }

  return results;
}

async function comparePerformance(functions, options = {}) {
  // TODO: iterate functions array, call measurePerformance for each with its name
  // TODO: sort results by average ascending
  // TODO: if logResults !== false, print ranked comparison table
  // TODO: return sorted results array

  const { logResults } = options;
  const results = [];

  for (const { fn, name } of functions) {
    const result = await measurePerformance(fn, { ...options, name });
    results.push(result);
  }
  results.sort((a, b) => a.average - b.average);
  if (logResults !== false) {
    console.log("\nPerformance Comparison:");
    console.log("----------------------------------------");
    results.forEach((result, index) => {
      console.log(`${index + 1}. ${result.name}:`);
      console.log(`   Average: ${result.average.toFixed(2)}ms`);
      console.log(`   Min: ${result.min.toFixed(2)}ms`);
      console.log(`   Max: ${result.max.toFixed(2)}ms`);
    });
    console.log("----------------------------------------\n");
  }

  return results;
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

function testApprox(name, actual, min, max) {
  const ok = typeof actual === "number" && actual >= min && actual <= max;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected number in [${min}, ${max}]`);
    console.log(`  Got: ${actual}`);
  }
}

// --- measurePerformance: sync function ---

const syncFn = () => {
  let s = 0;
  for (let i = 0; i < 100000; i++) s += i;
  return s;
};

const asyncFn = async () => {
  await new Promise((r) => setTimeout(r, 50));
  return "done";
};

const throwingFn = async () => {
  throw new Error("boom");
};

(async () => {
  // TC1: result object has expected shape
  const r1 = await measurePerformance(syncFn, {
    iterations: 3,
    warmup: false,
    logResults: false,
  });
  test("MEAS TC1: result has name", typeof r1.name, "string");
  test("MEAS TC2: result.iterations matches option", r1.iterations, 3);
  test("MEAS TC3: isAsync is false for sync fn", r1.isAsync, false);
  test(
    "MEAS TC4: timings array length equals iterations",
    r1.timings.length,
    3,
  );
  testApprox(
    "MEAS TC5: total >= sum of timings",
    r1.total,
    r1.timings.reduce((a, b) => a + b, 0) - 0.01,
    r1.total + 0.01,
  );
  testApprox(
    "MEAS TC6: average = total / iterations",
    r1.average,
    r1.total / 3 - 0.01,
    r1.total / 3 + 0.01,
  );
  test("MEAS TC7: min <= average", r1.min <= r1.average, true);
  test("MEAS TC8: max >= average", r1.max >= r1.average, true);

  // TC2: async function detection
  const r2 = await measurePerformance(asyncFn, {
    iterations: 2,
    warmup: false,
    logResults: false,
  });
  test("MEAS TC9: isAsync is true for async fn", r2.isAsync, true);
  testApprox(
    "MEAS TC10: async timing >= 50ms per iteration",
    r2.average,
    50,
    500,
  );

  // TC3: warmup does not add to timings
  const r3 = await measurePerformance(syncFn, {
    iterations: 2,
    warmup: true,
    logResults: false,
  });
  test(
    "MEAS TC11: warmup does not inflate timings count",
    r3.timings.length,
    2,
  );

  // TC4: anonymous function gets default name
  const r4 = await measurePerformance(() => {}, {
    iterations: 1,
    warmup: false,
    logResults: false,
  });
  test(
    "MEAS TC12: anonymous fn defaults to 'Anonymous Function'",
    r4.name,
    "Anonymous Function",
  );

  // TC5: throwing fn — loop continues, timings may be 0 but no crash
  let crashed = false;
  try {
    await measurePerformance(throwingFn, {
      iterations: 3,
      warmup: false,
      logResults: false,
    });
  } catch {
    crashed = true;
  }
  test(
    "MEAS TC13: throwing fn does not crash measurePerformance",
    crashed,
    false,
  );

  // --- comparePerformance ---

  const fastFn = async () => {
    await new Promise((r) => setTimeout(r, 10));
  };
  const slowFn = async () => {
    await new Promise((r) => setTimeout(r, 80));
  };

  const cmp = await comparePerformance(
    [
      { fn: slowFn, name: "Slow" },
      { fn: fastFn, name: "Fast" },
    ],
    { iterations: 2, warmup: false, logResults: false },
  );

  test("CMP TC1: returns array of results", Array.isArray(cmp), true);
  test("CMP TC2: result count matches input count", cmp.length, 2);
  test(
    "CMP TC3: results sorted by average ascending (fastest first)",
    cmp[0].name,
    "Fast",
  );
  test(
    "CMP TC4: each result has average field",
    typeof cmp[0].average,
    "number",
  );

  console.log("\nAll tests done");
})();
