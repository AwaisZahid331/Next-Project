export default function Loader({ label = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/90 px-4 py-3 shadow-xl">
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
        <span className="text-sm text-white/90">{label}</span>
      </div>
    </div>
  );
}


