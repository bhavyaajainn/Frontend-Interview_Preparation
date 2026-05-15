// Implement async filter function
// All inputs run in parallel; output order matches input order

const filter = (arr, fn) => {
  // TODO

  return new Promise((resolve, reject) => {
    let ans = [];
    let track = 0;
    arr.forEach((ele, index) => {
      fn(ele, (error, result) => {
        track++;
        if (result) {
          ans[index] = ele;
        }
        if (track >= arr.length) {
          resolve(ans.filter(Boolean));
        }
      });
    });
  });
};

// --- Tests ---

// Test case 1 — filter out num*2 === 4 (i.e. num === 2), no errors
let numPromise = filter([1, 2, 3, 4, 5], function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);

    if (num === 7) {
      callback(true);
    } else {
      callback(null, num !== 4);
    }
  }, 2000);
});

numPromise
  .then((result) => console.log("success:" + result))
  .catch(() => console.log("no success"));
// 2, 4, 6, 8, 10 (parallel)
// "success:1,3,4,5"
