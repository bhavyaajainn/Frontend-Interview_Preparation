// Implement a Stack using a Queue

class Queue {
  // Write your Queue implementation here (enqueue, dequeue, front, size, isEmpty, clear, toArray)
  constructor() {
    this.data = [];
  }
  enqueue(val) {
    this.data.push(val);
  }
  dequeue() {
    return this.data.shift();
  }
  front() {
    return this.data[0];
  }
  size() {
    return this.data.length;
  }
  isEmpty() {
    return this.data.length == 0;
  }
  clear() {
    this.data = [];
  }
  toArray() {
    return [...this.data];
  }
}

function Stack() {
  // Write your Stack implementation here using a single Queue
  // Required methods: push, pop, peek, size, isEmpty, clear, toArray
  let queue = new Queue();
  this.push = function (val) {
    let size = queue.size();
    queue.enqueue(val);
    for (let i = 0; i < size; i++) {
      let temp = queue.dequeue();
      queue.enqueue(temp);
    }
  };
  this.pop = function () {
    if (queue.isEmpty()) {
      return null;
    } else {
      return queue.dequeue();
    }
  };
  this.peek = function () {
    if (queue.isEmpty()) {
      return null;
    }
    return queue.front();
  };
  this.isEmpty = function () {
    return queue.isEmpty();
  };
  this.clear = function () {
    queue.clear();
  };
  this.toArray = function () {
    queue.toArray();
  };
  this.size = function () {
    return queue.size();
  };
}

// Sample test cases
function testStack() {
  // Test 1: basic push/pop/peek sequence
  let s1 = new Stack();
  s1.push(1);
  s1.push(2);
  s1.push(3);
  console.log(
    `peek()     : ${s1.peek() === 3 ? "Success" : "Fail"} (got ${s1.peek()}, expected 3)`,
  );
  console.log(
    `isEmpty()  : ${s1.isEmpty() === false ? "Success" : "Fail"} (got ${s1.isEmpty()}, expected false)`,
  );
  console.log(
    `size()     : ${s1.size() === 3 ? "Success" : "Fail"} (got ${s1.size()}, expected 3)`,
  );
  console.log(
    `pop()      : ${s1.pop() === 3 ? "Success" : "Fail"} (got ${s1.pop()}, expected 3)`,
  );

  // Note: pop() was called above, so stack now has [1] left after two pops
  let s2 = new Stack();
  s2.push(1);
  s2.push(2);
  s2.push(3);
  s2.pop(); // removes 3
  console.log(
    `toArray()  : ${JSON.stringify(s2.toArray()) === JSON.stringify([2, 1]) ? "Success" : "Fail"} (got ${JSON.stringify(s2.toArray())}, expected [2,1])`,
  );
  console.log(
    `size()     : ${s2.size() === 2 ? "Success" : "Fail"} (got ${s2.size()}, expected 2)`,
  );
  s2.clear();
  console.log(
    `isEmpty() after clear: ${s2.isEmpty() === true ? "Success" : "Fail"} (got ${s2.isEmpty()}, expected true)`,
  );

  // Test 2: empty stack returns null
  let s3 = new Stack();
  console.log(
    `pop() empty   : ${s3.pop() === null ? "Success" : "Fail"} (got ${s3.pop()}, expected null)`,
  );
  console.log(
    `peek() empty  : ${s3.peek() === null ? "Success" : "Fail"} (got ${s3.peek()}, expected null)`,
  );

  // Test 3: push rotation
  let s4 = new Stack();
  s4.push(10);
  s4.push(20);
  console.log(
    `peek() after push(10,20): ${s4.peek() === 20 ? "Success" : "Fail"} (got ${s4.peek()}, expected 20)`,
  );
  s4.pop();
  console.log(
    `peek() after pop()      : ${s4.peek() === 10 ? "Success" : "Fail"} (got ${s4.peek()}, expected 10)`,
  );

  // Test 4: single element
  let s5 = new Stack();
  s5.push(42);
  console.log(
    `pop() single  : ${s5.pop() === 42 ? "Success" : "Fail"} (got ${s5.pop()}, expected 42)`,
  );
}
testStack();

module.exports = { Stack, Queue };
