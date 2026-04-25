// Shuffle an Array — Fisher–Yates Algorithm

// Variant 1: In-place — O(n) time, O(1) space (mutates original)
function shuffle(arr, currentIndex = arr.length) {
  // Write your solution here
  // while currentIndex !== 0:
  //   randomIndex = Math.floor(Math.random() * currentIndex)
  //   currentIndex -= 1
  //   swap arr[currentIndex] and arr[randomIndex]
  // return arr
}

// Variant 2: Non-mutating — O(n) time, O(n) space
function shuffleCopy(arr) {
  // Write your solution here
  // Hint: return shuffle(arr.slice())
  // Original array is preserved
}

// Variant 3: Prototype method — always returns new array, never mutates
// Array.prototype.Shuffle = function() {
//   let arr = this.slice();
//   let currentIndex = this.length;
//   while (currentIndex !== 0) {
//     let randomIndex = Math.floor(Math.random() * currentIndex);
//     currentIndex -= 1;
//     [arr[currentIndex], arr[randomIndex]] = [arr[randomIndex], arr[currentIndex]];
//   }
//   return arr;
// };

// Sample test cases
function testShuffle() {
  const arr = [2, 5, 7, 11, 25];

  console.log("--- In-place shuffle ---");
  const copy1 = [...arr];
  const result1 = shuffle(copy1);
  const sameElements = [...result1].sort((a,b)=>a-b).join() === [...arr].sort((a,b)=>a-b).join();
  console.log(`All elements preserved: ${sameElements ? "Pass" : "Fail"}`);
  console.log(`Shuffled: [${result1}]`);

  console.log("\n--- Non-mutating shuffle ---");
  const result2 = shuffleCopy(arr);
  console.log(`Original unchanged: ${JSON.stringify(arr) === '[2,5,7,11,25]' ? "Pass" : "Fail"}`);
  console.log(`Original: [${arr}]`);
  console.log(`Shuffled copy: [${result2}]`);

  console.log("\n--- Single element ---");
  const single = shuffle([42]);
  console.log(`Single element: [${single}] (expected [42]): ${JSON.stringify(single) === '[42]' ? "Pass" : "Fail"}`);

  console.log("\n--- Distribution check (2 elements, 1000 trials) ---");
  let countSwapped = 0;
  for (let i = 0; i < 1000; i++) {
    const r = shuffle([1, 2]);
    if (r[0] === 2) countSwapped++;
  }
  const ratio = countSwapped / 1000;
  console.log(`Swapped ratio: ${ratio.toFixed(2)} (expected ~0.50): ${ratio > 0.4 && ratio < 0.6 ? "Pass" : "Fail"}`);
}
testShuffle();

module.exports = { shuffle, shuffleCopy };
