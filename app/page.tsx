'use client'

import { useState, useCallback } from 'react'
import { DashboardHeader } from '@/components/dashboard/dashboard-header'
import { DashboardNav, DashboardMobileNav } from '@/components/dashboard/dashboard-nav'
import { OverviewSection } from '@/components/dashboard/overview-section'
import {
  ProductionControlSection,
  PABSection,
  HazardRegistrationSection,
  RiskAssessmentSection,
  IncidentsSection,
  ActionsSection,
} from '@/components/dashboard/module-sections'

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('overview')

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
  }, [])

  const handleRefresh = useCallback(() => {
    window.location.reload()
  }, [])

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <OverviewSection />
      case 'production':
        return <ProductionControlSection />
      case 'pab':
        return <PABSection />
      case 'hazards':
        return <HazardRegistrationSection />
      case 'risks':
        return <RiskAssessmentSection />
      case 'incidents':
        return <IncidentsSection />
      case 'actions':
        return <ActionsSection />
      default:
        return <OverviewSection />
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb]">
      {/* Desktop Sidebar Navigation */}
      <div className="hidden md:block">
        <DashboardNav activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      {/* Main Content Area */}
      <div className="ml-0 md:ml-64">
        <DashboardHeader
          onRefresh={handleRefresh}
          onFullscreen={handleFullscreen}
        />

        <main className="p-8 min-h-screen">
          {renderSection()}
        </main>
      </div>

      {/* Mobile Bottom Navigation */}
      <DashboardMobileNav activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* FAB Button */}
      <button
        className="fixed bottom-20 right-8 md:bottom-8 md:right-8 h-14 w-14 rounded-full bg-gradient-to-br from-[#002b73] to-[#0040a1] text-white flex items-center justify-center shadow-xl hover:scale-105 transition-transform z-40"
        aria-label="Create new"
      >
        <span className="material-symbols-outlined text-2xl">add</span>
      </button>
    </div>
  )
}
