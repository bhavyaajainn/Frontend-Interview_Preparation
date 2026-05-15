// Publisher-Subscriber - 3 (Observable)
// Observer pattern with subscribe, notify, unsubscribe, clear

function Observable() {
  this.observers = [];

  this.subscribe = function (callback) {
    if (typeof callback !== "function") throw new TypeError("callback must be a function");
    const observer = { callback: callback };
    this.observers.push(observer);
    return {
      unsubscribe: () => {
        const index = this.observers.indexOf(observer);
        if (index > -1) {
          this.observers.splice(index, 1);
        }
      },
    };
  };

  this.notify = function (...data) {
    // TODO
    this.observers.forEach((e) => {
      e.callback(...data);
    });
  };

  this.getObserverCount = function () {
    // TODO
    return this.observers.length;
  };

  this.clear = function () {
    this.observers = [];
  };
}

// --- Tests ---

function testObservable() {
  // Test 1: single subscriber receives notification
  const o1 = new Observable();
  const log1 = [];
  o1.subscribe((d) => log1.push(d));
  o1.notify("hello");
  console.log(
    `[Observable] single subscriber: ${log1[0] === "hello" ? "Success" : "Fail"}`,
  );

  // Test 2: unsubscribe stops future notifications
  const o2 = new Observable();
  const log2 = [];
  const sub = o2.subscribe((d) => log2.push(d));
  o2.notify("before");
  sub.unsubscribe();
  o2.notify("after");
  console.log(
    `[Observable] unsubscribe works: ${JSON.stringify(log2) === '["before"]' ? "Success" : "Fail"}`,
  );

  // Test 3: multiple subscribers all notified
  const o3 = new Observable();
  const log3 = [];
  o3.subscribe((d) => log3.push("a:" + d));
  o3.subscribe((d) => log3.push("b:" + d));
  o3.notify("x");
  console.log(
    `[Observable] multiple subscribers: ${log3.includes("a:x") && log3.includes("b:x") ? "Success" : "Fail"}`,
  );

  // Test 4: getObserverCount reflects active subscribers
  const o4 = new Observable();
  const s1 = o4.subscribe(() => {});
  const s2 = o4.subscribe(() => {});
  o4.subscribe(() => {});
  s1.unsubscribe();
  console.log(
    `[Observable] getObserverCount: ${o4.getObserverCount() === 2 ? "Success" : "Fail"}`,
  );

  // Test 5: clear removes all subscribers
  const o5 = new Observable();
  const log5 = [];
  o5.subscribe((d) => log5.push(d));
  o5.subscribe((d) => log5.push(d));
  o5.clear();
  o5.notify("gone");
  console.log(
    `[Observable] clear removes all: ${log5.length === 0 ? "Success" : "Fail"}`,
  );

  // Test 6: subscribe throws on non-function argument
  const o6 = new Observable();
  let threw = false;
  try {
    o6.subscribe("not-a-function");
  } catch (e) {
    threw = true;
  }
  console.log(
    `[Observable] throws on non-function: ${threw ? "Success" : "Fail"}`,
  );

  // Test 7: notify passes multiple arguments
  const o7 = new Observable();
  let received = [];
  o7.subscribe((...args) => (received = args));
  o7.notify("a", "b", "c");
  console.log(
    `[Observable] variadic notify: ${JSON.stringify(received) === '["a","b","c"]' ? "Success" : "Fail"}`,
  );
}

testObservable();
