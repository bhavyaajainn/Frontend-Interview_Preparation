// Create a School using OOPs Principles
//
// Class hierarchy:
//   SchoolMember (base)  — shared: name, age, id, email, isActive
//     └── Student        — grade, rollNumber, subjects, marks, attendance
//     └── Teacher        — department, experience, salary, subjects, students[]
//   School               — manages Student[] and Teacher[]

// ─── SchoolMember (base class) ───────────────────────────────────────────────

class SchoolMember {
  constructor(name, age, id, email) {
    this.name = name;
    this.age = age;
    this.id = id;
    this.email = email;
    this.isActive = true;
  }

  getBasicInfo() {
    return { name: this.name, age: this.age, id: this.id, email: this.email, isActive: this.isActive };
  }

  updateEmail(newEmail) {
    this.email = newEmail;
  }

  toggleStatus() {
    this.isActive = !this.isActive;
  }
}

// ─── Student ─────────────────────────────────────────────────────────────────

class Student extends SchoolMember {
  constructor(name, age, id, email, grade, rollNumber) {
    super(name, age, id, email);
    this.grade = grade;
    this.rollNumber = rollNumber;
    this.subjects = [];
    this.marks = {};
    this.attendance = 0;
  }

  enrollInSubject(subject) {
    if (!this.subjects.includes(subject)) {
      this.subjects.push(subject);
      this.marks[subject] = [];
    }
  }

  addMark(subject, mark) {
    if (!this.subjects.includes(subject)) throw new Error(`Not enrolled in ${subject}`);
    this.marks[subject].push(mark);
  }

  updateAttendance(percentage) {
    this.attendance = percentage;
  }

  calculateAverageMarks() {
    const all = Object.values(this.marks).flat();
    if (all.length === 0) return 0;
    return all.reduce((sum, m) => sum + m, 0) / all.length;
  }

  getPerformanceLevel() {
    const avg = this.calculateAverageMarks();
    if (avg >= 90) return "Excellent";
    if (avg >= 75) return "Good";
    if (avg >= 60) return "Average";
    return "Needs Improvement";
  }

  getStudentInfo() {
    return {
      ...this.getBasicInfo(),
      grade: this.grade,
      rollNumber: this.rollNumber,
      subjects: this.subjects,
      averageMarks: Math.round(this.calculateAverageMarks()),
      attendance: this.attendance,
      performance: this.getPerformanceLevel(),
    };
  }
}

// ─── Teacher ─────────────────────────────────────────────────────────────────

class Teacher extends SchoolMember {
  constructor(name, age, id, email, department, experience, salary) {
    super(name, age, id, email);
    this.department = department;
    this.experience = experience;
    this.salary = salary;
    this.subjects = [];
    this.students = [];
  }

  assignSubject(subject) {
    if (!this.subjects.includes(subject)) this.subjects.push(subject);
  }

  removeSubject(subject) {
    this.subjects = this.subjects.filter(s => s !== subject);
  }

  assignStudent(studentId) {
    if (!this.students.includes(studentId)) this.students.push(studentId);
  }

  updateSalary(newSalary) {
    this.salary = newSalary;
  }

  getTeacherSubjects() {
    return {
      teacherId: this.id,
      teacherName: this.name,
      department: this.department,
      subjects: this.subjects,
      totalSubjects: this.subjects.length,
      experience: this.experience,
    };
  }

  getWorkload() {
    return {
      subjects: this.subjects.length,
      students: this.students.length,
      totalWorkload: this.subjects.length * this.students.length,
    };
  }

  getTeacherInfo() {
    return {
      ...this.getBasicInfo(),
      department: this.department,
      experience: this.experience,
      salary: this.salary,
      subjects: this.subjects,
      studentsCount: this.students.length,
      workload: this.getWorkload(),
    };
  }
}

// ─── School ───────────────────────────────────────────────────────────────────

class School {
  constructor(name) {
    this.name = name;
    this.students = [];
    this.teachers = [];
  }

