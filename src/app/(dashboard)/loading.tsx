import { Loader2 } from "lucide-react"

export default function DashboardLoading() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in duration-700">
      <div className="p-4 rounded-full bg-zinc-900/50 border border-zinc-800 shadow-xl shadow-black/20">
        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
      </div>
      <p className="mt-4 text-[10px] font-black text-zinc-550 uppercase tracking-widest animate-pulse select-none">
        Loading...
      </p>
    </div>
  )
}
