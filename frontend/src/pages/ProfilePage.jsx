import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

function ProfilePage() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: ""
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      const res = await axiosClient.get("/api/users/profile");
      setForm(res.data);
    } catch (err) {
      setError(err.response?.data || "Khong tai duoc thong tin profile");
    }
  };

  useEffect(() => {
    loadProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    try {
      const payload = {
        fullName: form.fullName,
        phone: form.phone,
        address: form.address
      };
      const res = await axiosClient.put("/api/users/profile", payload);
      setForm(res.data);
      setMessage("Cap nhat profile thanh cong");
    } catch (err) {
      setError(err.response?.data || "Cap nhat profile that bai");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h1 className="text-2xl font-semibold mb-4">CNPM-8: Quan ly ho so ca nhan</h1>
      <form onSubmit={handleUpdate} className="space-y-4">
        <input
          className="w-full border rounded p-2"
          placeholder="Ho ten"
          value={form.fullName || ""}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <input className="w-full border rounded p-2 bg-gray-100" value={form.email || ""} disabled />
        <input
          className="w-full border rounded p-2"
          placeholder="So dien thoai"
          value={form.phone || ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className="w-full border rounded p-2"
          placeholder="Dia chi"
          value={form.address || ""}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
          Luu thay doi
        </button>
      </form>
      {message && <p className="text-green-600 mt-3">{message}</p>}
      {error && <p className="text-red-600 mt-3">{error}</p>}
    </div>
  );
}

export default ProfilePage;
