'use client'

import { overviewData } from '@/lib/dashboard-data'

export function OverviewSection() {
  // Aggregate data for display
  const totalEvents = overviewData.modules.reduce((sum, m) => sum + m.value, 0)
  const avgEngagement = (
    overviewData.modules.reduce((sum, m) => sum + m.engagement, 0) / overviewData.modules.length
  ).toFixed(1)

  // Simulated weekly engagement data for bar chart
  const weeklyData = [
    { day: 'MON', value: 40 },
    { day: 'TUE', value: 55 },
    { day: 'WED', value: 35 },
    { day: 'THU', value: 85 },
    { day: 'FRI', value: 65 },
    { day: 'SAT', value: 95 },
  ]

  const barColors = [
    'bg-[#e0e3e5]',
    'bg-[#002b73]/40',
    'bg-[#002b73]/20',
    'bg-[#002b73]',
    'bg-[#002b73]/60',
    'bg-[#001848]',
  ]

  return (
    <>
      {/* Hero Summary Section */}
      <div className="mb-10 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-[#434652] mb-2">Operational Sentinel</p>
          <h2 className="text-4xl font-bold text-[#191c1e] tracking-tight">Ecosystem Intelligence</h2>
        </div>
        <div className="flex gap-8 items-center bg-white p-4 px-6 rounded-xl shadow-sm border border-[#c3c6d4]/10">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#434652]">Global Risk</p>
            <p className="text-2xl font-bold text-[#002b73] tracking-tighter">0.12%</p>
          </div>
          <div className="h-8 w-px bg-[#c3c6d4]/30"></div>
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-widest text-[#434652]">Active Nodes</p>
            <p className="text-2xl font-bold text-[#002b73] tracking-tighter">{totalEvents.toLocaleString()}</p>
          </div>
          <button className="bg-gradient-to-br from-[#002b73] to-[#0040a1] text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-widest shadow-md hover:shadow-lg transition-shadow">
            Export Report
          </button>
        </div>
      </div>

      {/* Metric Distribution Pie Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        {/* Risk Distribution Chart */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#c3c6d4]/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-[#191c1e] uppercase tracking-widest">Risk Distribution</h3>
            <span className="material-symbols-outlined text-slate-400">info</span>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="pie-chart pie-risk"></div>
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-[#002b73]"></div>
                  <span className="text-xs font-bold text-[#434652] uppercase tracking-wider">Critical</span>
                </div>
                <span className="text-xs font-black text-[#002b73]">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-[#0040a1]"></div>
                  <span className="text-xs font-bold text-[#434652] uppercase tracking-wider">Moderate</span>
                </div>
                <span className="text-xs font-black text-[#002b73]">30%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-[#b2c5ff]"></div>
                  <span className="text-xs font-bold text-[#434652] uppercase tracking-wider">Low Risk</span>
                </div>
                <span className="text-xs font-black text-[#002b73]">25%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Incident Breakdown Chart */}
        <div className="bg-white p-8 rounded-xl shadow-sm border border-[#c3c6d4]/5">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-sm font-bold text-[#191c1e] uppercase tracking-widest">Incident Breakdown</h3>
            <span className="material-symbols-outlined text-slate-400">filter_list</span>
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-10">
            <div className="pie-chart pie-incident"></div>
            <div className="flex-1 space-y-4 w-full">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-[#ba1a1a]"></div>
                  <span className="text-xs font-bold text-[#434652] uppercase tracking-wider">Unsafe Acts</span>
                </div>
                <span className="text-xs font-black text-[#002b73]">15%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-[#002b73]"></div>
                  <span className="text-xs font-bold text-[#434652] uppercase tracking-wider">Near Misses</span>
                </div>
                <span className="text-xs font-black text-[#002b73]">45%</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-sm bg-[#bbc6e2]"></div>
                  <span className="text-xs font-bold text-[#434652] uppercase tracking-wider">Resolved</span>
                </div>
                <span className="text-xs font-black text-[#002b73]">40%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Asymmetric Analytics Section */}
      <div className="asymmetric-grid mb-10">
        {/* Engagement Dynamics Chart */}
        <div className="bg-white rounded-xl shadow-sm border border-[#c3c6d4]/5 p-8 flex flex-col">
          <div className="mb-8">
            <h3 className="text-lg font-bold text-[#002b73] tracking-tight">Engagement Dynamics</h3>
            <p className="text-xs text-[#434652] font-medium">Weekly trend of safety participation</p>
          </div>
          <div className="flex-1 flex flex-col justify-between">
            <div className="flex items-end gap-2" style={{ height: '160px' }}>
              {weeklyData.map((item, i) => (
                <div key={item.day} className="flex-1 relative group" style={{ height: '100%', display: 'flex', alignItems: 'flex-end' }}>
                  <div
                    className={`${barColors[i]} rounded-t-sm transition-all duration-300 w-full`}
                    style={{ height: `${item.value}%` }}
                  ></div>
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-bold text-[#002b73]">
                    {item.value}%
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-4 text-[10px] font-bold text-[#434652] tracking-widest">
              {weeklyData.map((item) => (
                <span key={item.day}>{item.day}</span>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-[#c3c6d4]/10">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-[#434652] uppercase tracking-widest">Avg. Engagement</span>
              <span className="text-lg font-bold text-[#002b73]">{avgEngagement}%</span>
            </div>
          </div>
        </div>

        {/* Module Quick Stats Bento Stack */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c3c6d4]/5">
            <h3 className="text-sm font-bold text-[#191c1e] uppercase tracking-widest mb-1">PC Activity</h3>
            <p className="text-3xl font-bold text-[#002b73] tracking-tighter">
              42 <span className="text-xs text-slate-400 font-normal">Tasks/hr</span>
            </p>
            <div className="w-full bg-[#e0e3e5] h-1 mt-3 rounded-full overflow-hidden">
              <div className="bg-[#002b73] h-full w-[75%]"></div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm border border-[#c3c6d4]/5">
            <h3 className="text-sm font-bold text-[#191c1e] uppercase tracking-widest mb-1">Hazards Identified</h3>
            <p className="text-3xl font-bold text-[#ba1a1a] tracking-tighter">
              08 <span className="text-xs text-slate-400 font-normal">Open</span>
            </p>
            <div className="w-full bg-[#e0e3e5] h-1 mt-3 rounded-full overflow-hidden">
              <div className="bg-[#ba1a1a] h-full w-[20%]"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Silent Zones and Leaderboard */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Silent Zones */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-[#c3c6d4]/5 p-8">
          <div className="flex items-center gap-3 mb-8">
            <span className="material-symbols-outlined text-slate-300">bedtime</span>
            <h3 className="text-lg font-bold text-[#002b73] tracking-tight">Silent Zones</h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-100/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#191c1e]">Warehouse Sector C</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">No activity detected (48h)</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-lg border border-slate-100 cursor-pointer hover:bg-slate-100/50 transition-colors">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <p className="text-sm font-bold text-[#191c1e]">External Loading Dock</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">No activity detected (12h)</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-slate-300">chevron_right</span>
            </div>
          </div>
        </div>

        {/* Engagement Leaderboard */}
        <div className="xl:col-span-2 bg-white rounded-xl shadow-sm border border-[#c3c6d4]/5 p-8">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-lg font-bold text-[#002b73] tracking-tight">Engagement Leaderboard</h3>
            <span className="text-[10px] font-bold text-[#434652] uppercase tracking-widest">TOP NODES</span>
          </div>
          <div className="space-y-4">
            {[
              { rank: '01', icon: 'factory', name: 'Finishing Plant A', compliance: '99.8%', points: '1,420' },
              { rank: '02', icon: 'conveyor_belt', name: 'Assembly Line 04', compliance: '96.4%', points: '1,280' },
              { rank: '03', icon: 'inventory', name: 'Logistics Hub West', compliance: '94.1%', points: '1,150' },
            ].map((entry) => (
              <div key={entry.rank} className="flex items-center gap-4 group">
                <span className="text-xl font-black text-slate-200 group-hover:text-[#002b73] transition-colors">{entry.rank}</span>
                <div className="h-10 w-10 rounded-lg bg-[#d7e2ff] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#5a647c]">{entry.icon}</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[#191c1e]">{entry.name}</p>
                  <p className="text-[10px] text-[#434652] font-bold uppercase tracking-widest">{entry.compliance} Compliance</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-[#002b73]">{entry.points}</p>
                  <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tighter">Points</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
