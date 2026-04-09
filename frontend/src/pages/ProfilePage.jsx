import { useEffect, useState } from "react";
import axiosClient from "../api/axiosClient";
import { Package, Clock, Truck, CheckCircle, Star } from "lucide-react";
import { motion } from "framer-motion";

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
  const [orders, setOrders] = useState([]);
  const [ordersError, setOrdersError] = useState("");
  const [ordersLoading, setOrdersLoading] = useState(true);

  const loadProfile = async () => {
    try {
      const profileRes = await axiosClient.get("/api/users/profile");
      setForm(profileRes.data);
    } catch (err) {
      setError(formatError(err));
    }
  };

  const loadOrders = async () => {
    setOrdersLoading(true);
    setOrdersError("");
    try {
      const res = await axiosClient.get("/api/orders");
      setOrders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Failed to load orders:", err);
      if (err.response?.status === 401 || err.response?.status === 403) {
        setOrdersError("Please log in to view your order history.");
      } else {
        setOrdersError("Could not load orders. Please try again.");
      }
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    loadProfile();
    loadOrders();
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

  const renderOrderTimeline = (status) => {
    const states = [
      { id: "PENDING", label: "Pending", icon: Clock },
      { id: "PROCESSING", label: "Processing", icon: Package },
      { id: "SHIPPED", label: "Shipped", icon: Truck },
      { id: "DELIVERED", label: "Delivered", icon: CheckCircle },
    ];
    let currentIndex = states.findIndex(s => s.id === status);
    if (currentIndex === -1) currentIndex = 0;

    return (
      <div className="flex items-center justify-between mt-4 mb-2 relative">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/5 -translate-y-1/2 z-0"></div>
        <div 
          className="absolute top-1/2 left-0 h-0.5 bg-accent-silver transition-all duration-700 -translate-y-1/2 z-0" 
          style={{ width: `${(currentIndex / (states.length - 1)) * 100}%` }}
        ></div>
        
        {states.map((state, idx) => {
          const isCompleted = idx <= currentIndex;
          const isCurrent = idx === currentIndex;
          const Icon = state.icon;
          return (
            <div key={state.id} className="relative z-10 flex flex-col items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors duration-500 ${
                isCompleted ? 'bg-[#050505] border-accent-silver text-accent-silver shadow-[0_0_10px_rgba(255,255,255,0.1)]' : 'bg-[#111] border-white/10 text-muted/50'
              }`}>
                <Icon size={14} className={isCurrent ? 'animate-pulse' : ''} />
              </div>
              <span className={`text-[10px] uppercase tracking-wider ${isCompleted ? 'text-white' : 'text-muted/50'}`}>
                {state.label}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-5xl mx-auto grid lg:grid-cols-2 gap-10">
      <div className="rounded-2xl bg-card p-8 md:p-12 shadow-soft text-center sm:text-left h-fit">
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

      <div className="space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-light text-white">Order History</h2>
          {orders.length > 0 && (
            <span className="text-xs uppercase tracking-widest text-muted bg-white/5 px-3 py-1 rounded-full">
              {orders.length} {orders.length === 1 ? "order" : "orders"}
            </span>
          )}
        </div>
        {ordersLoading ? (
          <div className="rounded-2xl bg-card p-8 flex flex-col items-center justify-center text-center h-48 border border-white/5">
            <div className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white/60 animate-spin mb-4" />
            <p className="text-muted font-light text-sm">Loading orders...</p>
          </div>
        ) : ordersError ? (
          <div className="rounded-2xl bg-card p-8 flex flex-col items-center justify-center text-center h-48 border border-red-500/10">
            <Package size={32} className="text-red-400/40 mb-4" />
            <p className="text-red-400/80 font-light text-sm">{ordersError}</p>
          </div>
        ) : orders.length === 0 ? (
           <div className="rounded-2xl bg-card p-8 flex flex-col items-center justify-center text-center h-48 border border-white/5">
              <Package size={32} className="text-muted/30 mb-4" />
              <p className="text-muted font-light">No orders yet.</p>
              <p className="text-xs text-muted/50 mt-2">Your purchases will appear here.</p>
           </div>
        ) : (
          orders.map((order, idx) => (
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: idx * 0.08 }}
              key={order.id}
              className="rounded-2xl bg-card p-6 border border-white/5 shadow-soft"
            >
              <div className="flex justify-between items-start mb-6">
                 <div>
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted">Order #{order.id}</p>
                    <p className="text-sm text-white/80 mt-1">
                      {new Date(order.orderDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                      {" "}•{" "}
                      <span className="text-muted/70">{order.paymentMethod}</span>
                    </p>
                 </div>
                 <div className="text-right">
                   <p className="text-xl text-white font-light">${Number(order.totalPrice).toFixed(2)}</p>
                   <p className="text-[10px] uppercase tracking-wider text-muted/50 mt-0.5">{order.status}</p>
                 </div>
              </div>
              {renderOrderTimeline(order.status)}
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default ProfilePage;
