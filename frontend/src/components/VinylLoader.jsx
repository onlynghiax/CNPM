import { Disc } from "lucide-react";

export default function VinylLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-20 space-y-4">
      <Disc className="animate-spin text-[#E5E5E5] w-12 h-12" strokeWidth={1} />
      <p className="text-[11px] text-mist tracking-[0.25em] uppercase font-light">Loading</p>
    </div>
  );
}
