function printAllTriplets(arr = [2, 4, 6, 8, 10], target = 18) {
  arr = arr.sort((a, b) => a - b);
  n = arr.length;
  for (let i = 0; i <= n - 3; i++) {
    let value = target - arr[i];

    let low = i + 1;
    let high = n - 1;
    while (low < high) {
      if (arr[low] + arr[high] < value) {
        low++;
      } else if (arr[low] + arr[high] > value) {
        high--;
      } else {
        console.log(arr[i], arr[low], arr[high]);
        low++;
        high--;
      }
    }
  }
}

printAllTriplets();
