/** @format */

// src/mockData.js
export const students = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    student_id: "S001",
    date_of_birth: "2000-01-01",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    student_id: "S002",
    date_of_birth: "2001-05-15",
  },
  {
    id: 3,
    name: "Alice Johnson",
    email: "alice@example.com",
    student_id: "S003",
    date_of_birth: "1999-11-30",
  },
];

export const courses = [
  {
    id: 1,
    course_name: "Mathematics",
    course_code: "MATH101",
    instructor: "Dr. Smith",
    credits: 3,
  },
  {
    id: 2,
    course_name: "Physics",
    course_code: "PHYS101",
    instructor: "Dr. Brown",
    credits: 4,
  },
  {
    id: 3,
    course_name: "Chemistry",
    course_code: "CHEM101",
    instructor: "Dr. White",
    credits: 3,
  },
];

export const enrollments = [
  {
    id: 1,
    student: students[0],
    course: courses[0],
    enrollment_date: "2023-10-01",
  },
  {
    id: 2,
    student: students[1],
    course: courses[1],
    enrollment_date: "2023-10-02",
  },
  {
    id: 3,
    student: students[2],
    course: courses[2],
    enrollment_date: "2023-10-03",
  },
  {
    id: 4,
    student: students[0],
    course: courses[1],
    enrollment_date: "2023-10-04",
  },
  {
    id: 5,
    student: students[1],
    course: courses[2],
    enrollment_date: "2023-10-05",
  },
];
