// Publisher-Subscriber - 1 (Observer Pattern)
// Implement subscribe, unsubscribe, and fire on a host object

const Move = function () {
  // TODO
  this.handlers = [];
};

Move.prototype.subscribe = function (fun) {
  this.handlers.push(fun);
};

Move.prototype.unsubscribe = function (fun) {
  this.handlers = this.handlers.filter((handler) => {
    return handler !== fun;
  });
};

Move.prototype.fire = function (e, thisObj) {
  const scope =
    thisObj || (typeof window !== "undefined" ? window : globalThis);
  this.handlers.forEach((handler) => handler.call(scope, e));
};
// --- Tests ---

function testMove() {
  const move = new Move();

  const results = [];

  const handler1 = (item) => results.push("handler1: " + item);
  const handler2 = (item) => results.push("handler2: " + item);

  // Test 1: single subscriber receives the event
  move.subscribe(handler1);
  move.fire("event #1");
  console.log(
    `[PubSub] single subscriber fires: ${results[0] === "handler1: event #1" ? "Success" : "Fail"}`,
  );

  // Test 2: after unsubscribe, handler is not called
  move.unsubscribe(handler1);
  const beforeLen = results.length;
  move.fire("event #2");
  console.log(
    `[PubSub] unsubscribed handler not called: ${results.length === beforeLen ? "Success" : "Fail"}`,
  );

  // Test 3: multiple subscribers both receive the event
  move.subscribe(handler1);
  move.subscribe(handler2);
  move.fire("event #3");
  console.log(
    `[PubSub] both subscribers fired: ${
      results.includes("handler1: event #3") &&
      results.includes("handler2: event #3")
        ? "Success"
        : "Fail"
    }`,
  );

  // Test 4: unsubscribing a handler that was never added has no effect
  const move2 = new Move();
  const ghost = () => {};
  try {
    move2.unsubscribe(ghost);
    console.log(`[PubSub] unsubscribe unknown handler — no error: Success`);
  } catch (e) {
    console.log(`[PubSub] unsubscribe unknown handler — no error: Fail`);
  }
}

testMove();