  addStudent(student) {
    this.students.push(student);
  }

  addTeacher(teacher) {
    this.teachers.push(teacher);
  }

  getTotalStrength() {
    const activeStudents = this.students.filter(s => s.isActive);
    const activeTeachers = this.teachers.filter(t => t.isActive);
    const inactiveMembers =
      this.students.filter(s => !s.isActive).length +
      this.teachers.filter(t => !t.isActive).length;
    return {
      totalStudents: activeStudents.length,
      totalTeachers: activeTeachers.length,
      totalStrength: activeStudents.length + activeTeachers.length,
      inactiveMembers,
    };
  }

  getStudentsByGrade(grade) {
    return this.students.filter(s => s.grade === grade);
  }

  getSchoolStats() {
    const { totalStudents, totalTeachers, totalStrength, inactiveMembers } = this.getTotalStrength();
    const avgStudentAge = this.students.length
      ? this.students.reduce((sum, s) => sum + s.age, 0) / this.students.length
      : 0;
    const avgTeacherExp = this.teachers.length
      ? this.teachers.reduce((sum, t) => sum + t.experience, 0) / this.teachers.length
      : 0;
    return {
      schoolName: this.name,
      totalStudents,
      totalTeachers,
      totalStrength,
      inactiveMembers,
      averageStudentAge: avgStudentAge,
      averageTeacherExperience: avgTeacherExp,
      studentTeacherRatio: totalTeachers > 0 ? totalStudents / totalTeachers : 0,
    };
  }
}

// ─── Tests ───────────────────────────────────────────────────────────────────

function test(name, actual, expected) {
  const ok = JSON.stringify(actual) === JSON.stringify(expected);
  console.log(`${ok ? "PASS" : "FAIL"}: ${name}`);
  if (!ok) {
    console.log(`  Expected: ${JSON.stringify(expected)}`);
    console.log(`  Got:      ${JSON.stringify(actual)}`);
  }
}

// ── Setup ────────────────────────────────────────────────────────────────────

const school = new School("Learnersbucket High School");

const student1 = new Student("Harry Potter", 16, "S001", "harry@learnersbucket.com", "10th", "R001");
const student2 = new Student("Hermione Granger", 17, "S002", "hermione@learnersbucket.com", "11th", "R002");
const student3 = new Student("Ron Weasely", 15, "S003", "ron@learnersbucket.com", "9th", "R003");

const teacher1 = new Teacher("Mr. Rubeus Hagrid", 35, "T001", "rubeus@learnersbucket.com", "Mathematics", 10, 50000);
const teacher2 = new Teacher("Mr. Albus Dumbledore", 28, "T002", "albus@learnersbucket.com", "English", 5, 45000);

student1.enrollInSubject("Mathematics");
student1.enrollInSubject("Physics");
student1.addMark("Mathematics", 85);
student1.addMark("Mathematics", 92);
student1.addMark("Physics", 78);
student1.updateAttendance(95);

student2.enrollInSubject("English");
student2.enrollInSubject("History");
student2.addMark("English", 88);
student2.addMark("History", 82);
student2.updateAttendance(87);

teacher1.assignSubject("Mathematics");
teacher1.assignSubject("Physics");
teacher1.assignStudent("S001");
teacher1.assignStudent("S003");

teacher2.assignSubject("English");
teacher2.assignSubject("Literature");
teacher2.assignStudent("S002");

school.addStudent(student1);
school.addStudent(student2);
school.addStudent(student3);
school.addTeacher(teacher1);
school.addTeacher(teacher2);

// ── SchoolMember shared behaviour ────────────────────────────────────────────

test("BASE TC1: getBasicInfo returns correct fields", student1.getBasicInfo(), {
  name: "Harry Potter", age: 16, id: "S001",
  email: "harry@learnersbucket.com", isActive: true,
});

test("BASE TC2: isActive defaults to true", student3.isActive, true);

