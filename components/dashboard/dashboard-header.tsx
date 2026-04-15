'use client'

interface DashboardHeaderProps {
  onRefresh?: () => void
  onFullscreen?: () => void
}

export function DashboardHeader({
  onRefresh,
  onFullscreen,
}: DashboardHeaderProps) {
  return (
    <header className="w-full h-16 sticky top-0 z-30 flex justify-between items-center px-8 bg-white/85 backdrop-blur-md border-b border-[#0040a1]/5">
      <div className="flex items-center gap-4">
        <span className="text-xl font-bold tracking-tighter text-[#002b73]">Safety Ecosystem Pulse</span>
      </div>
      <div className="flex items-center gap-6">
        {/* Search */}
        <div className="relative hidden lg:block">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 material-symbols-outlined text-sm">search</span>
          <input
            className="pl-10 pr-4 py-1.5 bg-[#e0e3e5] border-none rounded-xl text-sm focus:ring-2 focus:ring-[#002b73] focus:bg-white w-64 transition-all outline-none"
            placeholder="Scan intelligence..."
            type="text"
          />
        </div>
        {/* Icons */}
        <div className="flex items-center gap-4 text-slate-500">
          <button className="material-symbols-outlined cursor-pointer hover:text-[#002b73] transition-colors" title="Notifications" aria-label="Notifications">
            notifications
          </button>
          <button className="material-symbols-outlined cursor-pointer hover:text-[#002b73] transition-colors" title="Help" aria-label="Help">
            help
          </button>
          <button
            onClick={onFullscreen}
            className="material-symbols-outlined cursor-pointer hover:text-[#002b73] transition-colors"
            title="Toggle Fullscreen"
            aria-label="Toggle Fullscreen"
          >
            fullscreen
          </button>
          <div className="h-8 w-8 rounded-full bg-[#dae2ff] overflow-hidden border border-[#c3c6d4]/20 flex items-center justify-center">
            <span className="material-symbols-outlined text-[#002b73] text-sm">person</span>
          </div>
        </div>
      </div>
    </header>
  )
}
