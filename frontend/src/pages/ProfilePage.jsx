import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";

const inputClass =
  "w-full bg-transparent py-2.5 px-0 text-white placeholder:text-muted/80 outline-none border-0 border-b border-white/30 focus:border-white/60 transition rounded-none";

const inputDisabled =
  "w-full py-2.5 px-0 text-muted/80 border-0 border-b border-white/10 cursor-not-allowed bg-transparent rounded-none";

function formatError(err) {
  const d = err.response?.data;
  if (typeof d === "string") return d;
  if (d && typeof d === "object") return JSON.stringify(d);
  return err.message || "Request failed.";
}

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
      setError(formatError(err));
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
      setMessage("Profile updated.");
    } catch (err) {
      setError(formatError(err));
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl bg-card p-8 md:p-12 shadow-soft text-center sm:text-left">
      <h1 className="text-3xl md:text-4xl font-extralight tracking-tight text-white mb-2">Profile</h1>
      <p className="text-sm text-muted mb-10 leading-relaxed font-light">Manage your BadGenius account details.</p>
      <form onSubmit={handleUpdate} className="space-y-7">
        <input
          className={inputClass}
          placeholder="Full name"
          value={form.fullName || ""}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        />
        <input
          className={inputDisabled}
          value={form.email || ""}
          disabled
          readOnly
          aria-label="Email (read only)"
          title="Email cannot be changed here"
        />
        <input
          className={inputClass}
          placeholder="Phone"
          value={form.phone || ""}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          className={inputClass}
          placeholder="Address"
          value={form.address || ""}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <button
          className="rounded-minimal bg-accent-neon/88 hover:bg-accent-neon text-white font-semibold px-6 py-3 shadow-soft-sm transition"
          type="submit"
        >
          Save changes
        </button>
      </form>
      {message && <p className="text-sm text-mist/90 mt-8 leading-relaxed">{message}</p>}
      {error && <p className="text-sm text-red-400/90 mt-8 leading-relaxed">{error}</p>}
    </div>
  );
}

export default ProfilePage;
