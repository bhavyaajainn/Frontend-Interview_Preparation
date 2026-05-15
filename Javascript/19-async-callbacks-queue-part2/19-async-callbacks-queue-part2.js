// Process Async Callbacks Queue - Part 2
// Asked in Uber's frontend interview (extended version of Meta's async queue question)
//
// Queue(processorFn, onCompleteFn, concurrency) returns:
//   push(Task | Task[])    — add to end of queue, trigger processing
//   unshift(Task | Task[]) — add to front of queue, trigger processing
//   drain(callbackFn)      — listener fired when all tasks are done
//   error(callbackFn)      — listener fired on any processing error

function Queue(processorFn, onCompleteFn, concurrency) {
  // TODO
  const items = [];
  const functionMap = {};
  let itemsInProcess = 0;

  const onUnshift = (tasks) => {
    const list = Array.isArray(tasks) ? tasks : [tasks];
    items.unshift(...list);
    if (itemsInProcess < concurrency) {
      startProcessing();
    }
  };

  const onPush = (tasks) => {
    const list = Array.isArray(tasks) ? tasks : [tasks];
    items.push(...list);
    if (itemsInProcess < concurrency) {
      startProcessing();
    }
  };

  const onDrain = (fn) => {
    functionMap["drain"] = fn;
  };

  const onError = (fn) => {
    functionMap["error"] = fn;
  };

  const startProcessing = () => {
    if (items.length > 0 && itemsInProcess < concurrency) {
      let tasks = items.splice(0, concurrency);
      for (let task of tasks) {
        itemsInProcess++;
        processorFn(task, (result, error) => {
          if (result) {
            onCompleteFn(result, error, task);
            console.log(result);
          } else {
            const errorFn = functionMap["error"];
            errorFn?.(error, task);
          }
          itemsInProcess--;
          startProcessing();
        });
      }
    }
    if (items.length == 0 && itemsInProcess == 0) {
      const drainFn = functionMap["drain"];
      drainFn?.();
    }
  };

  return {
    push: onPush,
    unshift: onUnshift,
    drain: onDrain,
    error: onError,
  };
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

// Test 1 — push: all tasks complete and drain fires
const completedTC1 = [];
const processor1 = (task, cb) => setTimeout(() => cb(`${task.name}-done`), 50);
const onComplete1 = (data, _, task) => completedTC1.push(task.name);

const q1 = new Queue(processor1, onComplete1, 2);
q1.push([{ name: "a" }, { name: "b" }, { name: "c" }]);
q1.drain(() => {
  test("TC1: all 3 tasks completed", completedTC1.length, 3);
  test("TC1: tasks ran in push order", completedTC1, ["a", "b", "c"]);
});

// Test 2 — unshift: priority task runs before remaining queued tasks
// (concurrency=1 so 'a' starts first; unshift fires before 'a' finishes, placing priority next)
const completedTC2 = [];
const processor2 = (task, cb) => setTimeout(() => cb(`${task.name}-done`), 80);
const onComplete2 = (data, _, task) => completedTC2.push(task.name);

const q2 = new Queue(processor2, onComplete2, 1);
q2.push([{ name: "a" }, { name: "b" }, { name: "c" }]);
setTimeout(() => q2.unshift({ name: "priority" }), 50);
q2.drain(() => {
  test(
    "TC2: priority ran before b",
    completedTC2.indexOf("priority") < completedTC2.indexOf("b"),
    true,
  );
  test("TC2: all 4 tasks completed", completedTC2.length, 4);
});

// Test 3 — error callback fires when processor signals error
let errorFired = false;
const processorWithErr = (task, cb) =>
  setTimeout(() => cb(null, `${task.name}-error`), 50);
const q3 = new Queue(processorWithErr, () => {}, 1);
q3.push({ name: "e" });
q3.error((err, task) => {
  errorFired = true;
  test("TC3: error callback receives task name", task.name, "e");
  test("TC3: error callback receives error value", err, "e-error");
});
setTimeout(
  () => test("TC3: error callback was invoked", errorFired, true),
  300,
);
