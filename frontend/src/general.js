/** @format */
export const API_URL = "http://localhost:8000/api/";
import axios from "axios";
import Swal from "sweetalert2";
// ✅ Configure Axios Interceptor
const apiClient = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Something went wrong! Please try again.",
    });
    return Promise.reject(error);
  }
);
// ✅ SweetAlert Utility Functions
export const showSuccess = (message) => {
  Swal.fire({
    icon: "success",
    title: "Success",
    text: message,
    timer: 2000,
    showConfirmButton: false,
  });
};
export const showError = (message) => {
  Swal.fire({
    icon: "error",
    title: "Error",
    text: message || "An unexpected error occurred.",
  });
};
export const confirmDelete = async () => {
  return Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Yes, delete it!",
  });
};
export default apiClient;
