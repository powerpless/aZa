'use client'

import { cn } from '@/lib/utils'

interface NavItem {
  id: string
  label: string
  icon: string
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Overview', icon: 'dashboard' },
  { id: 'production', label: 'PC', icon: 'precision_manufacturing' },
  { id: 'pab', label: 'BBS', icon: 'visibility' },
  { id: 'hazards', label: 'Hazards', icon: 'warning' },
  { id: 'risks', label: 'Risks', icon: 'assessment' },
  { id: 'incidents', label: 'Incidents', icon: 'error' },
  { id: 'actions', label: 'Actions', icon: 'playlist_add_check' },
]

interface DashboardNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function DashboardNav({ activeSection, onSectionChange }: DashboardNavProps) {
  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-slate-50 flex flex-col py-6 px-4 z-40 border-r border-slate-200/50">
      {/* Brand */}
      <div className="mb-10 px-2">
        <h1 className="text-lg font-black text-[#002b73] tracking-tighter">Sentinel Ethos</h1>
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Precision Safety</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                'w-full flex items-center gap-3 px-3 py-2 transition-all duration-200 hover:translate-x-1',
                isActive
                  ? 'text-[#002b73] font-bold hover:bg-slate-200/50'
                  : 'text-slate-400 hover:bg-slate-200/50'
              )}
            >
              <span className="material-symbols-outlined text-xl">{item.icon}</span>
              <span className="text-xs font-bold uppercase tracking-widest">{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="mt-auto border-t border-slate-200/50 pt-4 space-y-1">
        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-200/50 transition-all">
          <span className="material-symbols-outlined">contact_support</span>
          <span className="text-xs font-bold uppercase tracking-widest">Support</span>
        </button>
        <button className="w-full flex items-center gap-3 px-3 py-2 text-slate-400 hover:bg-slate-200/50 transition-all">
          <span className="material-symbols-outlined">logout</span>
          <span className="text-xs font-bold uppercase tracking-widest">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}

// Mobile Bottom Navigation
export function DashboardMobileNav({ activeSection, onSectionChange }: DashboardNavProps) {
  const mobileItems = [
    { id: 'overview', label: 'Home', icon: 'dashboard' },
    { id: 'production', label: 'Stats', icon: 'monitoring' },
    { id: 'incidents', label: 'Alerts', icon: 'notifications' },
    { id: 'actions', label: 'Tasks', icon: 'playlist_add_check' },
  ]

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 h-16 bg-white/85 backdrop-blur-md flex justify-around items-center z-50 border-t border-slate-100">
      {mobileItems.map((item) => {
        const isActive = activeSection === item.id
        return (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              'flex flex-col items-center',
              isActive ? 'text-[#002b73]' : 'text-slate-400'
            )}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="text-[10px] font-bold uppercase tracking-widest">{item.label}</span>
          </button>
        )
      })}
    </nav>
  )
}
