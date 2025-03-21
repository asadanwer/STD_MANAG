/** @format */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Swal from "sweetalert2";
import { API_URL } from "../general";

const EnrollmentsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedEnrollment, setSelectedEnrollment] = useState(null);
  const [courses, setCourses] = useState([]);
  const [students, setStudents] = useState([]);
  const [enrollments, setEnrollments] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [enrollmentDate, setEnrollmentDate] = useState("");

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

  const handleEdit = (enrollment) => {
    setSelectedEnrollment(enrollment);
    setSelectedStudent(enrollment.student);
    setSelectedCourse(enrollment.course);
    setEnrollmentDate(enrollment.enrollment_date);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedEnrollment(null);
    setSelectedStudent("");
    setSelectedCourse("");
    setEnrollmentDate("");
  };

  const handleSaveEnrollment = () => {
    if (!selectedStudent || !selectedCourse || !enrollmentDate) {
      Swal.fire("Error", "Please fill all fields.", "error");
      return;
    }

    const enrollmentData = {
      student: selectedStudent,
      course: selectedCourse,
      enrollment_date: enrollmentDate,
    };

    if (selectedEnrollment) {
      axios
        .put(`${API_URL}enrollments/${selectedEnrollment.id}/`, enrollmentData)
        .then((response) => {
          setEnrollments(
            enrollments.map((enrollment) =>
              enrollment.id === response.data.id ? response.data : enrollment
            )
          );
          Swal.fire("Success", "Enrollment updated successfully!", "success");
          handleClose();
        })
        .catch((error) => {
          console.error("Error updating enrollment:", error);
          Swal.fire("Error", "Failed to update enrollment.", "error");
        });
    } else {
      axios
        .post(`${API_URL}enrollments/`, enrollmentData)
        .then((response) => {
          setEnrollments([...enrollments, response.data]);
          Swal.fire("Success", "Enrollment added successfully!", "success");
          handleClose();
        })
        .catch((error) => {
          console.error("Error adding enrollment:", error);
          Swal.fire("Error", "Failed to add enrollment.", "error");
        });
    }
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_URL}enrollments/${id}/`)
          .then(() => {
            setEnrollments(
              enrollments.filter((enrollment) => enrollment.id !== id)
            );
            Swal.fire("Deleted!", "Enrollment has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting enrollment:", error);
            Swal.fire("Error", "Failed to delete enrollment.", "error");
          });
      }
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Enrollments List</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Enrollment
          </Button>
        </Col>
      </Row>
      <table className="table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Course</th>
            <th>Enrollment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {enrollments.length > 0 ? (
            enrollments.map((enrollment) => (
              <tr key={enrollment.id}>
                <td>{enrollment.student}</td>
                <td>{enrollment.course}</td>
                <td>{enrollment.enrollment_date}</td>
                <td>
                  <FaEdit
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={() => handleEdit(enrollment)}
                  />
                  <FaTrash
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(enrollment.id)}
                  />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {selectedEnrollment ? "Edit" : "Add"} Enrollment
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Student</Form.Label>
              <Form.Control
                as="select"
                value={selectedStudent}
                onChange={(e) => setSelectedStudent(e.target.value)}
              >
                <option value="">Select Student</option>
                {students.map((student) => (
                  <option key={student.id} value={student.id}>
                    {student.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Course</Form.Label>
              <Form.Control
                as="select"
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.course_name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Enrollment Date</Form.Label>
              <Form.Control
                type="date"
                value={enrollmentDate}
                onChange={(e) => setEnrollmentDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEnrollment}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default EnrollmentsList;
