// Converting string to jadencase
function toJadenCase(str) {
  return str
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// Sample test cases
function testToJadenCase() {
  let tests = [
    {
      str: "How can mirrors be real if our eyes aren't real",
      expected: "How Can Mirrors Be Real If Our Eyes Aren't Real",
    },
    { str: "hello world", expected: "Hello World" },
    { str: "a b c", expected: "A B C" },
    { str: "", expected: "" },
  ];
  for (let { str, expected } of tests) {
    let result = toJadenCase(str);
    let pass = result === expected;
    console.log(`Test str='${str}': ${pass ? "Success" : "Fail"}`);
  }
}
testToJadenCase();

module.exports = toJadenCase;
