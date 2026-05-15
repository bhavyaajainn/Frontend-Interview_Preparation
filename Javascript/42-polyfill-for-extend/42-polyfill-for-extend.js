// Polyfill for extend
// extend(Parent, Child) — makes Child inherit from Parent:
//   - Child instances can call Parent prototype methods
//   - Child's own methods take priority (override)
//   - Static methods on Parent are accessible on Child
//   - instanceof Parent and instanceof Child both return true
//   - Child.prototype.constructor still points to Child

const extend = (Parent, Child) => {
  // TODO
};

// --- Setup ---

function Person() {
  this.name = 'PersonName';
}
Person.prototype.walk = function () {
  return this.name + ' is walking';
};
Person.prototype.sayHello = function () {
  return 'hello from Person';
};
Person.staticMethod = function () {
  return 'static from Person';
};

function Student() {
  this.name = 'StudentName';
}
Student.prototype.sayHello = function () {
  return 'hi, I am a student';
};
Student.prototype.sayGoodBye = function () {
  return 'goodbye';
};

extend(Person, Student);

// --- Tests ---

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? 'PASS' : 'FAIL'}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

const student = new Student();
const person  = new Person();

// TC1 — child's own method works
test('TC1: child own method', student.sayHello(), 'hi, I am a student');

// TC2 — child's other own method works
test('TC2: child own method (sayGoodBye)', student.sayGoodBye(), 'goodbye');

// TC3 — child inherits parent method not overridden
test('TC3: child inherits walk from parent', student.walk(), 'StudentName is walking');

// TC4 — child's sayHello overrides parent's (not "hello from Person")
test('TC4: child method overrides parent method', student.sayHello() !== 'hello from Person', true);

// TC5 — instanceof Parent returns true
test('TC5: student instanceof Person', student instanceof Person, true);

// TC6 — instanceof Child returns true
test('TC6: student instanceof Student', student instanceof Student, true);

// TC7 — static methods accessible on Child
test('TC7: static method inherited', Student.staticMethod(), 'static from Person');

// TC8 — child constructor points to Child, not Parent
test('TC8: constructor points to Student', student.constructor === Student, true);

// TC9 — parent instance is unaffected
test('TC9: parent instance uses its own sayHello', person.sayHello(), 'hello from Person');

// TC10 — parent does not get child methods
test('TC10: parent does not inherit sayGoodBye', typeof person.sayGoodBye, 'undefined');

console.log('\nAll tests done');
