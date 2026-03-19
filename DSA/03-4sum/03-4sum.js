function fourSum(arr, target) {
  const map = new Map();
  const len = arr.length;
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      let value = target - (arr[i] + arr[j]);
      if (map.has(value)) {
        for (let entries of map.get(value)) {
          const { x, y } = entries;
          if (x != i && x != j && y != i && y != j) {
            return true;
          }
        }
      } else if (!map.has(arr[i] + arr[j])) {
        map.set(arr[i] + arr[j], []);
        map.get(arr[i] + arr[j]).push({ x: i, y: j });
      }
    }
  }
  return false;
}

console.log(fourSum([1, 2, 3, 5, 6, 11, 15, 16, 17, 18], 20));
console.log(fourSum([4, 7, 1, 10, 2, 6], 19));
console.log(fourSum([5, 2, 8, 14], 10));
console.log(fourSum([2, 4, 6, 8, 10], 30));
