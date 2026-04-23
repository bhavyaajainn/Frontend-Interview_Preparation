// FizzBuzz program

function fizzBuzz(n) {
  for (let i = 1; i <= n; i++) {
    if (i % 3 == 0 && i % 5 == 0) {
      console.log("FizzBuzz");
    } else if (i % 3 == 0) {
      console.log("Fizz");
    } else if (i % 5 == 0) {
      console.log("Buzz");
    } else {
      console.log(i);
    }
  }
}

// Sample test cases
function testFizzBuzz() {
  let tests = [
    {
      n: 15,
      expected: [
        "1",
        "2",
        "Fizz",
        "4",
        "Buzz",
        "Fizz",
        "7",
        "8",
        "Fizz",
        "Buzz",
        "11",
        "Fizz",
        "13",
        "14",
        "FizzBuzz",
      ],
    },
    {
      n: 5,
      expected: ["1", "2", "Fizz", "4", "Buzz"],
    },
    {
      n: 1,
      expected: ["1"],
    },
  ];

  for (let { n, expected } of tests) {
    let result = [];
    const originalLog = console.log;
    console.log = (val) => result.push(String(val));
    fizzBuzz(n);
    console.log = originalLog;

    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `fizzBuzz(${n}): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testFizzBuzz();

module.exports = { fizzBuzz };
