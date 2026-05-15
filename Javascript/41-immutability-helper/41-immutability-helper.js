// Create an Immutability Helper
// update(inputObj, action) — clones input, applies action recursively, returns deep-frozen result
//
// Supported actions (one at a time):
//   _push_      : [...target, ...value]
//   _replace_   : value
//   _merge_     : { ...target, ...value }
//   _transform_ : fn(target)

function deepFreeze(obj) {
  // TODO
}

function update(inputObj, action) {
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

const state = deepFreeze({ a: { b: { c: 1 } }, d: 2 });

// TC1 — _push_: appends items to an array
test(
  'TC1: _push_ appends items',
  update([1, 2, 3, 4], { _push_: [5, 6, 7] }),
  [1, 2, 3, 4, 5, 6, 7]
);

// TC2 — _replace_ on nested object key
test(
  'TC2: _replace_ nested object key',
  update(state, { a: { b: { c: { _replace_: 3 } } } }),
  { a: { b: { c: 3 } }, d: 2 }
);

// TC3 — _replace_ on array by index
test(
  'TC3: _replace_ array element by index',
  update([1, 2, 3, 4], { 1: { _replace_: 10 } }),
  [1, 10, 3, 4]
);

// TC4 — _merge_ adds new keys without touching existing ones
test(
  'TC4: _merge_ adds keys, preserves existing',
  update(state, { a: { b: { _merge_: { e: 5 } } } }),
  { a: { b: { c: 1, e: 5 } }, d: 2 }
);

// TC5 — _transform_ applies a function to the target value
test(
  'TC5: _transform_ applies function',
  update({ a: { b: 2 } }, { a: { b: { _transform_: (x) => x * 2 } } }),
  { a: { b: 4 } }
);

// TC6 — output is deep-frozen (mutations are silently ignored in non-strict mode)
{
  const result = update(state, { a: { b: { c: { _replace_: 99 } } } });
  result.a.b.c = 999; // should be silently ignored (strict: throws)
  test('TC6: output is deep-frozen', result.a.b.c, 99);
}

// TC7 — original frozen object is not modified
{
  update(state, { a: { b: { c: { _replace_: 42 } } } });
  test('TC7: original input is not modified', state.a.b.c, 1);
}

// TC8 — untouched paths are preserved in output
{
  const result = update(state, { a: { b: { c: { _replace_: 5 } } } });
  test('TC8: untouched path d=2 preserved', result.d, 2);
}

// TC9 — _push_ on frozen array
{
  const frozenArr = deepFreeze([1, 2, 3]);
  test(
    'TC9: _push_ works on frozen input array',
    update(frozenArr, { _push_: [4, 5] }),
    [1, 2, 3, 4, 5]
  );
}

console.log('\nAll tests done');
