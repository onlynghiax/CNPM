import axios from "axios";

const axiosClient = axios.create({
  baseURL: "http://localhost:8080"
});

// Interceptor: tu dong dinh kem JWT cho cac request can dang nhap.
axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosClient;
