import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axiosClient from "../api/axiosClient";
import { useCart } from "../context/CartContext";
import VinylLoader from "../components/VinylLoader";
import { motion } from "framer-motion";

function formatPrice(value) {
  if (value == null) return "—";
  const n = Number(value);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : String(value);
}

export default function AlbumDetail() {
  const { addToCart } = useCart();
  const { id } = useParams();
  const [album, setAlbum] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const handleAdd = async () => {
    try {
      await addToCart(album.id, 1);
      setNotice("Added to cart.");
      setTimeout(() => setNotice(""), 1500);
    } catch (err) {
      setNotice(err.response?.data || "Please login to add items.");
      setTimeout(() => setNotice(""), 1800);
    }
  };


  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axiosClient.get(`/api/albums/${id}`);
        setTimeout(() => {
          if (!cancelled) {
            setAlbum(res.data);
            setLoading(false);
          }
        }, 1200);
      } catch (err) {
        setTimeout(() => {
          if (!cancelled) {
            setError(err.response?.status === 404 ? "Album not found." : "Could not load this album.");
            setAlbum(null);
            setLoading(false);
          }
        }, 1200);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return <VinylLoader />;
  }

  if (error || !album) {
    return (
      <div className="max-w-md mx-auto text-center space-y-6 py-16 px-4">
        <p className="text-sm text-red-400/90 leading-relaxed">{error || "Something went wrong."}</p>
        <Link
          to="/"
          className="inline-block text-sm text-mist hover:text-white underline underline-offset-4 decoration-white/20"
        >
          Back to store
        </Link>
      </div>
    );
  }

  const tracks = (album.tracklist || "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }} className="max-w-5xl mx-auto space-y-12 px-0">
      <Link
        to="/"
        className="inline-flex text-sm text-muted hover:text-mist transition underline-offset-4 decoration-transparent hover:decoration-mist/30"
      >
        ← Back to store
      </Link>

      <div className="grid gap-12 lg:gap-16 lg:grid-cols-[minmax(0,380px)_1fr] items-start">
        <div className="overflow-hidden rounded-2xl bg-card shadow-soft lg:sticky lg:top-28">
          {album.imageUrl ? (
            <img src={album.imageUrl} alt={album.title} className="aspect-square w-full object-cover" />
          ) : (
            <div className="aspect-square flex items-center justify-center text-muted text-sm">No artwork</div>
          )}
        </div>

        <div className="rounded-2xl bg-card px-6 py-8 md:px-10 md:py-12 space-y-10 text-mist">
          <header className="space-y-3">
            <p className="text-[11px] uppercase tracking-[0.25em] text-muted">BadGenius</p>
            <h1 className="text-4xl md:text-5xl font-extralight tracking-tight text-white leading-[1.1]">
              {album.title}
            </h1>
            <p className="text-lg md:text-xl text-white/70 font-light">{album.artist}</p>
          </header>

          <dl className="grid gap-8 text-sm sm:grid-cols-2 border-t border-white/10 pt-10">
            <div className="space-y-2">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">Release year</dt>
              <dd className="text-lg text-white font-light">{album.releaseYear ?? "—"}</dd>
            </div>
            <div className="space-y-2">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">Genre</dt>
              <dd className="text-lg text-white font-light">{album.genre ?? "Rap"}</dd>
            </div>
            <div className="space-y-2 sm:col-span-2">
              <dt className="text-[11px] uppercase tracking-[0.2em] text-muted">Price</dt>
              <dd className="text-2xl font-light text-white">{formatPrice(album.price)}</dd>
            </div>
          </dl>

          {album.description && (
            <div className="space-y-3 border-t border-white/10 pt-10">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted">Description</h2>
              <p className="text-white/85 leading-relaxed font-light max-w-prose">{album.description}</p>
            </div>
          )}

          {tracks.length > 0 && (
            <div className="space-y-4 border-t border-white/10 pt-10">
              <h2 className="text-[11px] uppercase tracking-[0.2em] text-muted">Tracklist</h2>
              <ol className="list-decimal list-inside space-y-2.5 text-sm text-white/90 leading-relaxed font-light">
                {tracks.map((line, i) => (
                  <li key={i}>{line.replace(/^\d+\.\s*/, "")}</li>
                ))}
              </ol>
            </div>
          )}

          <button
            type="button"
            onClick={handleAdd}
            className="w-full sm:w-auto rounded-xl bg-white text-void font-semibold px-10 py-4 text-sm tracking-wide hover:bg-white/90 transition shadow-soft-sm"
          >
            Add to Cart
          </button>
          {notice && <p className="text-sm text-muted">{notice}</p>}
        </div>
      </div>
    </motion.div>
  );
}
