// Memoised Function for Async Callback Based Tasks
//
// Two implementations:
//
// memoizeCallback(fn, options) — callback-based async memoization
//   fn signature: (arg, signal, callback) — callback(err, result)
//
// memoizeAsync(fn, options) — promise-based async memoization
//   fn signature: (arg, signal) → Promise
//
// options: { ttl, maxSize, key, abort, latestWins }
//
// Features:
//   - TTL: cache expires after `ttl` ms
//   - LRU eviction: when cache reaches `maxSize`, evict least-recently-used
//   - Concurrent dedup: multiple calls with same key share one in-flight task
//   - abort + latestWins: cancel in-flight calls, only latest resolves

// ─── LRU Cache ───────────────────────────────────────────────────────────────

class LRUCache {
  constructor(maxSize = 100) {
    // TODO: store maxSize; this.map = new Map() (preserves insertion order)
    this.maxSize = maxSize;
    this.map = new Map();
  }

  get(key) {
    // TODO: if missing return null
    // TODO: delete and re-insert to move to most-recent position
    // TODO: return value
    if (!this.map.has(key)) {
      return null;
    }
    const value = this.map.get(key);
    this.map.delete(key);
    this.map.set(key, value);
    return value;
  }

  set(key, value) {
    // TODO: if key exists → delete it (re-insert below)
    // TODO: else if map.size >= maxSize → delete map.keys().next().value (LRU = first entry)
    // TODO: map.set(key, value)
    if (this.map.has(key)) {
      this.map.delete(key);
    } else if (this.map.size >= this.maxSize) {
      const oldestKey = this.map.keys().next().value;
      this.map.delete(oldestKey);
    }
    this.map.set(key, value);
  }

  delete(key) {
    /* TODO */
    this.map.delete(key);
  }
  clear() {
    /* TODO */
    this.map.clear();
  }
}

// ─── Callback-based memoization ──────────────────────────────────────────────

function memoizeCallback(fn, options = {}) {
  const {
    ttl = Infinity,
    maxSize = 100,
    key = (...args) => JSON.stringify(args),
    abort = false,
    latestWins = false,
  } = options;

  const cache = new LRUCache(maxSize);
  const inFlight = new Map();

  return function (...args) {
    const callback = args.pop();
    const cacheKey = key(...args);
    const now = Date.now();
    const cached = cache.get(cacheKey);
    if (!latestWins && cached && now < cached.expiry) {
      return queueMicrotask(() => callback(null, cached.value));
    }

    if (latestWins && inFlight.has(cacheKey)) {
      inFlight.get(cacheKey).controller?.abort();
      inFlight.delete(cacheKey);
    }

    if (!latestWins && inFlight.has(cacheKey)) {
      inFlight.get(cacheKey).callbacks.push(callback);
      return;
    }

    const controller = abort ? new AbortController() : null;
    inFlight.set(cacheKey, { controller, callbacks: [callback] });

    fn(...args, controller?.signal, (err, result) => {
      const flight = inFlight.get(cacheKey);
      if (!flight) return;
      inFlight.delete(cacheKey);
      if (!err) cache.set(cacheKey, { value: result, expiry: now + ttl });
      flight.callbacks.forEach((cb) => cb(err, result));
    });
  };
}

// ─── Promise-based memoization ───────────────────────────────────────────────

function memoizeAsync(fn, options = {}) {
  const {
    ttl = Infinity,
    maxSize = 100,
    key = (...args) => JSON.stringify(args),
    abort = false,
    latestWins = false,
  } = options;

  const cache = new LRUCache(maxSize);
  const inFlight = new Map();

  return async function (...args) {
    const cacheKey = key(...args);
    const now = Date.now();
    const cached = cache.get(cacheKey);
    if (!latestWins && cached && now < cached.expiry) {
      return cached.value;
    }

    if (latestWins && inFlight.has(cacheKey)) {
      inFlight.get(cacheKey).controller?.abort();
      inFlight.delete(cacheKey);
    }

    if (!latestWins && inFlight.has(cacheKey)) {
      return inFlight.get(cacheKey).promise;
    }

    const controller = abort ? new AbortController() : null;

    const promise = fn(...args, controller?.signal).then(
      (result) => {
        inFlight.delete(cacheKey);
        cache.set(cacheKey, { value: result, expiry: now + ttl });
        return result;
      },
      (err) => {
        inFlight.delete(cacheKey);
        throw err;
      },
    );

    inFlight.set(cacheKey, { controller, promise });
    return promise;
  };
}

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = actual === expected;
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const tick = (ms) => new Promise((r) => setTimeout(r, ms));

// fake async fn — callback style
function fakeSearchCb(query, signal, cb) {
  const id = setTimeout(() => cb(null, `result:${query}`), 100);
  signal?.addEventListener("abort", () => {
    clearTimeout(id);
    cb(new Error("Aborted"));
  });
}

// fake async fn — promise style
function fakeSearchAsync(query, signal) {
  return new Promise((resolve, reject) => {
    const id = setTimeout(() => resolve(`result:${query}`), 100);
    signal?.addEventListener("abort", () => {
      clearTimeout(id);
      reject(new DOMException("Aborted", "AbortError"));
    });
  });
}

