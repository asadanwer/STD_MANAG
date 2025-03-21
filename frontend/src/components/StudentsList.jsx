/** @format */
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../general";

const StudentsList = () => {
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [students, setStudents] = useState([]);
  const [studentData, setStudentData] = useState({
    student_id: "",
    first_name: "",
    last_name: "",
    email: "",
    date_of_birth: "",
  });

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = () => {
    axios
      .get(`${API_URL}students/`)
      .then((response) => setStudents(response?.data))
      .catch((error) => console.error("Error fetching data:", error));
  };

  const handleEdit = (student) => {
    setStudentData(student);
    setIsEditMode(true);
    setShowModal(true);
  };

  const handleOpenModal = () => {
    setStudentData({
      student_id: "",
      first_name: "",
      last_name: "",
      email: "",
      date_of_birth: "",
    });
    setIsEditMode(false);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${API_URL}students/${id}/`)
          .then(() => {
            fetchStudents();
            Swal.fire("Deleted!", "The student has been deleted.", "success");
          })
          .catch((error) => {
            console.error("Error deleting student:", error);
            Swal.fire("Error!", "Failed to delete the student.", "error");
          });
      }
    });
  };

  const handleSubmit = () => {
    const apiUrl = isEditMode
      ? `${API_URL}students/${studentData.id}/`
      : `${API_URL}students/`;
    const apiMethod = isEditMode ? axios.put : axios.post;
    apiMethod(apiUrl, studentData, {
      headers: { "Content-Type": "application/json" },
    })
      .then(() => {
        fetchStudents();
        handleClose();
        Swal.fire({
          icon: "success",
          title: isEditMode ? "Student Updated!" : "Student Added!",
          text: isEditMode
            ? "The student details have been updated successfully."
            : "The student has been added successfully.",
          timer: 2000,
          showConfirmButton: false,
        });
      })
      .catch((error) => {
        console.error("Error saving student:", error);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2>Students List</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleOpenModal}>
            Add Student
          </Button>
        </Col>
      </Row>
      {students.length === 0 ? (
        <p className="text-center mt-3">No students available</p>
      ) : (
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Date of Birth</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.student_id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.date_of_birth}</td>
                <td>
                  <FaEdit
                    style={{ cursor: "pointer", marginRight: "10px" }}
                    onClick={() => handleEdit(student)}
                  />
                  <FaTrash
                    style={{ cursor: "pointer", color: "red" }}
                    onClick={() => handleDelete(student.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {/* Modal for Add/Edit Student */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEditMode ? "Edit Student" : "Add Student"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Student ID</Form.Label>
              <Form.Control
                type="text"
                name="student_id"
                value={studentData.student_id}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={studentData.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={studentData.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={studentData.date_of_birth}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {isEditMode ? "Save Changes" : "Add Student"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default StudentsList;
