import { useCallback, useEffect, useMemo, useState } from "react";
import axiosClient from "../api/axiosClient";
import AlbumCard from "../components/AlbumCard";

const RAPPERS = [
  "All",
  "Kendrick Lamar",
  "Travis Scott",
  "Drake",
  "Kanye West",
  "Eminem",
  "24kGoldn",
  "Jay-Z",
  "Nas",
  "Dr. Dre",
  "Đen Vâu"
];

export default function MusicStore() {
  const [albums, setAlbums] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [debouncedQ, setDebouncedQ] = useState("");
  const [artist, setArtist] = useState("All");

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQ(q.trim()), 350);
    return () => clearTimeout(t);
  }, [q]);

  const fetchAlbums = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (artist && artist !== "All") params.artist = artist;
      if (debouncedQ) params.q = debouncedQ;
      const res = await axiosClient.get("/api/albums", { params });
      setAlbums(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Could not load albums.");
      setAlbums([]);
    } finally {
      setLoading(false);
    }
  }, [artist, debouncedQ]);

  useEffect(() => {
    fetchAlbums();
  }, [fetchAlbums]);

  const tabs = useMemo(
    () =>
      RAPPERS.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => setArtist(name)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            artist === name ? "text-white bg-white/10" : "text-muted hover:text-mist"
          }`}
        >
          {name}
        </button>
      )),
    [artist]
  );

  return (
    <div className="max-w-6xl mx-auto space-y-14 md:space-y-16">
      <header className="text-center space-y-8 max-w-2xl mx-auto px-2">
        <div className="space-y-4">
          <p className="text-[11px] uppercase tracking-[0.35em] text-muted">BadGenius</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extralight tracking-tight text-white leading-[1.05]">
            Rap Exclusive Catalog
          </h1>
          <p className="text-sm md:text-base text-muted leading-relaxed font-light">
            Curated hip-hop albums—filter by rapper or search by title.
          </p>
        </div>
        <div className="max-w-md mx-auto pt-2">
          <label className="sr-only" htmlFor="store-search">
            Search albums
          </label>
          <input
            id="store-search"
            type="search"
            placeholder="Search albums or rappers..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full bg-transparent py-3 text-center text-mist placeholder:text-muted/60 outline-none border-0 border-b border-white/10 focus:border-white/25 transition-colors text-base font-light"
          />
        </div>
        <div className="pt-4">
          <p className="text-[11px] uppercase tracking-[0.25em] text-muted mb-4">Rappers</p>
          <div className="flex flex-wrap justify-center gap-2">{tabs}</div>
        </div>
      </header>

      {error && (
        <p className="text-sm text-red-400/90 text-center leading-relaxed max-w-lg mx-auto">{String(error)}</p>
      )}
      {loading && <p className="text-sm text-muted text-center">Loading...</p>}

      {!loading && !error && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
          {albums.map((a) => (
            <AlbumCard key={a.id} album={a} />
          ))}
        </div>
      )}

      {!loading && !error && albums.length === 0 && (
        <p className="text-sm text-muted text-center">No albums match your filters.</p>
      )}
    </div>
  );
}
