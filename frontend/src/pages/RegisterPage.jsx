import { useState } from "react";
import axiosClient from "../api/axiosClient";

function RegisterPage() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Email khong hop le";
    }
    if (form.password.length < 6) {
      return "Mat khau toi thieu 6 ky tu";
    }
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await axiosClient.post("/api/auth/register", form);
      setMessage("Dang ky thanh cong, vui long dang nhap.");
      setForm({ fullName: "", email: "", password: "" });
    } catch (err) {
      setError(err.response?.data || "Dang ky that bai");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">CNPM-6: Dang ky tai khoan</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="w-full border rounded p-2"
          placeholder="Ho ten"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className="w-full border rounded p-2"
          type="password"
          placeholder="Mat khau (>=6 ky tu)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Dang ky
        </button>
      </form>
      {message && <p className="text-green-600 mt-3">{message}</p>}
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}

export default RegisterPage;
