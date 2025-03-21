/** @format */
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Container, Row, Col } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import apiClient, { showSuccess, showError, confirmDelete } from "../general";
const CoursesList = () => {
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [courseData, setCourseData] = useState({
    course_name: "",
    course_code: "",
    instructor: "",
    credits: "",
  });
  useEffect(() => {
    fetchCourses();
  }, []);
  const fetchCourses = () => {
    apiClient
      .get("courses/")
      .then((response) => setCourses(response?.data))
      .catch(() => showError("Failed to fetch courses."));
  };
  const handleEdit = (course) => {
    setCourseData(course);
    setIsEditMode(true);
    setShowModal(true);
  };
  const handleOpenModal = () => {
    setCourseData({
      course_name: "",
      course_code: "",
      instructor: "",
      credits: "",
    });
    setIsEditMode(false);
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCourseData({ ...courseData, [name]: value });
  };
  const handleSubmit = () => {
    const apiUrl = isEditMode ? `courses/${courseData.id}/` : `courses/`;
    const apiMethod = isEditMode ? apiClient.put : apiClient.post;
    apiMethod(apiUrl, courseData)
      .then(() => {
        fetchCourses();
        handleClose();
        showSuccess(
          isEditMode
            ? "Course updated successfully!"
            : "Course added successfully!"
        );
      })
      .catch(() => showError("Failed to save course."));
  };
  const handleDelete = async (id) => {
    const result = await confirmDelete();
    if (result.isConfirmed) {
      apiClient
        .delete(`courses/${id}/`)
        .then(() => {
          fetchCourses();
          showSuccess("Course deleted successfully!");
        })
        .catch(() => showError("Failed to delete course."));
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <h2>Courses List</h2>
        </Col>
        <Col className="d-flex justify-content-end">
          <Button variant="primary" onClick={handleOpenModal}>
            Add Course
          </Button>
        </Col>
      </Row>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Course Name</th>
            <th>Course Code</th>
            <th>Instructor</th>
            <th>Credits</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id}>
              <td>{course.course_name}</td>
              <td>{course.course_code}</td>
              <td>{course.instructor}</td>
              <td>{course.credits}</td>
              <td>
                <FaEdit
                  style={{ cursor: "pointer", marginRight: "10px" }}
                  onClick={() => handleEdit(course)}
                />
                <FaTrash
                  style={{ cursor: "pointer", color: "red" }}
                  onClick={() => handleDelete(course.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add/Edit Course Modal */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditMode ? "Edit Course" : "Add Course"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Course Name</Form.Label>
              <Form.Control
                type="text"
                name="course_name"
                value={courseData.course_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Course Code</Form.Label>
              <Form.Control
                type="text"
                name="course_code"
                value={courseData.course_code}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Instructor</Form.Label>
              <Form.Control
                type="text"
                name="instructor"
                value={courseData.instructor}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Credits</Form.Label>
              <Form.Control
                type="number"
                name="credits"
                value={courseData.credits}
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
            {isEditMode ? "Save Changes" : "Add Course"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};
export default CoursesList;
