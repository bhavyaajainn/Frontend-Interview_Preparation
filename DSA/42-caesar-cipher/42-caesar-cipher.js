// Caesar Cipher

// Approach 1: fixed key=13 using a decoded lookup object
function caesarCipherFixed(str) {
  let decoded = {
    a: "n",
    b: "o",
    c: "p",
    d: "q",
    e: "r",
    f: "s",
    g: "t",
    h: "u",
    i: "v",
    j: "w",
    k: "x",
    l: "y",
    m: "z",
    n: "a",
    o: "b",
    p: "c",
    q: "d",
    r: "e",
    s: "f",
    t: "g",
    u: "h",
    v: "i",
    w: "j",
    x: "k",
    y: "l",
    z: "m",
  };

  str = str.toLowerCase();
  let ans = "";
  for (let i = 0; i < str.length; i++) {
    ans += decoded[str[i]];
  }
  return ans;
}

// Approach 2: dynamic key using regex + String.fromCharCode (uppercase only)
function caesarCipherRegex(str, key) {
  return str
    .toUpperCase()
    .replace(/[A-Z]/g, (c) =>
      String.fromCharCode(((c.charCodeAt(0) - 65 + key) % 26) + 65),
    );
}

function isUpperCase(str) {
  return str === str.toUpperCase();
}

function caesarCipher(str, key) {
  let ans = "";
  for (let i = 0; i < str.length; i++) {
    if (isUpperCase(str[i])) {
      ans += String.fromCharCode(((str.charCodeAt(i) + key - 65) % 26) + 65);
    } else {
      ans += String.fromCharCode(((str.charCodeAt(i) + key - 97) % 26) + 97);
    }
  }
  return ans;
}

// Sample test cases
function testCaesarCipher() {
  let testsFixed = [
    { str: "attackatonce", expected: "nggnpxngbapr" },
    { str: "prashantyadav", expected: "cenfunaglnqni" },
  ];

  let testsDynamic = [
    { str: "ATTACKATONCE", key: 13, expected: "NGGNPXNGBAPR" },
    { str: "ABCD", key: 13, expected: "NOPQ" },
    { str: "Hello", key: 3, expected: "Khoor" },
    { str: "prashantyadav", key: 13, expected: "cenfunaglnqni" },
    { str: "xyz", key: 3, expected: "abc" },
  ];

  for (let { str, expected } of testsFixed) {
    let result = caesarCipherFixed(str);
    console.log(
      `fixed:  str="${str}": ${result === expected ? "Success" : "Fail"} (got "${result}", expected "${expected}")`,
    );
  }

  for (let { str, key, expected } of testsDynamic) {
    let r2 = caesarCipherRegex(str.toUpperCase(), key);
    console.log(
      `regex:  str="${str}", key=${key}: ${r2 === expected.toUpperCase() ? "Success" : "Fail"} (got "${r2}", expected "${expected.toUpperCase()}")`,
    );

    let r3 = caesarCipher(str, key);
    console.log(
      `cipher: str="${str}", key=${key}: ${r3 === expected ? "Success" : "Fail"} (got "${r3}", expected "${expected}")`,
    );
  }
}
testCaesarCipher();

module.exports = { caesarCipherFixed, caesarCipherRegex, caesarCipher };
