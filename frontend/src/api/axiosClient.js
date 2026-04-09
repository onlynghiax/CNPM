import axios from "axios";
import toast from "react-hot-toast";

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:8080",
  headers: {
    Accept: "application/json"
  }
});

// ── Request interceptor: attach JWT token ──────────────────────────────────
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ── Response interceptor: handle auth errors gracefully ───────────────────
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    if (status === 401) {
      toast.error("Session expired. Please log in again.");
    } else if (status === 403) {
      toast.error("Please log in to continue.");
    }
    // Always re-throw so callers can still catch and handle
    return Promise.reject(error);
  }
);

export default axiosClient;
