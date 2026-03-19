function twoSum(arr, target) {
  var hashmap = new Set();
  var isFound = false;
  hashmap.add(arr[0]);
  for (let i = 1; i < arr.length; i++) {
    if (hashmap.has(target - arr[i])) {
      isFound = true;
      return true;
    } else {
      hashmap.add(arr[i]);
    }
  }
  return isFound;
}

console.log(twoSum([15, 4, 9, 3, 2, 12, 11, 14, 21, 24, 1, 10], 25));
console.log(twoSum([1, 2, 3, 4, 5], 9));
console.log(twoSum([1, 2, 3, 4, 5], 10));
console.log(twoSum([5, -2, 8, 1], 6));
