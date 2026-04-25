// How to use array sort in JavaScript

function sortNumbersAsc(arr) {
  arr.sort((a, b) => a - b);
  return arr;
}

function sortNumbersDesc(arr) {
  arr.sort((a, b) => b - a);
  return arr;
}

function sortStringsAsc(arr) {
  arr.sort((a, b) => {
    if (a < b) {
      return -1;
    } else if (b < a) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
}

function sortStringsDesc(arr) {
  arr.sort((a, b) => {
    if (a < b) {
      return 1;
    } else if (b < a) {
      return -1;
    } else {
      return 0;
    }
  });
  return arr;
}

function sortNonAscii(arr) {
  arr.sort((a, b) => {
    return a.localeCompare(b);
  });
  return arr;
}

function sortObjectsByAge(arr) {
  // Sort objects: age ascending, then name descending on tie
  // Write your solution here
  arr.sort((a, b) => {
    if (a.age > b.age) {
      return 1;
    } else if (a.age < b.age) {
      return -1;
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  return arr;
}

// Sample test cases
function testArraySort() {
  // Numbers ascending
  let r1 = sortNumbersAsc([1, 3, 5, 2, 9, 11, 8, 4]);
  let e1 = [1, 2, 3, 4, 5, 8, 9, 11];
  console.log(
    `sortNumbersAsc: ${JSON.stringify(r1) === JSON.stringify(e1) ? "Success" : "Fail"} (got [${r1}], expected [${e1}])`,
  );

  // Numbers descending
  let r2 = sortNumbersDesc([1, 3, 5, 2, 9, 11, 8, 4]);
  let e2 = [11, 9, 8, 5, 4, 3, 2, 1];
  console.log(
    `sortNumbersDesc: ${JSON.stringify(r2) === JSON.stringify(e2) ? "Success" : "Fail"} (got [${r2}], expected [${e2}])`,
  );

  // Strings ascending
  let r3 = sortStringsAsc(["prashant", "aman", "yogesh", "sachin", "pranav"]);
  let e3 = ["aman", "pranav", "prashant", "sachin", "yogesh"];
  console.log(
    `sortStringsAsc: ${JSON.stringify(r3) === JSON.stringify(e3) ? "Success" : "Fail"}`,
  );

  // Strings descending
  let r4 = sortStringsDesc(["prashant", "aman", "yogesh", "sachin", "pranav"]);
  let e4 = ["yogesh", "sachin", "prashant", "pranav", "aman"];
  console.log(
    `sortStringsDesc: ${JSON.stringify(r4) === JSON.stringify(e4) ? "Success" : "Fail"}`,
  );

  // Non-ASCII strings
  let r5 = sortNonAscii([
    "réservé",
    "premier",
    "cliché",
    "communiqué",
    "café",
    "adieu",
  ]);
  let e5 = ["adieu", "café", "cliché", "communiqué", "premier", "réservé"];
  console.log(
    `sortNonAscii: ${JSON.stringify(r5) === JSON.stringify(e5) ? "Success" : "Fail"}`,
  );

  // Objects multi-key sort
  let r6 = sortObjectsByAge([
    { name: "prashant", age: 23 },
    { name: "aman", age: 24 },
    { name: "yogesh", age: 24 },
    { name: "sachin", age: 25 },
    { name: "pranav", age: 22 },
  ]);
  let e6 = [
    { name: "pranav", age: 22 },
    { name: "prashant", age: 23 },
    { name: "yogesh", age: 24 },
    { name: "aman", age: 24 },
    { name: "sachin", age: 25 },
  ];
  console.log(
    `sortObjectsByAge: ${JSON.stringify(r6) === JSON.stringify(e6) ? "Success" : "Fail"}`,
  );

  // Edge: without compareFunction (default sorts as strings — common bug)
  let buggySort = [10, 9, 2].sort();
  console.log(
    `default sort bug demo: [10, 9, 2].sort() → [${buggySort}] (expected [10, 2, 9] — sorts as strings)`,
  );
}
testArraySort();

module.exports = {
  sortNumbersAsc,
  sortNumbersDesc,
  sortStringsAsc,
  sortStringsDesc,
  sortNonAscii,
  sortObjectsByAge,
};
