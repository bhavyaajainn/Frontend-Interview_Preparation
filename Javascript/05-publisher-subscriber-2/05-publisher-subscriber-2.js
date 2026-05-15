// Publisher-Subscriber - 2
// Advanced pub/sub: subscribe, subscribeOnce, subscribeOnceAsync, publish, publishAll

function Events() {
  this.subscriptionList = new Map();
  this.subscribeOnceList = new Map();
  this.subscribeOnceAsyncList = new Map();

  this.subscribe = function (name, callback) {
    // TODO
    if (!this.subscriptionList.has(name)) {
      this.subscriptionList.set(name, [callback]);
    } else {
      let existingCallbacks = this.subscriptionList.get(name);
      this.subscriptionList.set(name, [...existingCallbacks, callback]);
    }

    return {
      remove: () => {
        let existingCallbacks = this.subscriptionList.get(name);
        this.subscriptionList.set(
          name,
          existingCallbacks.filter((fn) => fn !== callback),
        );
      },
    };
  };

  this.subscribeOnce = function (name, callback) {
    // TODO
    if (!this.subscribeOnceList.has(name)) {
      this.subscribeOnceList.set(name, [callback]);
    } else {
      let existingCallbacks = this.subscribeOnceList.get(name);
      this.subscribeOnceList.set(name, [...existingCallbacks, callback]);
    }
  };

  this.subscribeOnceAsync = function (name) {
    // TODO — return a Promise
    return new Promise((resolve, reject) => {
      if (!this.subscribeOnceAsyncList.has(name)) {
        this.subscribeOnceAsyncList.set(name, [resolve]);
      } else {
        let existingCallbacks = this.subscribeOnceAsyncList.get(name);
        this.subscribeOnceAsyncList.set(name, [...existingCallbacks, resolve]);
      }
    });
  };

  this.publish = function (name, data) {
    // TODO
    const callbacks = this.subscriptionList.get(name) || [];
    callbacks.forEach((element) => {
      element(data);
    });

    const subscribeOnceCallback = this.subscribeOnceList.get(name) || [];
    subscribeOnceCallback.forEach((element) => {
      element(data);
    });
    this.subscribeOnceList.set(name, []);

    const subscribeOnceAsyncCallback =
      this.subscribeOnceAsyncList.get(name) || [];
    subscribeOnceAsyncCallback.forEach((element) => {
      element(data);
    });
    this.subscribeOnceAsyncList.set(name, []);
  };

  this.publishAll = function (data) {
    const entries = this.subscriptionList.entries();
    for (let [key, value] of entries) {
      value.forEach((element) => {
        element(data);
      });
    }
  };
}

// --- Tests ---

async function testEvents() {
  // Test 1: subscribe fires on every publish
  const e1 = new Events();
  const log1 = [];
  e1.subscribe("evt", (d) => log1.push(d));
  e1.publish("evt", "a");
  e1.publish("evt", "b");
  console.log(
    `[PubSub2] subscribe fires every time: ${JSON.stringify(log1) === '["a","b"]' ? "Success" : "Fail"}`,
  );

  // Test 2: remove() stops future calls
  const e2 = new Events();
  const log2 = [];
  const sub = e2.subscribe("evt", (d) => log2.push(d));
  e2.publish("evt", "before");
  sub.remove();
  e2.publish("evt", "after");
  console.log(
    `[PubSub2] remove() unsubscribes: ${JSON.stringify(log2) === '["before"]' ? "Success" : "Fail"}`,
  );

  // Test 3: subscribeOnce fires only once
  const e3 = new Events();
  const log3 = [];
  e3.subscribeOnce("evt", (d) => log3.push(d));
  e3.publish("evt", "first");
  e3.publish("evt", "second");
  console.log(
    `[PubSub2] subscribeOnce fires once: ${JSON.stringify(log3) === '["first"]' ? "Success" : "Fail"}`,
  );

  // Test 4: subscribeOnceAsync resolves on first publish
  const e4 = new Events();
  const promise = e4.subscribeOnceAsync("evt");
  e4.publish("evt", "async-value");
  const resolved = await promise;
  console.log(
    `[PubSub2] subscribeOnceAsync resolves: ${resolved === "async-value" ? "Success" : "Fail"}`,
  );

  // Test 5: publishAll fires all regular subscribers across names
  const e5 = new Events();
  const log5 = [];
  e5.subscribe("a", (d) => log5.push("a:" + d));
  e5.subscribe("b", (d) => log5.push("b:" + d));
  e5.publishAll("x");
  console.log(
    `[PubSub2] publishAll fires all regular subs: ${log5.includes("a:x") && log5.includes("b:x") ? "Success" : "Fail"}`,
  );
}

testEvents();
