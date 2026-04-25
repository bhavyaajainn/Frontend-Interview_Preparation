// Merge two sorted arrays

function mergeArrays(arr1, arr2, desc = false) {
  const l1 = arr1.length;
  const l2 = arr2.length;
  let arr = [];
  let i = 0;
  let j = 0;
  if (!desc) {
    while (i < l1 && j < l2) {
      if (arr1[i] < arr2[j]) {
        arr.push(arr1[i++]);
      } else {
        arr.push(arr2[j++]);
      }
    }
  } else {
    while (i < l1 && j < l2) {
      if (arr1[i] > arr2[j]) {
        arr.push(arr1[i++]);
      } else {
        arr.push(arr2[j++]);
      }
    }
  }
  while (i < l1) {
    arr.push(arr1[i++]);
  }
  while (j < l2) {
    arr.push(arr2[j++]);
  }
  return arr;
}

// Sample test cases
function testMergeArrays() {
  const tests = [
    {
      arr1: [11, 9, 7, 6, 5],
      arr2: [15, 12, 10, 8, 6],
      desc: true,
      expected: [15, 12, 11, 10, 9, 8, 7, 6, 6, 5],
    },
    {
      arr1: [5, 6, 7, 9, 11],
      arr2: [6, 8, 10, 12, 15],
      desc: false,
      expected: [5, 6, 6, 7, 8, 9, 10, 11, 12, 15],
    },
    {
      arr1: [],
      arr2: [1, 2, 3],
      desc: false,
      expected: [1, 2, 3],
    },
    {
      arr1: [1, 2, 3],
      arr2: [],
      desc: false,
      expected: [1, 2, 3],
    },
    {
      arr1: [1, 5],
      arr2: [2, 3, 4, 6],
      desc: false,
      expected: [1, 2, 3, 4, 5, 6],
    },
    {
      arr1: [10, 5],
      arr2: [8, 3],
      desc: true,
      expected: [10, 8, 5, 3],
    },
    {
      arr1: [1],
      arr2: [1],
      desc: false,
      expected: [1, 1], // duplicate values preserved
    },
  ];

  for (let { arr1, arr2, desc, expected } of tests) {
    let result = mergeArrays(arr1, arr2, desc);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `mergeArrays([${arr1}], [${arr2}], ${desc}): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testMergeArrays();

module.exports = { mergeArrays };
