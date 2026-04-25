// Implement Two Stacks with an Array

class twoStacks {
  constructor(n) {
    // Write your solution here
    // Hint: this.size = n, this.arr = []
    // this.top1 = -1  (stack1 grows left to right)
    // this.top2 = n   (stack2 grows right to left)
  }

  push1(elm) {
    // Write your solution here
    // Hint: check top1 < top2 - 1 before pushing, else log 'Stack overflow'
    // Push at ++this.top1
  }

  push2(elm) {
    // Write your solution here
    // Hint: check top1 < top2 - 1 before pushing, else log 'Stack overflow'
    // Push at --this.top2
  }

  pop1() {
    // Write your solution here
    // Hint: check top1 >= 0, else log 'Stack underflow'
    // Return arr[this.top1--]
  }

  pop2() {
    // Write your solution here
    // Hint: check top2 < this.size, else log 'Stack underflow'
    // Return arr[this.top2++]
  }
}

// Sample test cases
function testTwoStacks() {
  console.log("--- Basic push/pop ---");
  let s1 = new twoStacks(10);
  s1.push1('Prashant');
  s1.push2('Yadav');
  console.log(s1.pop1());   // expected: 'Prashant'
  console.log(s1.pop2());   // expected: 'Yadav'

  console.log("--- Multiple pushes, LIFO order ---");
  let s2 = new twoStacks(5);
  s2.push1(1); s2.push1(2);
  s2.push2(10); s2.push2(20);
  console.log(s2.pop1());   // expected: 2
  console.log(s2.pop2());   // expected: 20

  console.log("--- Overflow ---");
  let s3 = new twoStacks(2);
  s3.push1('a');
  s3.push2('b');
  s3.push1('c');             // expected: 'Stack overflow'

  console.log("--- Underflow ---");
  let s4 = new twoStacks(5);
  s4.pop1();                 // expected: 'Stack underflow'
  s4.pop2();                 // expected: 'Stack underflow'

  console.log("--- Space efficiency: unequal distribution ---");
  let s5 = new twoStacks(6);
  s5.push1(1); s5.push1(2); s5.push1(3); s5.push1(4); // 4 in stack1
  s5.push2(10); s5.push2(20);                           // 2 in stack2
  console.log(s5.pop1());   // expected: 4
  console.log(s5.pop2());   // expected: 20
}
testTwoStacks();

module.exports = { twoStacks };
