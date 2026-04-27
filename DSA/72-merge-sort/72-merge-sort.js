// Merge sort

function merge(leftArr, rightArr) {
  // Write your merge helper here
  let ans = [];
  let iL = 0;
  let iR = 0;
  while (iL < leftArr.length && iR < rightArr.length) {
    if (leftArr[iL] < rightArr[iR]) {
      ans.push(leftArr[iL]);
      iL++;
    } else {
      ans.push(rightArr[iR]);
      iR++;
    }
  }
  while (iL < leftArr.length) {
    ans.push(leftArr[iL]);
    iL++;
  }
  while (iR < rightArr.length) {
    ans.push(rightArr[iR]);
    iR++;
  }
  return ans;
}

function mergeSortRec(arr) {
  // Write your recursive merge sort here
  const length = arr.length;
  if (length == 1) {
    return arr;
  }
  let mid = Math.floor(length / 2);
  let left = arr.slice(0, mid);
  let right = arr.slice(mid, length);
  return merge(mergeSortRec(left), mergeSortRec(right));
}

// Sample test cases
function testMergeSort() {
  const tests = [
    { arr: [10, 7, 8, 9, 1, 5], expected: [1, 5, 7, 8, 9, 10] },
    {
      arr: [30, 20, 10, 50, 22, 33, 55],
      expected: [10, 20, 22, 30, 33, 50, 55],
    },
    { arr: [5, 4, 3, 2, 1], expected: [1, 2, 3, 4, 5] }, // reverse sorted
    { arr: [1, 2, 3, 4, 5], expected: [1, 2, 3, 4, 5] }, // already sorted
    { arr: [1], expected: [1] }, // single element (base case)
    { arr: [2, 2, 2], expected: [2, 2, 2] }, // all same
    { arr: [-3, 0, -1, 2, -5], expected: [-5, -3, -1, 0, 2] }, // negatives
  ];

  for (let { arr, expected } of tests) {
    let result = mergeSortRec([...arr]);
    let pass = JSON.stringify(result) === JSON.stringify(expected);
    console.log(
      `mergeSortRec([${arr}]): ${pass ? "Success" : "Fail"} (got [${result}], expected [${expected}])`,
    );
  }
}
testMergeSort();

module.exports = { mergeSortRec, merge };
