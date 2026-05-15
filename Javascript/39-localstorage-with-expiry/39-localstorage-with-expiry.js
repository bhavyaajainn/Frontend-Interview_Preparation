// Localstorage with Expiry
// Extend localStorage with setItem(key, value, maxAge) and getItem(key) that
// respects expiry. Returns null if the key doesn't exist or has expired.

// Node.js shim — replace with window.localStorage in the browser
const localStorage = (() => {
  const store = {};
  return {
    setItem: (k, v) => { store[k] = v; },
    getItem: (k) => store[k] ?? null,
    removeItem: (k) => { delete store[k]; },
  };
})();

const myLocalStorage = {
  setItem(key, value, maxAge = 30 * 24 * 60 * 60 * 1000) {
    // TODO
  },

  getItem(key) {
    // TODO
  },
};

// --- Tests ---

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const allTests = [];

// TC1 — value readable immediately after set
allTests.push(new Promise(resolve => {
  myLocalStorage.setItem('tc1', 'hello', 2000);
  test('TC1: value readable immediately after set', myLocalStorage.getItem('tc1'), 'hello');
  resolve();
}));

// TC2 — value returns null after maxAge expires
allTests.push(new Promise(resolve => {
  myLocalStorage.setItem('tc2', 'bye', 200);
  setTimeout(() => {
    test('TC2: returns null after expiry', myLocalStorage.getItem('tc2'), null);
    resolve();
  }, 300);
}));

// TC3 — key that was never set returns null
allTests.push(new Promise(resolve => {
  test('TC3: non-existent key returns null', myLocalStorage.getItem('__missing__'), null);
  resolve();
}));

// TC4 — default maxAge: item still available long after set (30-day default)
allTests.push(new Promise(resolve => {
  myLocalStorage.setItem('tc4', 'persistent');
  setTimeout(() => {
    test('TC4: default maxAge keeps item alive', myLocalStorage.getItem('tc4'), 'persistent');
    resolve();
  }, 100);
}));

// TC5 — overwriting a key with a new value and shorter expiry
allTests.push(new Promise(resolve => {
  myLocalStorage.setItem('tc5', 'original', 2000);
  myLocalStorage.setItem('tc5', 'updated', 200);
  setTimeout(() => {
    test('TC5: overwritten key expires with new maxAge', myLocalStorage.getItem('tc5'), null);
    resolve();
  }, 300);
}));

// TC6 — expired entry is removed from underlying storage (no stale data)
allTests.push(new Promise(resolve => {
  myLocalStorage.setItem('tc6', 'cleanup', 200);
  setTimeout(() => {
    myLocalStorage.getItem('tc6'); // triggers cleanup
    const raw = localStorage.getItem('tc6');
    test('TC6: expired entry removed from underlying storage', raw, null);
    resolve();
  }, 300);
}));

// TC7 — value can be an object (stored/retrieved via JSON)
allTests.push(new Promise(resolve => {
  myLocalStorage.setItem('tc7', { name: 'Alice', age: 30 }, 2000);
  test('TC7: object value stored and retrieved correctly',
    myLocalStorage.getItem('tc7'),
    { name: 'Alice', age: 30 }
  );
  resolve();
}));

Promise.all(allTests).then(() => console.log('\nAll tests done'));
