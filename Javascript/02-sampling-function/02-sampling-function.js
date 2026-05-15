// Sampling Function
// Execute a function once every N calls

function sampler(fn, count, context) {
  // TODO
  let calls = 0;
  return (...args) => {
    if (++calls == count) {
      calls = 0;
      return fn(...args);
    }
  };
}

// --- Tests ---

function testSampler() {
  const tests = [
    {
      label: "executes on every 4th call",
      count: 4,
      calls: 8,
      expectedCalls: [4, 8],
    },
    {
      label: "executes on every 1st call (count=1)",
      count: 1,
      calls: 3,
      expectedCalls: [1, 2, 3],
    },
    {
      label: "executes on every 3rd call",
      count: 3,
      calls: 9,
      expectedCalls: [3, 6, 9],
    },
  ];

  for (const { label, count, calls, expectedCalls } of tests) {
    const executed = [];
    let callNum = 0;

    const fn = () => executed.push(callNum);
    const sample = sampler(fn, count);

    for (let i = 0; i < calls; i++) {
      callNum = i + 1;
      sample();
    }

    const pass = JSON.stringify(executed) === JSON.stringify(expectedCalls);
    console.log(
      `[Sampler] ${label}: ${pass ? "Success" : "Fail"} (got [${executed}], expected [${expectedCalls}])`,
    );
  }
}

testSampler();
