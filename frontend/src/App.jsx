/** @format */
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import StudentsList from "./components/StudentsList";
import CoursesList from "./components/CoursesList";
import EnrollmentsList from "./components/EnrollmentsList";
import Dashboard from "./components/Dashboard";
import "./App.css";
function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Dashboard</Link>
            </li>
            <li>
              <Link to="/students">Students</Link>
            </li>
            <li>
              <Link to="/courses">Courses</Link>
            </li>
            <li>
              <Link to="/enrollments">Enrollments</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/students" element={<StudentsList />} />
          <Route path="/courses" element={<CoursesList />} />
          <Route path="/enrollments" element={<EnrollmentsList />} />
        </Routes>
      </div>
    </Router>
  );
}
export default App;
