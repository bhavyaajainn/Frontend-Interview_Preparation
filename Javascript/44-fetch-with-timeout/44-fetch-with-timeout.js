// Fetch with Timeout
// fetchWithTimeout(url, duration) — aborts the fetch if not resolved within `duration` ms

const fetchWithTimeout = (url, duration) => {
  // TODO: use AbortController + setTimeout to abort if duration exceeded
};

// --- Test helpers ---

function testAsync(name, promise, expectResolve, checkValue) {
  return promise
    .then((val) => {
      if (!expectResolve) {
        console.log(`FAIL: ${name} — expected rejection but resolved with ${JSON.stringify(val)}`);
      } else {
        const ok = checkValue ? checkValue(val) : true;
        console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
        if (!ok) console.log(`  Got: ${JSON.stringify(val)}`);
      }
    })
    .catch((err) => {
      if (expectResolve) {
        console.log(`FAIL: ${name} — expected resolve but rejected: ${err}`);
      } else {
        const ok = checkValue ? checkValue(err) : true;
        console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
        if (!ok) console.log(`  Got: ${err}`);
      }
    });
}

// Mock fetch: resolves after `delay` ms with `data`, respects abort signal
function mockFetch(data, delay) {
  return (url, { signal } = {}) =>
    new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        resolve({
          json: () => Promise.resolve(data),
          ok: true,
        });
      }, delay);

      signal?.addEventListener('abort', () => {
        clearTimeout(timer);
        reject(new DOMException('The user aborted a request.', 'AbortError'));
      });
    });
}

// --- Tests ---

const allTests = [];
const origFetch = globalThis.fetch;

// TC1 — resolves when fetch finishes before timeout
globalThis.fetch = mockFetch({ id: 1 }, 50);
allTests.push(testAsync(
  'TC1: resolves when fetch is faster than timeout',
  fetchWithTimeout('http://test', 200),
  true,
  (val) => val?.id === 1
));

// TC2 — rejects when fetch is slower than timeout
globalThis.fetch = mockFetch({ id: 1 }, 300);
allTests.push(testAsync(
  'TC2: rejects when timeout expires before fetch',
  fetchWithTimeout('http://test', 100),
  false,
  (err) => err.name === 'AbortError'
));

// TC3 — AbortError name is correct on timeout
globalThis.fetch = mockFetch({}, 500);
allTests.push(testAsync(
  'TC3: rejection is AbortError',
  fetchWithTimeout('http://test', 50),
  false,
  (err) => err.name === 'AbortError'
));

// TC4 — timeout of exactly 0 always aborts
globalThis.fetch = mockFetch({ ok: true }, 100);
allTests.push(testAsync(
  'TC4: duration=0 always aborts',
  fetchWithTimeout('http://test', 0),
  false
));

// TC5 — very long timeout, fetch resolves with correct data
globalThis.fetch = mockFetch({ title: 'hello' }, 30);
allTests.push(testAsync(
  'TC5: correct data returned on fast fetch',
  fetchWithTimeout('http://test', 5000),
  true,
  (val) => val?.title === 'hello'
));

Promise.all(allTests).then(() => {
  globalThis.fetch = origFetch;
  console.log('\nAll tests done');
});
