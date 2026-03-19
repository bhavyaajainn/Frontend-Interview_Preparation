function threeSum(arr, target) {
  var hashmap = new Map();
  n = arr.length;
  if (n < 3) {
    return false;
  }
  for (let i = 0; i < n; i++) {
    hashmap.set(arr[i], i);
  }
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let value = target - (arr[i] + arr[j]);
      if (hashmap.has(value)) {
        let index = hashmap.get(value);
        if (index != i && index != j) {
          return true;
        }
      }
    }
  }
  return false;
}

console.log(threeSum([1, 2, 3, 5, 6, 11, 15, 16, 17, 18], 20)); //t
console.log(threeSum([4, 7, 1, 10, 2], 13)); //t
console.log(threeSum([5, 2, 8, 14], 10)); //f
console.log(threeSum([2, 4, 6, 8, 10], 18)); //t
