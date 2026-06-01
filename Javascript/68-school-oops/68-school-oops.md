# Create a School using OOPs Principles

## Problem Statement

Design a class hierarchy for a school system using OOP principles:

```
SchoolMember (base)
  ├── Student  — grade, subjects, marks, attendance
  └── Teacher  — department, experience, salary, assigned students
School          — manages collections of students and teachers
```

---

## Class Contracts

### `SchoolMember(name, age, id, email)`
| Method | Returns |
|---|---|
| `getBasicInfo()` | `{ name, age, id, email, isActive }` |
| `updateEmail(newEmail)` | updates `this.email` |
| `toggleStatus()` | flips `this.isActive` |

### `Student(name, age, id, email, grade, rollNumber)`
| Method | Returns |
|---|---|
| `enrollInSubject(subject)` | adds to `subjects[]`; inits `marks[subject] = []`; ignores duplicates |
| `addMark(subject, mark)` | pushes to `marks[subject]`; throws if not enrolled |
| `updateAttendance(pct)` | sets `attendance` |
| `calculateAverageMarks()` | mean of all marks across all subjects; `0` if none |
| `getPerformanceLevel()` | `"Excellent"` ≥90 / `"Good"` ≥75 / `"Average"` ≥60 / `"Needs Improvement"` |
| `getStudentInfo()` | `{ ...basicInfo, grade, rollNumber, subjects, averageMarks, attendance, performance }` |

### `Teacher(name, age, id, email, department, experience, salary)`
| Method | Returns |
|---|---|
| `assignSubject(subject)` | adds to `subjects[]`; ignores duplicates |
| `removeSubject(subject)` | filters out from `subjects[]` |
| `assignStudent(studentId)` | adds to `students[]`; ignores duplicates |
| `updateSalary(newSalary)` | sets `salary` |
| `getTeacherSubjects()` | `{ teacherId, teacherName, department, subjects, totalSubjects, experience }` |
| `getWorkload()` | `{ subjects, students, totalWorkload: subjects × students }` |
| `getTeacherInfo()` | `{ ...basicInfo, department, experience, salary, subjects, studentsCount, workload }` |

### `School(name)`
| Method | Returns |
|---|---|
| `addStudent(student)` | pushes to `students[]` |
| `addTeacher(teacher)` | pushes to `teachers[]` |
| `getTotalStrength()` | `{ totalStudents, totalTeachers, totalStrength, inactiveMembers }` |
| `getStudentsByGrade(grade)` | filtered array of students |
| `getSchoolStats()` | full stats including averageStudentAge, averageTeacherExperience, studentTeacherRatio |

---

## OOP Principles Applied

| Principle | How |
|---|---|
| **Encapsulation** | Each class owns its data and exposes only methods — no direct property manipulation from outside |
| **Inheritance** | `Student` and `Teacher` extend `SchoolMember` to share `name`, `age`, `id`, `email`, `isActive` and common methods |
| **Abstraction** | Callers use `getStudentInfo()` / `getSchoolStats()` without knowing internal computation |
| **Polymorphism** | Both `Student` and `Teacher` implement a `type` property and share `getBasicInfo()` — `School` can treat them uniformly for strength counts |

---

## Key Design Points

- `averageMarks` in `getStudentInfo()` should be rounded (use `Math.round` or `parseInt`)  
- `averageStudentAge` / `averageTeacherExperience` should handle empty arrays (divide by length only if > 0)  
- `studentTeacherRatio` = `totalStudents / totalTeachers`; return `0` when no teachers to avoid division by zero  
- `getWorkload().totalWorkload` = `subjects.length * students.length` (not sum)
