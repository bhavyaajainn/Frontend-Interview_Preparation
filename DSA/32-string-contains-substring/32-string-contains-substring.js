// Check if string contains a substring

// Using indexOf
function hasSubStringIndexOf(str, sub) {
  return str.indexOf(sub) !== -1;
}

// Using includes
function hasSubStringIncludes(str, sub) {
  return str.includes(sub);
}

// Using Regular Expression (case-insensitive)
function hasSubStringRegex(str, sub) {
  let re = new RegExp(sub, "gi");
  return (str.match(re) || []).length !== 0;
}

// Sample test cases
function testHasSubString() {
  let tests = [
    {
      str: "I am Prashant Yadav",
      sub: "Prashant",
      expectedCS: true,
      expectedCI: true,
    },
    {
      str: "I am Prashant Yadav",
      sub: "prashant",
      expectedCS: false,
      expectedCI: true,
    },
    {
      str: "I am Prashant Yadav",
      sub: "Search",
      expectedCS: false,
      expectedCI: false,
    },
    {
      str: "I am Prashant Yadav",
      sub: "Yadav",
      expectedCS: true,
      expectedCI: true,
    },
    {
      str: "I am Prashant Yadav",
      sub: "substring",
      expectedCS: false,
      expectedCI: false,
    },
    {
      str: "I am Prashant Yadav",
      sub: "dav",
      expectedCS: true,
      expectedCI: true,
    },
  ];

  for (let { str, sub, expectedCS, expectedCI } of tests) {
    let r1 = hasSubStringIndexOf(str, sub);
    console.log(
      `indexOf:  str="${str}", sub="${sub}": ${r1 === expectedCS ? "Success" : "Fail"} (got ${r1}, expected ${expectedCS})`,
    );

    let r2 = hasSubStringIncludes(str, sub);
    console.log(
      `includes: str="${str}", sub="${sub}": ${r2 === expectedCS ? "Success" : "Fail"} (got ${r2}, expected ${expectedCS})`,
    );

    let r3 = hasSubStringRegex(str, sub);
    console.log(
      `regex:    str="${str}", sub="${sub}": ${r3 === expectedCI ? "Success" : "Fail"} (got ${r3}, expected ${expectedCI})`,
    );
  }
}
testHasSubString();

module.exports = {
  hasSubStringIndexOf,
  hasSubStringIncludes,
  hasSubStringRegex,
};
