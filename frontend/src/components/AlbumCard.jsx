import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";

function formatPrice(value) {
  if (value == null) return "—";
  const n = Number(value);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : String(value);
}

export default function AlbumCard({ album }) {
  const { addToCart, isLoggedIn } = useCart();
  const [imgError, setImgError] = useState(false);
  const id = album.id;
  const title = album.title ?? "";
  const artist = album.artist ?? "";
  const imageUrl = album.imageUrl;
  const price = album.price;

  const handleAdd = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!isLoggedIn()) {
      toast.error("Please log in to add items.");
      return;
    }
    try {
      await addToCart(id, 1);
      toast.success("Added to cart!");
    } catch (err) {
      console.error("[AlbumCard] handleAdd failed:", err);
      // 401/403 toast is already shown by axiosClient interceptor
      if (!err.response?.status) {
        toast.error(err.message || "Failed to add to cart.");
      }
    }
  };

  const handleQuickAdd = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (!isLoggedIn()) {
      toast.error("Please log in to add items.");
      return;
    }
    try {
      await addToCart(id, 1);
      toast.success("Added to cart!");
    } catch (err) {
      console.error("[AlbumCard] handleQuickAdd failed:", err);
      if (!err.response?.status) {
        toast.error(err.message || "Failed to add to cart.");
      }
    }
  };

  return (
    <motion.div whileHover={{ scale: 1.05 }} className="group block rounded-2xl">
      <div className="rounded-2xl bg-card p-3 md:p-4 transition-transform duration-300 ease-out hover:-translate-y-0.5">
        <Link
          to={`/album/${id}`}
          className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-mist/20 focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-xl"
        >
        <div className="relative aspect-square overflow-hidden rounded-xl bg-surface">
          {imageUrl && !imgError ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.05]"
              onError={() => setImgError(true)}
            />
          ) : (
            <div className="flex flex-col h-full w-full items-center justify-center bg-[#0a0a0a] relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-black/60 to-white/5 opacity-50"></div>
              {/* Spinning Vinyl Placeholder */}
              <div className="w-24 h-24 rounded-full bg-[#111] border border-white/5 shadow-xl flex items-center justify-center relative animate-[spin_10s_linear_infinite]">
                <div className="absolute inset-1 rounded-full border border-white/10 shadow-[inset_0_0_10px_rgba(0,0,0,0.8)]"></div>
                <div className="absolute inset-3 rounded-full border border-white/5"></div>
                <div className="absolute inset-5 rounded-full border border-white/5"></div>
                <div className="absolute inset-7 rounded-full border border-white/5"></div>
                {/* Vinyl Label */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-mist/20 to-mist/10 flex items-center justify-center shadow-md border border-white/10">
                  <div className="w-2 h-2 bg-[#0a0a0a] rounded-full border border-black/50 shadow-inner"></div>
                </div>
              </div>
              <span className="mt-4 font-light tracking-[0.2em] uppercase text-[9px] text-white/30 z-10">No Artwork</span>
            </div>
          )}
        </div>
        </Link>
        <div className="mt-4 space-y-1.5 px-0.5">
          <div className="flex items-start justify-between gap-2">
            <p className="font-medium text-mist leading-snug line-clamp-2 text-[15px]">{title}</p>
            <motion.button
              whileTap={{ scale: 0.85 }}
              onClick={handleQuickAdd}
              className="mt-0.5 p-1.5 text-muted hover:text-white hover:bg-white/10 rounded-full transition-colors focus:outline-none flex-shrink-0 focus-visible:ring-2 focus-visible:ring-mist/30"
              title="Quick Add to Cart"
            >
              <ShoppingCart size={16} />
            </motion.button>
          </div>
          <p className="text-sm text-muted leading-snug line-clamp-1">{artist}</p>
          <p className="text-sm font-medium text-accent-silver pt-0.5">{formatPrice(price)}</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 w-full rounded-lg bg-white/90 text-black py-2 text-sm font-medium hover:bg-white transition"
          >
            Add to Cart
          </button>
          {/* notice removed – using toast instead */}
        </div>
      </div>
    </motion.div>
  );
}
