// Create Custom Promise
// Implement MyPromise class with .then(), .catch(), .finally() and chaining support

const states = {
  PENDING: 0,
  FULFILLED: 1,
  REJECTED: 2,
};

class MyPromise {
  constructor(callback) {
    // TODO
    this.state = states.PENDING;
    this.handlers = [];
    this.value = undefined;

    const resolve = (val) => {
      if (this.state != states.PENDING) return;
      this.state = states.FULFILLED;
      this.value = val;
      this._run_();
    };

    const reject = (err) => {
      if (this.state != states.PENDING) return;
      this.state = states.REJECTED;
      this.value = err;
      this._run_();
    };

    try {
      callback(resolve, reject);
    } catch (e) {
      reject(e);
    }
  }

  _run_() {
    if (this.state == states.PENDING) return;
    for (let { onSuccess, onFail, resolve, reject } of this.handlers) {
      const handler = this.state == states.FULFILLED ? onSuccess : onFail;
      if (typeof handler == "function") {
        try {
          resolve(handler(this.value));
        } catch (e) {
          reject(e);
        }
      } else {
        this.state == states.FULFILLED
          ? resolve(this.value)
          : reject(this.value);
      }
    }
    this.handlers = [];
  }

  then(onSuccess, onFail) {
    // TODO
    return new MyPromise((resolve, reject) => {
      this.handlers.push({ onSuccess, onFail, resolve, reject });
      this._run_();
    });
  }

  catch(onFail) {
    // TODO
    return this.then(undefined, onFail);
  }

  finally(onFinally) {
    // TODO
    return this.then(
      (val) => {
        onFinally();
        return val;
      },
      (error) => {
        onFinally();
        throw error;
      },
    );
  }
}

// --- Tests ---

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const allTests = [];

// TC1 — resolve reaches .then handler
allTests.push(
  new Promise((resolve) => {
    new MyPromise((res) => setTimeout(() => res("hello"), 50)).then((val) => {
      test("TC1: resolve reaches .then", val, "hello");
      resolve();
    });
  }),
);

// TC2 — reject reaches .catch handler
allTests.push(
  new Promise((resolve) => {
    new MyPromise((_, rej) => setTimeout(() => rej("error"), 50)).catch(
      (err) => {
        test("TC2: reject reaches .catch", err, "error");
        resolve();
      },
    );
  }),
);

// TC3 — .finally runs after resolve
allTests.push(
  new Promise((resolve) => {
    const log = [];
    new MyPromise((res) => setTimeout(() => res("ok"), 50))
      .then((val) => {
        log.push("then:" + val);
      })
      .finally(() => {
        log.push("finally");
        resolve();
      })
      .then(() =>
        test("TC3: finally runs after resolve", log, ["then:ok", "finally"]),
      );
  }),
);

// TC4 — .finally runs after reject
allTests.push(
  new Promise((resolve) => {
    const log = [];
    new MyPromise((_, rej) => setTimeout(() => rej("fail"), 50))
      .catch((err) => {
        log.push("catch:" + err);
      })
      .finally(() => {
        log.push("finally");
        resolve();
      })
      .then(() =>
        test("TC4: finally runs after reject", log, ["catch:fail", "finally"]),
      );
  }),
);

// TC5 — chained .then passes return value to next
allTests.push(
  new Promise((resolve) => {
    new MyPromise((res) => setTimeout(() => res("hello"), 50))
      .then((val) => val + " world")
      .then((val) => {
        test("TC5: chained .then value", val, "hello world");
        resolve();
      });
  }),
);

// TC6 — synchronous resolve works
allTests.push(
  new Promise((resolve) => {
    new MyPromise((res) => res(42)).then((val) => {
      test("TC6: sync resolve", val, 42);
      resolve();
    });
  }),
);

// TC7 — throw inside constructor rejects the promise
allTests.push(
  new Promise((resolve) => {
    new MyPromise(() => {
      throw new Error("boom");
    }).catch((err) => {
      test("TC7: constructor throw rejects", err.message, "boom");
      resolve();
    });
  }),
);

// TC8 — resolve ignored after reject (settled state is immutable)
allTests.push(
  new Promise((resolve) => {
    const log = [];
    new MyPromise((res, rej) => {
      rej("first");
      res("second");
    })
      .catch((err) => log.push(err))
      .finally(() => {
        test("TC8: state is immutable after settle", log, ["first"]);
        resolve();
      });
  }),
);

Promise.all(allTests).then(() => console.log("\nAll tests done"));
