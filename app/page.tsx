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
  PPESection,
  UsersSection,
  CarOrderSection,
} from '@/components/dashboard/module-sections'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

export default function DashboardPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isFullscreen, setIsFullscreen] = useState(false)

  const handleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen()
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }, [])

  const handleRefresh = useCallback(() => {
    // In a real app, this would trigger data refetch
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
      case 'ppe':
        return <PPESection />
      case 'users':
        return <UsersSection />
      case 'cars':
        return <CarOrderSection />
      default:
        return <OverviewSection />
    }
  }

  // Presentation mode - show all sections
  if (activeSection === 'overview') {
    return (
      <div className="min-h-screen bg-background">
        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <DashboardNav activeSection={activeSection} onSectionChange={setActiveSection} />
        </div>

        {/* Main Content */}
        <div className="lg:pl-56">
          <DashboardHeader 
            onRefresh={handleRefresh}
            onFullscreen={handleFullscreen}
          />
          
          {/* Mobile Navigation */}
          <DashboardMobileNav activeSection={activeSection} onSectionChange={setActiveSection} />

          <main className="p-4 lg:p-6 space-y-12">
            <OverviewSection />
            
            <Separator className="my-8" />
            
            <UsersSection />
            
            <Separator className="my-8" />
            
            <ProductionControlSection />
            
            <Separator className="my-8" />
            
            <PABSection />
            
            <Separator className="my-8" />
            
            <HazardRegistrationSection />
            
            <Separator className="my-8" />
            
            <RiskAssessmentSection />
            
            <Separator className="my-8" />
            
            <IncidentsSection />
            
            <Separator className="my-8" />
            
            <ActionsSection />

            <Separator className="my-8" />
            
            <PPESection />

            <Separator className="my-8" />
            
            <CarOrderSection />

            {/* Footer */}
            <footer className="pt-8 pb-4 text-center text-sm text-muted-foreground">
              <p>Витрина активностей — Мониторинг всех модулей</p>
              <p className="mt-1">
                Данные обновляются в реальном времени • {new Date().toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </footer>
          </main>
        </div>
      </div>
    )
  }

  // Individual section view
  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Navigation */}
      <div className="hidden lg:block">
        <DashboardNav activeSection={activeSection} onSectionChange={setActiveSection} />
      </div>

      {/* Main Content */}
      <div className="lg:pl-56">
        <DashboardHeader 
          onRefresh={handleRefresh}
          onFullscreen={handleFullscreen}
        />
        
        {/* Mobile Navigation */}
        <DashboardMobileNav activeSection={activeSection} onSectionChange={setActiveSection} />

        <main className="p-4 lg:p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  )
}
