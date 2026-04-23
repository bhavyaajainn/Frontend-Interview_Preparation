// Check if an array is palindrome

// Iterative (brute force)
function palindromeArrayIterative(arr) {
  let isPalindrome = true;
  let arr_len = arr.length;
  for (let i = 0; i < parseInt(arr_len / 2); i++) {
    if (arr[i] !== arr[arr_len - i - 1]) {
      isPalindrome = false;
      break;
    }
  }
  return isPalindrome;
}

// Recursive
function palindromeArrayRecursive(arr, start = 0, end = arr.length - 1) {
  if (start >= end) {
    return true;
  }
  if (arr[start] == arr[end]) {
    return palindromeArrayRecursive(arr, start + 1, end - 1);
  } else {
    return false;
  }
}

// Sample test cases
function testPalindromeArray() {
  let tests = [
    { arr: [1, 2, 3, 2, 1], expected: true },
    { arr: [1, 2, 3, 3, 1], expected: false },
    { arr: [5, 5], expected: true },
    { arr: [1, 2, 2, 2], expected: false },
    { arr: [1, 2, 2, 1], expected: true },
    { arr: [7], expected: true },
    { arr: [1, 2, 3, 4, 5], expected: false },
  ];

  for (let { arr, expected } of tests) {
    let iterResult = palindromeArrayIterative(arr);
    let iterPass = iterResult === expected;
    console.log(
      `palindromeArrayIterative: arr=[${arr}]: ${iterPass ? "Success" : "Fail"} (got ${iterResult}, expected ${expected})`,
    );

    let recResult = palindromeArrayRecursive(arr);
    let recPass = recResult === expected;
    console.log(
      `palindromeArrayRecursive: arr=[${arr}]: ${recPass ? "Success" : "Fail"} (got ${recResult}, expected ${expected})`,
    );
  }
}
testPalindromeArray();

module.exports = { palindromeArrayIterative, palindromeArrayRecursive };
