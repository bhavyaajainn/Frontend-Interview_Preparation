// Implement Store Class (HashMap)
// Simple key-value store with set(key, value), get(key), has(key)

class Store {
  // TODO
}

// --- Tests ---

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const store = new Store();
store.set('a', 10);
store.set('b', 20);
store.set('c', 30);

// TC1 — get returns stored value
test('TC1: get returns stored value', store.get('b'), 20);

// TC2 — has returns true for existing key
test('TC2: has returns true for existing key', store.has('c'), true);

// TC3 — get returns undefined for missing key
test('TC3: get returns undefined for missing key', store.get('d'), undefined);

// TC4 — has returns false for missing key
test('TC4: has returns false for missing key', store.has('e'), false);

// TC5 — overwriting a key with a new value
store.set('a', 99);
test('TC5: overwrite updates value', store.get('a'), 99);

// TC6 — falsy value 0 stored and retrieved correctly
const s2 = new Store();
s2.set('zero', 0);
test('TC6: falsy 0 stored correctly', s2.get('zero'), 0);

// TC7 — has returns true for key with falsy value 0
test('TC7: has returns true for key with falsy value', s2.has('zero'), true);

// TC8 — falsy value false stored correctly
const s3 = new Store();
s3.set('flag', false);
test('TC8: falsy false stored correctly', s3.get('flag'), false);
test('TC8b: has returns true for key with false value', s3.has('flag'), true);

// TC9 — falsy empty string stored correctly
const s4 = new Store();
s4.set('empty', '');
test('TC9: falsy empty string stored correctly', s4.get('empty'), '');
test('TC9b: has returns true for empty string value', s4.has('empty'), true);

// TC10 — multiple independent store instances do not share state
const s5 = new Store();
const s6 = new Store();
s5.set('x', 1);
test('TC10: stores are independent', s6.has('x'), false);

console.log('\nAll tests done');
