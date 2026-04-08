import { Link } from "react-router-dom";

function formatPrice(value) {
  if (value == null) return "—";
  const n = Number(value);
  return Number.isFinite(n) ? `$${n.toFixed(2)}` : String(value);
}

export default function AlbumCard({ album }) {
  const id = album.id;
  const title = album.title ?? "";
  const artist = album.artist ?? "";
  const imageUrl = album.imageUrl;
  const price = album.price;

  return (
    <Link
      to={`/album/${id}`}
      className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-mist/20 focus-visible:ring-offset-2 focus-visible:ring-offset-void rounded-2xl"
    >
      <div className="rounded-2xl bg-card p-3 md:p-4 transition-transform duration-300 ease-out hover:-translate-y-0.5">
        <div className="relative aspect-square overflow-hidden rounded-xl bg-surface">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 ease-out will-change-transform group-hover:scale-[1.05]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted text-sm">No artwork</div>
          )}
        </div>
        <div className="mt-4 space-y-1.5 px-0.5">
          <p className="font-medium text-mist leading-snug line-clamp-2 text-[15px]">{title}</p>
          <p className="text-sm text-muted leading-snug line-clamp-1">{artist}</p>
          <p className="text-sm font-medium text-accent-silver pt-0.5">{formatPrice(price)}</p>
        </div>
      </div>
    </Link>
  );
}
