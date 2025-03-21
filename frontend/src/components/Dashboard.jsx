/** @format */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import { API_URL } from "../general";
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const Dashboard = () => {
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  useEffect(() => {
    axios
      .get(`${API_URL}courses`)
      .then((response) => {
        setCourses(response.data);
        return axios.get(`${API_URL}students/`);
      })
      .then((studentsResponse) => {
        setStudents(studentsResponse.data);
        return axios.get(`${API_URL}enrollments/`);
      })
      .then((enrollmentsResponse) => {
        setEnrollments(enrollmentsResponse.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // Data for the number of students enrolled per course
  const courseEnrollmentData = enrollments.reduce((acc, enrollment) => {
    const course = courses.find((c) => c.id === enrollment.course);
    const courseName = course ? course.course_name : "Unknown";
    acc[courseName] = (acc[courseName] || 0) + 1;
    return acc;
  }, {});
  const barChartData = {
    labels: Object.keys(courseEnrollmentData),
    datasets: [
      {
        label: "Number of Students",
        data: Object.values(courseEnrollmentData),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
      },
    ],
  };
  // Data for the distribution of students across courses
  const pieChartData = {
    labels: Object.keys(courseEnrollmentData),
    datasets: [
      {
        data: Object.values(courseEnrollmentData),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };
  return (
    <div>
      <h2>Dashboard</h2>
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ width: "30%" }}>
          <h3>Students Enrolled per Course</h3>
          <Bar data={barChartData} />
        </div>
        <div style={{ width: "30%" }}>
          <h3>Distribution of Students Across Courses</h3>
          <Pie data={pieChartData} />
        </div>
      </div>
    </div>
  );
};
export default Dashboard;
