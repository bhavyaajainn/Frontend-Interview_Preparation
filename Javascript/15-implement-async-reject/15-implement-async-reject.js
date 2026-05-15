// Implement async reject function — opposite of async filter
// Items that FAIL the iteratee test are kept; output order matches input

const reject = (arr, fn) => {
  // TODO
  return new Promise((resolve, reject) => {
    let ans = [];
    let track = 0;
    arr.forEach((ele, index) => {
      fn(ele, (error, result) => {
        track++;
        if (error) {
          reject(error);
        }
        if (!result) {
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

let numPromise = reject([1, 2, 3, 4, 5], function (num, callback) {
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
// "success:2"   — only 2 fails the test (2*2 === 4, num !== 4 is false)
