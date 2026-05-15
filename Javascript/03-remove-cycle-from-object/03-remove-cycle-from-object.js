// Remove Cycle from the Object
// Break circular references in-place using a WeakSet

function removeCycle(obj) {
  // TODO
  const visited = new WeakSet();
  visited.add(obj);
  function dfs(current) {
    for (let key in current) {
      if (!Object.prototype.hasOwnProperty.call(current, key)) {
        continue;
      }
      const value = current[key];
      if (value != null && typeof value === "object") {
        if (visited.has(value)) {
          delete current[key];
        } else {
          visited.add(value);
          dfs(value);
        }
      }
    }
  }
  dfs(obj);
}

// Replacer factory for JSON.stringify to handle circular references
function getCircularReplacer() {
  // TODO
  const seen = new WeakSet();
  return function (key, value) {
    if (value != null && typeof value == "object") {
      if (seen.has(value)) {
        return undefined;
      }
      seen.add(value);
    }
    return value;
  };
}

// --- Tests ---

function testRemoveCycle() {
  const List = function (val) {
    this.next = null;
    this.val = val;
  };

  // Test 1: simple 3-node cycle (item3 → item1)
  const item1 = new List(10);
  const item2 = new List(20);
  const item3 = new List(30);
  item1.next = item2;
  item2.next = item3;
  item3.next = item1;

  removeCycle(item1);
  const hasCycle1 = item3.next !== undefined && item3.next !== null;
  console.log(
    `[removeCycle] simple cycle removed: ${!hasCycle1 ? "Success" : "Fail"}`,
  );
  console.log(
    `[removeCycle] structure intact: ${item1.val === 10 && item2.val === 20 && item3.val === 30 ? "Success" : "Fail"}`,
  );

  // Test 2: no cycle — should leave the object untouched
  const a = new List(1);
  const b = new List(2);
  a.next = b;

  removeCycle(a);
  console.log(
    `[removeCycle] no-cycle object unchanged: ${a.next === b && b.next === null ? "Success" : "Fail"}`,
  );

  // Test 3: getCircularReplacer — circular object should serialise without error
  const c = new List(100);
  const d = new List(200);
  c.next = d;
  d.next = c; // cycle

  let json;
  try {
    json = JSON.stringify(c, getCircularReplacer());
  } catch (e) {
    json = null;
  }
  console.log(
    `[getCircularReplacer] serialises without throwing: ${json !== null ? "Success" : "Fail"}`,
  );
  console.log(
    `[getCircularReplacer] back-reference omitted: ${!json.includes('"next":{') || json.indexOf('"next"') === json.lastIndexOf('"next"') ? "Success" : "Fail"}`,
  );
}

testRemoveCycle();
