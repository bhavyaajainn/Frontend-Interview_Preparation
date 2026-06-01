// Cached API Call with Expiry Time
//
// cachedApiCall(time) — returns an async function call(path, config)
//   - First call to a path: makes a real API call, caches { value, expiryTime }
//   - Subsequent calls within `time` ms: returns cached value (no network request)
//   - After `time` ms: cache expires, a fresh API call is made
//
// Bonus: deduplicate concurrent in-flight requests (same key hit while first is pending)

// helper — builds a deterministic cache key from path + config
const generateKey = (path, config) => {
  // TODO: sort config keys alphabetically, join as "key:value&...", prepend path
  const sortedConfig = Object.keys(config)
    .sort()
    .reduce((acc, key) => {
      acc[key] = config[key];
      return acc;
    }, {});
  let parameters = "";
  for (let [key, value] of Object.entries(sortedConfig)) {
    parameters += `&${key}:${value.toString()}`;
  }
  return path + parameters;
};

// helper — makes the actual fetch call
const makeApiCall = async (path, config) => {
  // TODO: fetch(path, config), parse JSON, return result; return null on error
  try {
    let response = await fetch(path, config);
    response = await response.json();
    return response;
  } catch (e) {
    console.log("error " + e);
  }

  return null;
};

const cachedApiCall = (time) => {
  // TODO: create a cache object (plain {})
  // TODO: return async function(path, config = {}):
  //         - generate key
  //         - if no entry or entry expired: make new API call, store { value, expiryTime: Date.now() + time }
  //         - else: return cached value
  //
  // Bonus: if an in-flight promise already exists for this key, reuse it
  //        (prevents duplicate concurrent requests for the same resource)

  const cache = {};
  return async (path, config = {}) => {
    const key = generateKey(path, config);
    let entry = cache[key];
    if (!entry || Date.now() > entry.expiryTime) {
      try {
        const value = await makeApiCall(path, config);
        cache[key] = { value, expiryTime: Date.now() + time };
      } catch (e) {
        console.log(error);
      }
    }
    return cache[key].value;
  };
};

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const delay = (ms) => new Promise((r) => setTimeout(r, ms));

// Mock fetch so tests don't need network access
let fetchCallCount = 0;
const mockData = { id: 1, title: "test" };

globalThis.fetch = async (url, config) => {
  fetchCallCount++;
  await delay(10); // simulate latency
  return { json: async () => ({ ...mockData, url }) };
};

(async () => {
  // --- generateKey ---
  test(
    "KEY TC1: same path + empty config produces same key",
    generateKey("/api/todos", {}),
    generateKey("/api/todos", {}),
  );
  test(
    "KEY TC2: different paths produce different keys",
    generateKey("/api/todos", {}) !== generateKey("/api/users", {}),
    true,
  );
  test(
    "KEY TC3: key is order-insensitive for config keys",
    generateKey("/api", { b: "2", a: "1" }),
    generateKey("/api", { a: "1", b: "2" }),
  );
  test(
    "KEY TC4: different config values produce different keys",
    generateKey("/api", { id: "1" }) !== generateKey("/api", { id: "2" }),
    true,
  );

  // --- cachedApiCall: cache hit / miss ---

  fetchCallCount = 0;
  const call = cachedApiCall(300);

  // first call — should hit network
  const r1 = await call("/todos/1", {});
  test(
    "CACHE TC1: first call returns data",
    r1 !== null && r1 !== undefined,
    true,
  );
  test(
    "CACHE TC2: first call hits network (fetchCount = 1)",
    fetchCallCount,
    1,
  );

  // second call within TTL — should be served from cache
  const r2 = await call("/todos/1", {});
  test(
    "CACHE TC3: second call returns same data",
    JSON.stringify(r1),
    JSON.stringify(r2),
  );
  test(
    "CACHE TC4: second call does NOT hit network (fetchCount still 1)",
    fetchCallCount,
    1,
  );

  // different path — should hit network again
  await call("/todos/2", {});
  test(
    "CACHE TC5: different path hits network (fetchCount = 2)",
    fetchCallCount,
    2,
  );

  // wait for TTL to expire, then call again — should hit network
  await delay(350);
  await call("/todos/1", {});
  test(
    "CACHE TC6: call after TTL hits network again (fetchCount = 3)",
    fetchCallCount,
    3,
  );

  // --- TTL boundary: call just before expiry stays cached ---
  fetchCallCount = 0;
  const call2 = cachedApiCall(200);
  await call2("/todos/3", {});
  await delay(150); // within TTL
  await call2("/todos/3", {});
  test("CACHE TC7: call within TTL does not re-fetch", fetchCallCount, 1);

  // --- Concurrent dedup (bonus) ---
  fetchCallCount = 0;
  const call3 = cachedApiCall(500);

  // fire two calls simultaneously before first resolves
  const [c1, c2] = await Promise.all([
    call3("/todos/4", {}),
    call3("/todos/4", {}),
  ]);
  test(
    "DEDUP TC1: concurrent calls return same data",
    JSON.stringify(c1),
    JSON.stringify(c2),
  );
  test(
    "DEDUP TC2: concurrent calls result in at most 2 network requests",
    fetchCallCount <= 2,
    true,
  );

  console.log("\nAll tests done");
})();
