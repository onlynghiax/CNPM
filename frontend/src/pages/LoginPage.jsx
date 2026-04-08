import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";

const inputClass =
  "w-full bg-transparent py-2.5 px-0 text-white placeholder:text-muted/80 outline-none border-0 border-b border-white/30 focus:border-white/60 transition rounded-none";

function formatError(err) {
  const d = err.response?.data;
  if (typeof d === "string") return d;
  if (d && typeof d === "object") return JSON.stringify(d);
  return err.message || "Sign-in failed.";
}

function LoginPage() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axiosClient.post("/api/auth/login", form);
      localStorage.setItem("token", res.data.token);
      navigate("/");
      window.location.reload();
    } catch (err) {
      setError(formatError(err));
    }
  };

  return (
    <div className="max-w-md mx-auto rounded-2xl bg-card p-8 md:p-12 shadow-soft text-center sm:text-left">
      <h1 className="text-3xl md:text-4xl font-extralight tracking-tight text-white mb-2">Sign in</h1>
      <p className="text-sm text-muted mb-10 leading-relaxed font-light">Welcome back to BadGenius.</p>
      <form onSubmit={handleSubmit} className="space-y-7">
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
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button
          className="rounded-minimal bg-mist/[0.08] hover:bg-mist/[0.12] text-mist font-semibold px-6 py-3 transition"
          type="submit"
        >
          Login
        </button>
      </form>
      {error && <p className="text-sm text-red-400/90 mt-8 leading-relaxed">{error}</p>}
    </div>
  );
}

export default LoginPage;
