import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

function formatPrice(value) {
  const n = Number(value || 0);
  return `$${n.toFixed(2)}`;
}

export default function CartPage() {
  const navigate = useNavigate();
  const { cart, refreshCart, updateQuantity, removeItem, checkout } = useCart();
  const [profile, setProfile] = useState({ fullName: "", phone: "", address: "" });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [placing, setPlacing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("Cash on Delivery");

  useEffect(() => {
    refreshCart();
    axiosClient.get("/api/users/profile").then((res) => {
      setProfile({
        fullName: res.data?.fullName || "",
        phone: res.data?.phone || "",
        address: res.data?.address || ""
      });
    });
  }, [refreshCart]);

  const onCheckout = async () => {
    setError("");
    setMessage("");
    if (!profile.fullName || !profile.address) {
      setError("Please complete your profile shipping details first.");
      return;
    }
    try {
      setPlacing(true);
      await checkout(paymentMethod);
      toast.success("Order placed successfully! Check your profile for updates.");
      setTimeout(() => navigate("/profile"), 1500);
    } catch (err) {
      setError(err.response?.data || "Checkout failed.");
    } finally {
      setPlacing(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }} className="max-w-5xl mx-auto space-y-8">
      <h1 className="text-4xl font-extralight text-white">Your Cart</h1>
      {(cart.items || []).length === 0 ? (
        <div className="rounded-2xl bg-card p-8 text-center space-y-4">
          <p className="text-muted">Your cart is empty.</p>
          <button className="px-6 py-3 rounded-xl bg-white text-black" onClick={() => navigate("/")}>
            Back to Store
          </button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-[1fr_340px] gap-6">
          <div className="space-y-4">
            {cart.items.map((item) => (
              <div key={item.id} className="rounded-2xl bg-card p-4 flex gap-4 items-center">
                <img src={item.imageUrl} alt="" className="h-20 w-20 rounded-lg object-cover" />
                <div className="flex-1">
                  <p className="text-white">{item.title}</p>
                  <p className="text-sm text-muted">{item.artist}</p>
                  <p className="text-sm text-accent-silver">{formatPrice(item.price)}</p>
                </div>
                <input
                  type="number"
                  min="1"
                  className="w-20 bg-void rounded-md px-2 py-1"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                />
                <button className="text-sm text-red-400 hover:text-red-300" onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="rounded-2xl bg-card p-6 space-y-5 h-fit">
            <h2 className="text-xl text-white font-light">Checkout</h2>
            <div className="text-sm text-muted space-y-1">
              <p>Name: {profile.fullName || "N/A"}</p>
              <p>Phone: {profile.phone || "N/A"}</p>
              <p>Address: {profile.address || "N/A"}</p>
            </div>
            <div className="border-t border-white/10 pt-4 space-y-3">
              <p className="text-sm text-white font-medium">Payment Method</p>
              <select
                className="w-full bg-void text-mist rounded-md px-3 py-2 border border-mist/20 outline-none"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
              >
                <option value="Cash on Delivery">Cash on Delivery</option>
                <option value="Credit Card">Credit Card</option>
                <option value="PayPal">PayPal</option>
              </select>
            </div>
            <div className="border-t border-white/10 pt-4 pb-2">
              <p className="text-sm text-muted">Order Summary</p>
              <div className="flex justify-between items-end mt-1">
                <span className="text-sm text-mist">{cart.items.length} Items</span>
                <span className="text-2xl text-white font-light">{formatPrice(cart.subtotal)}</span>
              </div>
            </div>
            <button
              onClick={onCheckout}
              disabled={placing}
              className="w-full px-5 py-3 rounded-xl bg-white text-black font-semibold hover:bg-white/90 transition"
            >
              {placing ? "Placing order..." : "Place Order"}
            </button>
            {error && <p className="text-red-400 text-sm">{error}</p>}
          </div>
        </div>
      )}
    </motion.div>
  );
}
