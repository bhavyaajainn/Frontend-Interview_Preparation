// Implement Stack with Max and Min Function

function StackWithMax() {
  let items = [];
  let length = 0;

  this.push = (item) => {
    // Write your solution here
    // If length === 0 → items[length++] = { value: item, max: item, min: item }
    // Else → get prev = this.peek(), inherit max/min, update if item > max or item < min
    //         items[length++] = { value: item, max, min }
  };

  this.pop = () => {
    // Write your solution here
    // If length === 0 → return undefined
    // Return items[--length]
  };

  this.peek = () => {
    // Write your solution here
    // Return items[length - 1] or undefined if empty
  };

  this.max = () => {
    // Write your solution here
    // Return this.peek()?.max
  };

  this.min = () => {
    // Write your solution here
    // Return this.peek()?.min
  };

  this.isEmpty = () => length === 0;
  this.size    = () => length;
}

// Sample test cases
function testStackWithMax() {
  console.log("--- Test 1: General with pop ---");
  const s1 = new StackWithMax();
  [4, 7, 11, 23, 77, 3, 1].forEach(v => s1.push(v));
  s1.pop();
  console.log(`max: ${s1.max()} (expected 77): ${s1.max() === 77 ? "Pass" : "Fail"}`);
  console.log(`min: ${s1.min()} (expected 3):  ${s1.min() === 3  ? "Pass" : "Fail"}`);

  console.log("\n--- Test 2: Ascending pushes ---");
  const s2 = new StackWithMax();
  [2, 5, 17, 23, 88, 54].forEach(v => s2.push(v));
  console.log(`max: ${s2.max()} (expected 88): ${s2.max() === 88 ? "Pass" : "Fail"}`);
  console.log(`min: ${s2.min()} (expected 2):  ${s2.min() === 2  ? "Pass" : "Fail"}`);

  console.log("\n--- Test 3: Single element ---");
  const s3 = new StackWithMax();
  s3.push(42);
  console.log(`max: ${s3.max()} (expected 42): ${s3.max() === 42 ? "Pass" : "Fail"}`);
  console.log(`min: ${s3.min()} (expected 42): ${s3.min() === 42 ? "Pass" : "Fail"}`);

  console.log("\n--- Test 4: Pop non-max, max stays correct ---");
  const s4 = new StackWithMax();
  [5, 10, 3].forEach(v => s4.push(v));
  s4.pop();
  console.log(`max: ${s4.max()} (expected 10): ${s4.max() === 10 ? "Pass" : "Fail"}`);
  console.log(`min: ${s4.min()} (expected 5):  ${s4.min() === 5  ? "Pass" : "Fail"}`);

  console.log("\n--- Test 5: Empty stack ---");
  const s5 = new StackWithMax();
  console.log(`max on empty: ${s5.max()} (expected undefined): ${s5.max() === undefined ? "Pass" : "Fail"}`);
}
testStackWithMax();

module.exports = { StackWithMax };
