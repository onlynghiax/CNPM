import { Link } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { motion } from "framer-motion";

function formatPrice(value) {
  if (value == null) return "—";
  const n = Number(value);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : String(value);
}

export default function AlbumCard({ album }) {
  const { addToCart } = useCart();
  const [notice, setNotice] = useState("");
  const id = album.id;
  const title = album.title ?? "";
  const artist = album.artist ?? "";
  const imageUrl = album.imageUrl;
  const price = album.price;

  const handleAdd = async () => {
    try {
      await addToCart(id, 1);
      setNotice("Added");
      setTimeout(() => setNotice(""), 1200);
    } catch (err) {
      setNotice(err.response?.data || "Login required");
      setTimeout(() => setNotice(""), 1500);
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
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.05]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted text-sm">No artwork</div>
          )}
        </div>
        </Link>
        <div className="mt-4 space-y-1.5 px-0.5">
          <p className="font-medium text-mist leading-snug line-clamp-2 text-[15px]">{title}</p>
          <p className="text-sm text-muted leading-snug line-clamp-1">{artist}</p>
          <p className="text-sm font-medium text-accent-silver pt-0.5">{formatPrice(price)}</p>
          <button
            type="button"
            onClick={handleAdd}
            className="mt-2 w-full rounded-lg bg-white/90 text-black py-2 text-sm font-medium hover:bg-white transition"
          >
            Add to Cart
          </button>
          {notice && <p className="text-xs text-muted pt-1">{notice}</p>}
        </div>
      </div>
    </motion.div>
  );
}
