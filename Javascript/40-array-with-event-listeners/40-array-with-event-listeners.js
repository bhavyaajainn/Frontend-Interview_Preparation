// Array with Event Listeners
// Extend Array.prototype with:
//   addListener(eventName, callback)
//   removeListener(eventName, callback)
//   pushWithEvent(eventName, itemsArray)
//   popWithEvent(eventName)
//   triggerEvent(eventName, args)

// Callback signature: (eventName, items, array)

// TODO: implement the 5 methods on Array.prototype
Array.prototype.listeners = [];

Array.prototype.addListener = function (eventName, callback) {
  if (!this.listeners[eventName]) {
    this.listeners[eventName] = [];
  }
  this.listeners[eventName].push(callback);
};

Array.prototype.removeListener = function (eventName, callback) {
  if (this.listeners[eventName]) {
    this.listeners[eventName] = this.listeners[eventName].filter(
      (ele) => ele != callback,
    );
  }
};

Array.prototype.pushWithEvent = function (eventName, itemsArray) {
  this.push(...itemsArray);
  this.triggerEvent(eventName, itemsArray);
};

Array.prototype.popWithEvent = function (eventName) {
  const element = this.pop();
  this.triggerEvent(eventName, element);
};

Array.prototype.triggerEvent = function (eventName, args) {
  if (this.listeners[eventName]) {
    this.listeners[eventName].forEach((callback) =>
      callback(eventName, args, this),
    );
  }
};

// --- Tests ---

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

// TC1 — pushWithEvent fires the 'add' listener with the pushed items
{
  const arr = [];
  let received;
  arr.addListener("add", (_, items) => {
    received = items;
  });
  arr.pushWithEvent("add", [1, 2, 3]);
  test(
    "TC1: pushWithEvent triggers add listener with items",
    received,
    [1, 2, 3],
  );
}

// TC2 — items are actually added to the array
{
  const arr = [];
  arr.addListener("add", () => {});
  arr.pushWithEvent("add", [4, 5]);
  test("TC2: pushWithEvent adds items to array", arr, [4, 5]);
}

// TC3 — popWithEvent fires the 'remove' listener with the popped element
{
  const arr = [10, 20, 30];
  let removed;
  arr.addListener("remove", (_, item) => {
    removed = item;
  });
  arr.popWithEvent("remove");
  test("TC3: popWithEvent triggers remove listener with element", removed, 30);
}

// TC4 — popWithEvent removes the last item from the array
{
  const arr = [1, 2, 3];
  arr.addListener("remove", () => {});
  arr.popWithEvent("remove");
  test("TC4: popWithEvent removes last item", arr, [1, 2]);
}

// TC5 — multiple listeners for the same event all fire
{
  const arr = [];
  const log = [];
  arr.addListener("add", () => log.push("first"));
  arr.addListener("add", () => log.push("second"));
  arr.pushWithEvent("add", [1]);
  test("TC5: multiple listeners all fire", log, ["first", "second"]);
}

// TC6 — removeListener stops a specific callback from firing
{
  const arr = [];
  const log = [];
  const cb1 = () => log.push("cb1");
  const cb2 = () => log.push("cb2");
  arr.addListener("add", cb1);
  arr.addListener("add", cb2);
  arr.removeListener("add", cb1);
  arr.pushWithEvent("add", [1]);
  test("TC6: removeListener removes only the specified callback", log, ["cb2"]);
}

// TC7 — listener receives eventName, items, and array reference
{
  const arr = [];
  let capturedEvent, capturedItems, capturedArray;
  arr.addListener("add", (eventName, items, array) => {
    capturedEvent = eventName;
    capturedItems = items;
    capturedArray = array;
  });
  arr.pushWithEvent("add", [7, 8]);
  test("TC7: listener receives eventName", capturedEvent, "add");
  test("TC7: listener receives items", capturedItems, [7, 8]);
  test("TC7: listener receives array reference", capturedArray === arr, true);
}

// TC8 — different events on the same array don't cross-trigger
{
  const arr = [];
  const log = [];
  arr.addListener("add", () => log.push("add"));
  arr.addListener("remove", () => log.push("remove"));
  arr.pushWithEvent("add", [1]);
  test("TC8: push only fires add, not remove", log, ["add"]);
}

console.log("\nAll tests done");
