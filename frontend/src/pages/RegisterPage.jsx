import { useState } from "react";
import axiosClient from "../api/axiosClient";

const inputClass =
  "w-full bg-transparent py-2.5 px-0 text-white placeholder:text-muted/80 outline-none border-0 border-b border-white/30 focus:border-white/60 transition rounded-none";

function formatError(err) {
  const d = err.response?.data;
  if (typeof d === "string") return d;
  if (d && typeof d === "object") return JSON.stringify(d);
  return err.message || "Registration failed.";
}

function RegisterPage() {
  const [form, setForm] = useState({ fullName: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const validate = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      return "Please enter a valid email address.";
    }
    if (form.password.length < 6) {
      return "Password must be at least 6 characters.";
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
      setMessage("You're in. Sign in with BadGenius whenever you're ready.");
      setForm({ fullName: "", email: "", password: "" });
    } catch (err) {
      setError(formatError(err));
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl bg-card p-8 md:p-12 shadow-soft text-center sm:text-left">
      <h1 className="text-3xl md:text-4xl font-extralight tracking-tight text-white mb-2">Create an account</h1>
      <p className="text-sm text-muted mb-10 leading-relaxed font-light">Join BadGenius to save your profile.</p>
      <form onSubmit={handleSubmit} className="space-y-7">
        <input
          className={inputClass}
          placeholder="Full name"
          value={form.fullName}
          onChange={(e) => setForm({ ...form, fullName: e.target.value })}
          required
        />
        <input
          className={inputClass}
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          className={inputClass}
          type="password"
          placeholder="Password (6+ characters)"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          className="rounded-minimal bg-mist/90 hover:bg-mist text-void font-semibold px-6 py-3 shadow-soft-sm transition"
          type="submit"
        >
          Register
        </button>
      </form>
      {message && <p className="text-sm text-mist/90 mt-8 leading-relaxed">{message}</p>}
      {error && <p className="text-sm text-red-400/90 mt-8 leading-relaxed">{error}</p>}
    </div>
  );
}

export default RegisterPage;