test("BASE TC3: toggleStatus flips isActive", (() => {
  student3.toggleStatus();
  const v = student3.isActive;
  student3.toggleStatus(); // restore
  return v;
})(), false);

test("BASE TC4: updateEmail changes email", (() => {
  student3.updateEmail("new@test.com");
  const v = student3.email;
  student3.updateEmail("ron@learnersbucket.com"); // restore
  return v;
})(), "new@test.com");

// ── Student ───────────────────────────────────────────────────────────────────

test("STU TC1: enrollInSubject adds subject", student1.subjects.includes("Mathematics"), true);
test("STU TC2: duplicate subject not added", (() => {
  student1.enrollInSubject("Mathematics");
  return student1.subjects.filter(s => s === "Mathematics").length;
})(), 1);

test("STU TC3: addMark throws for unenrolled subject", (() => {
  try { student1.addMark("Biology", 90); return false; }
  catch { return true; }
})(), true);

test("STU TC4: calculateAverageMarks is correct", student1.calculateAverageMarks(), 85);

test("STU TC5: getPerformanceLevel Good (avg=85)", student1.getPerformanceLevel(), "Good");

test("STU TC6: performance Excellent for avg>=90", (() => {
  const s = new Student("A", 15, "X", "x@x.com", "10th", "R99");
  s.enrollInSubject("Math");
  s.addMark("Math", 95);
  return s.getPerformanceLevel();
})(), "Excellent");

test("STU TC7: getStudentInfo shape correct", student1.getStudentInfo(), {
  name: "Harry Potter", age: 16, id: "S001",
  email: "harry@learnersbucket.com", isActive: true,
  grade: "10th", rollNumber: "R001",
  subjects: ["Mathematics", "Physics"],
  averageMarks: 85, attendance: 95, performance: "Good",
});

// ── Teacher ───────────────────────────────────────────────────────────────────

test("TCH TC1: assignSubject adds subject", teacher1.subjects.includes("Mathematics"), true);
test("TCH TC2: duplicate subject not added", (() => {
  teacher1.assignSubject("Mathematics");
  return teacher1.subjects.filter(s => s === "Mathematics").length;
})(), 1);

test("TCH TC3: removeSubject works", (() => {
  teacher1.assignSubject("Temp");
  teacher1.removeSubject("Temp");
  return teacher1.subjects.includes("Temp");
})(), false);

test("TCH TC4: getTeacherSubjects shape", teacher1.getTeacherSubjects(), {
  teacherId: "T001", teacherName: "Mr. Rubeus Hagrid",
  department: "Mathematics", subjects: ["Mathematics", "Physics"],
  totalSubjects: 2, experience: 10,
});

test("TCH TC5: getWorkload totalWorkload = subjects * students", teacher1.getWorkload(), {
  subjects: 2, students: 2, totalWorkload: 4,
});

test("TCH TC6: updateSalary changes salary", (() => {
  teacher2.updateSalary(50000);
  const v = teacher2.salary;
  teacher2.updateSalary(45000); // restore
  return v;
})(), 50000);

// ── School ────────────────────────────────────────────────────────────────────

test("SCH TC1: getTotalStrength", school.getTotalStrength(), {
  totalStudents: 3, totalTeachers: 2, totalStrength: 5, inactiveMembers: 0,
});

test("SCH TC2: inactive member counted", (() => {
  student3.toggleStatus();
  const v = school.getTotalStrength().inactiveMembers;
  student3.toggleStatus(); // restore
  return v;
})(), 1);

test("SCH TC3: getStudentsByGrade returns correct students",
  school.getStudentsByGrade("10th").map(s => s.name), ["Harry Potter"]);

test("SCH TC4: getSchoolStats shape", school.getSchoolStats(), {
  schoolName: "Learnersbucket High School",
  totalStudents: 3, totalTeachers: 2, totalStrength: 5, inactiveMembers: 0,
  averageStudentAge: 16, averageTeacherExperience: 7.5, studentTeacherRatio: 1.5,
});

console.log("\nAll tests done");
