// Program to print the Collatz sequence
function collatz(num) {
  while (num != 1) {
    console.log(num);
    if (num % 2 == 0) {
      num = parseInt(num / 2);
    } else {
      num = num * 3 + 1;
    }
  }
  console.log(num);
}

// Recursive version that stores the sequence in an array
function collatzTail(num, store) {
  if (num === 1) {
    store.push(1);
    return store;
  } else if (num % 2 === 0) {
    store.push(num);
    return collatzTail(parseInt(num / 2), store);
  } else {
    store.push(num);
    return collatzTail(3 * num + 1, store);
  }
}

// Sample test cases
function testCollatz() {
  let tests = [
    { num: 5, expected: [5, 16, 8, 4, 2, 1] },
    {
      num: 11,
      expected: [11, 34, 17, 52, 26, 13, 40, 20, 10, 5, 16, 8, 4, 2, 1],
    },
    { num: 6, expected: [6, 3, 10, 5, 16, 8, 4, 2, 1] },
    { num: 10, expected: [10, 5, 16, 8, 4, 2, 1] },
  ];
  for (let { num, expected } of tests) {
    let result = [];
    // Capture console.log output for collatz
    const originalLog = console.log;
    console.log = (val) => result.push(val);
    collatz(num);
    console.log = originalLog;
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(`collatz: Test num=${num}: ${pass ? "Success" : "Fail"}`);
    // Test collatzTail
    let store = [];
    collatzTail(num, store);
    let recPass = JSON.stringify(store) === JSON.stringify(expected);
    console.log(
      `collatzTail: Test num=${num}: ${recPass ? "Success" : "Fail"}`,
    );
  }
}
testCollatz();

module.exports = { collatz, collatzTail };
