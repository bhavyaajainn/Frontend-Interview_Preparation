// Create Custom Cookie
// Extend the document object with a myCookie property that supports max-age.
// document.myCookie = "key=value"            → no expiry
// document.myCookie = "key=value;max-age=N"  → expires after N seconds

// Node.js shim — replace with the real document object in a browser
const document = {};

function useCustomCookie() {
  // TODO: define document.myCookie using Object.defineProperty
  // get  → return all non-expired cookies as "k1=v1; k2=v2"
  // set  → parse "key=value;max-age=N" and store; schedule deletion after N seconds
  const store = {};
  const timers = {};
  Object.defineProperty(document, "myCookie", {
    configurable: true,
    get() {
      return Object.entries(store)
        .map(([k, v]) => `${k}=${v}`)
        .join(";");
    },
    set(cookieString) {
      const parts = cookieString.split(";");
      const [key, value] = parts[0].split("=");
      if (timers[key]) {
        clearTimeout(timers[key]);
        delete timers[key];
      }
      let maxAge = null;
      for (let i = 1; i < parts.length; i++) {
        const trimmed = parts[i].trim();
        if (trimmed.startsWith("max-age")) {
          maxAge = parseInt(trimmed.split("=")[1], 10);
          break;
        }
      }
      if (maxAge == 0) {
        delete store[key];
      } else if (maxAge !== null) {
        store[key] = value;
        timers[key] = setTimeout(() => {
          delete store[key];
          delete timers[key];
        }, maxAge * 1000);
      } else {
        store[key] = value;
      }
    },
  });
}

// --- Tests ---

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: "${expected}"`);
    console.log(`  Got:      "${actual}"`);
  }
}

const allTests = [];

// TC1 — single cookie with no expiry
allTests.push(
  new Promise((resolve) => {
    useCustomCookie();
    document.myCookie = "blog=learnersbucket";
    test("TC1: single cookie stored", document.myCookie, "blog=learnersbucket");
    resolve();
  }),
);

// TC2 — two cookies, both visible before expiry
allTests.push(
  new Promise((resolve) => {
    useCustomCookie();
    document.myCookie = "blog=learnersbucket";
    document.myCookie = "name=prashant;max-age=2";
    const result = document.myCookie;
    const hasAll =
      result.includes("blog=learnersbucket") &&
      result.includes("name=prashant");
    console.log(
      `${hasAll ? "PASS" : "FAIL"}: TC2: both cookies visible before expiry`,
    );
    resolve();
  }),
);

// TC3 — cookie with max-age expires after N seconds
allTests.push(
  new Promise((resolve) => {
    useCustomCookie();
    document.myCookie = "blog=learnersbucket";
    document.myCookie = "temp=gone;max-age=1";
    setTimeout(() => {
      const result = document.myCookie;
      const expired = !result.includes("temp=gone");
      const persisted = result.includes("blog=learnersbucket");
      console.log(
        `${expired && persisted ? "PASS" : "FAIL"}: TC3: expired cookie removed, non-expiring persists`,
      );
      resolve();
    }, 1500);
  }),
);

// TC4 — cookie without max-age survives after another cookie expires
allTests.push(
  new Promise((resolve) => {
    useCustomCookie();
    document.myCookie = "a=1";
    document.myCookie = "b=2;max-age=1";
    document.myCookie = "c=3";
    setTimeout(() => {
      const result = document.myCookie;
      const ok =
        result.includes("a=1") &&
        result.includes("c=3") &&
        !result.includes("b=2");
      console.log(
        `${ok ? "PASS" : "FAIL"}: TC4: only b=2 expired, a and c survive`,
      );
      resolve();
    }, 1500);
  }),
);

// TC5 — overwrite a cookie key with a new value
allTests.push(
  new Promise((resolve) => {
    useCustomCookie();
    document.myCookie = "user=alice";
    document.myCookie = "user=bob";
    test("TC5: overwrite same key", document.myCookie, "user=bob");
    resolve();
  }),
);

// TC6 — setting max-age=0 expires the cookie immediately
allTests.push(
  new Promise((resolve) => {
    useCustomCookie();
    document.myCookie = "flash=gone;max-age=0";
    setTimeout(() => {
      test("TC6: max-age=0 expires immediately", document.myCookie, "");
      resolve();
    }, 50);
  }),
);

Promise.all(allTests).then(() => console.log("\nAll tests done"));