(async () => {
  // ── LRU Cache ────────────────────────────────────────────────────────────

  const lru = new LRUCache(2);
  lru.set("a", 1);
  lru.set("b", 2);
  test("LRU TC1: get existing key", lru.get("a"), 1);
  lru.set("c", 3); // evicts "b" (LRU after "a" was accessed)
  test("LRU TC2: evicts LRU entry on overflow", lru.get("b"), null);
  test("LRU TC3: new entry present", lru.get("c"), 3);

  // ── memoizeCallback — basic caching ──────────────────────────────────────

  let cbCallCount = 0;
  const trackedCb = (q, sig, cb) => {
    cbCallCount++;
    fakeSearchCb(q, sig, cb);
  };
  const memoedCb = memoizeCallback(trackedCb);

  await new Promise((res) =>
    memoedCb("react", (err, val) => {
      test(
        "CB TC1: first call cache miss, correct result",
        val,
        "result:react",
      );
      res();
    }),
  );
  cbCallCount = 0;
  await new Promise((res) =>
    memoedCb("react", (err, val) => {
      test("CB TC2: second call cache hit, fn not called", cbCallCount, 0);
      test("CB TC3: cache hit returns correct value", val, "result:react");
      res();
    }),
  );

  // ── memoizeCallback — concurrent dedup ───────────────────────────────────

  cbCallCount = 0;
  const memoedCb2 = memoizeCallback((q, sig, cb) => {
    cbCallCount++;
    fakeSearchCb(q, sig, cb);
  });
  const results = await Promise.all([
    new Promise((res) => memoedCb2("vue", (err, val) => res(val))),
    new Promise((res) => memoedCb2("vue", (err, val) => res(val))),
  ]);
  test(
    "CB TC4: concurrent calls share one execution (fn called once)",
    cbCallCount,
    1,
  );
  test(
    "CB TC5: both concurrent callers receive result",
    results[0] === results[1],
    true,
  );

  // ── memoizeCallback — TTL expiry ─────────────────────────────────────────

  cbCallCount = 0;
  const memoedTTL = memoizeCallback(
    (q, sig, cb) => {
      cbCallCount++;
      fakeSearchCb(q, sig, cb);
    },
    { ttl: 200 },
  );
  await new Promise((res) => memoedTTL("ts", (err, val) => res(val)));
  cbCallCount = 0;
  await tick(250); // TTL expired
  await new Promise((res) => memoedTTL("ts", (err, val) => res(val)));
  test("CB TC6: after TTL expires, fn is called again", cbCallCount, 1);

  // ── memoizeAsync — basic caching ─────────────────────────────────────────

  let asyncCallCount = 0;
  const trackedAsync = (q, sig) => {
    asyncCallCount++;
    return fakeSearchAsync(q, sig);
  };
  const memoedAsync = memoizeAsync(trackedAsync);

  const r1 = await memoedAsync("react");
  test("ASYNC TC1: first call cache miss, correct result", r1, "result:react");
  asyncCallCount = 0;
  const r2 = await memoedAsync("react");
  test("ASYNC TC2: second call cache hit, fn not called", asyncCallCount, 0);
  test("ASYNC TC3: cache hit returns correct value", r2, "result:react");

  // ── memoizeAsync — concurrent dedup ──────────────────────────────────────

  asyncCallCount = 0;
  const memoedAsync2 = memoizeAsync((q, sig) => {
    asyncCallCount++;
    return fakeSearchAsync(q, sig);
  });
  const [ra, rb] = await Promise.all([
    memoedAsync2("vue"),
    memoedAsync2("vue"),
  ]);
  test("ASYNC TC4: concurrent calls share one execution", asyncCallCount, 1);
  test("ASYNC TC5: both callers receive same result", ra === rb, true);

  // ── memoizeAsync — TTL expiry ─────────────────────────────────────────────

  asyncCallCount = 0;
  const memoedAsyncTTL = memoizeAsync(
    (q, sig) => {
      asyncCallCount++;
      return fakeSearchAsync(q, sig);
    },
    { ttl: 200 },
  );
  await memoedAsyncTTL("ts");
  asyncCallCount = 0;
  await tick(250);
  await memoedAsyncTTL("ts");
  test("ASYNC TC6: after TTL expires, fn called again", asyncCallCount, 1);

  // ── memoizeAsync — LRU eviction ───────────────────────────────────────────

  asyncCallCount = 0;
  const memoedLRU = memoizeAsync(
    (q, sig) => {
      asyncCallCount++;
      return fakeSearchAsync(q, sig);
    },
    { maxSize: 2 },
  );
  await memoedLRU("a"); // entry 1
  await memoedLRU("b"); // entry 2
  await memoedLRU("c"); // entry 3 → evicts "a"
  asyncCallCount = 0;
  await memoedLRU("a"); // should be cache miss
  test(
    "ASYNC TC7: LRU eviction causes cache miss for evicted key",
    asyncCallCount,
    1,
  );

  console.log("\nAll tests done");
})();
