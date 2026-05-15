// Implement mapLimit async function
// Asked in Uber's frontend interview

// Helper: chop array into sub-arrays of given size
Array.prototype.chop = function (size) {
  // TODO
  let temp = [...this];
  if (!size) {
    return temp;
  }
  let ans = [];
  let i = 0;
  while (i < temp.length) {
    ans.push(temp.slice(i, i + size));
    i = i + size;
  }
  return ans;
};

const mapLimit = (arr, limit, fn) => {
  // TODO

  return new Promise((resolve, reject) => {
    let chopped = arr.chop(limit);
    const final = chopped.reduce((a, b) => {
      return a.then((val) => {
        return new Promise((resolve, reject) => {
          const results = [];
          let tasksCompleted = 0;
          b.forEach((ele, idx) => {
            fn(ele, (error, value) => {
              if (error) {
                reject(error);
              } else {
                results[idx] = value;
                tasksCompleted++;
                if (tasksCompleted >= b.length) {
                  resolve([...val, ...results]);
                }
              }
            });
          });
        });
      });
    }, Promise.resolve([]));
    final.then((result) => resolve(result)).catch((e) => reject(e));
  });
};

// --- Tests ---

// Test case 1 — all succeed
let numPromise = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    callback(null, num);
  }, 2000);
});

numPromise
  .then(() => console.log("testcase1: success"))
  .catch(() => console.log("testcase1: fail"));
// first batch:  2, 4, 6
// second batch: 8, 10
// "success:2,4,6,8,10"

// Test case 2 — error on num === 6
let numPromise2 = mapLimit([1, 2, 3, 4, 5], 3, function (num, callback) {
  setTimeout(function () {
    num = num * 2;
    console.log(num);
    if (num === 6) {
      callback(true);
    } else {
      callback(null, num);
    }
  }, 2000);
});

numPromise2
  .then(() => console.log("testcase2: fail"))
  .catch(() => console.log("testcase2: success"));
// first batch: 2, 4, 6
// "no success"
