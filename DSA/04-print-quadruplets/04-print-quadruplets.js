// Print All the Quadruplets with Given Sum
function fourSum(arr, target) {
  let ans = [];
  const n = arr.length;
  arr.sort((a, b) => a - b);
  for (let i = 0; i < n - 4; i++) {
    for (let j = i + 1; j < n - 3; j++) {
      let summ = target - (arr[i] + arr[j]);
      let low = j + 1;
      let high = n - 1;
      while (low < high) {
        if (arr[low] + arr[high] < summ) {
          low++;
        } else if (arr[low] + arr[high] > summ) {
          high--;
        } else {
          ans.push([arr[i], arr[j], arr[low], arr[high]]);
          low++;
          high--;
        }
      }
    }
  }
  return ans;
}

// Sample test cases
function arraysEqual(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (Array.isArray(a[i]) && Array.isArray(b[i])) {
      if (!arraysEqual(a[i], b[i])) return false;
    } else if (a[i] !== b[i]) return false;
  }
  return true;
}

function testFourSum() {
  let tests = [
    {
      arr: [2, 7, 4, 0, 9, 5, 1, 3],
      target: 20,
      expected: [
        [0, 4, 7, 9],
        [1, 3, 7, 9],
        [2, 4, 5, 9],
      ],
    },
    {
      arr: [1, 2, 3, 5, 6, 11, 15, 16, 17, 18],
      target: 20,
      expected: [
        [1, 2, 6, 11],
        [1, 3, 5, 11],
      ],
    },
    {
      arr: [1, 0, -1, 0, -2, 2],
      target: 0,
      expected: [
        [-2, -1, 1, 2],
        [-2, 0, 0, 2],
        [-1, 0, 0, 1],
      ],
    },
    { arr: [2, 2, 2, 2, 2], target: 8, expected: [[2, 2, 2, 2]] },
  ];
  for (let { arr, target, expected } of tests) {
    let result = fourSum(arr, target);
    // Sort inner arrays and outer array for comparison
    let sortArr = (arrs) =>
      arrs.map((a) => a.slice().sort((x, y) => x - y)).sort();
    let pass = arraysEqual(sortArr(result || []), sortArr(expected));
    console.log(
      `Test arr=${JSON.stringify(arr)}, target=${target}: ${
        pass ? "Success" : "Fail"
      }`
    );
    if (!pass) {
      console.log("Expected:", JSON.stringify(sortArr(expected)));
      console.log("Got     :", JSON.stringify(sortArr(result || [])));
    }
  }
}
testFourSum();

module.exports = fourSum;
