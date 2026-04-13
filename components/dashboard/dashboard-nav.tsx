'use client'

import { useState } from 'react'
import { cn } from '@/lib/utils'
import { 
  LayoutDashboard, ClipboardCheck, Eye, AlertTriangle, 
  Shield, AlertOctagon, CheckSquare, ChevronLeft, ChevronRight,
  HardHat, Users, Car
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface NavItem {
  id: string
  label: string
  shortLabel: string
  icon: React.ElementType
  color: string
}

const navItems: NavItem[] = [
  { id: 'overview', label: 'Обзор', shortLabel: 'Обзор', icon: LayoutDashboard, color: 'text-primary' },
  { id: 'users', label: 'Сотрудники', shortLabel: 'Сотруд.', icon: Users, color: 'text-chart-2' },
  { id: 'production', label: 'Производственный контроль', shortLabel: 'ПК', icon: ClipboardCheck, color: 'text-chart-1' },
  { id: 'pab', label: 'Поведенческий аудит безопасности', shortLabel: 'ПАБ', icon: Eye, color: 'text-chart-2' },
  { id: 'hazards', label: 'Опасные действия/условия', shortLabel: 'ОД/ОУ', icon: AlertTriangle, color: 'text-chart-3' },
  { id: 'risks', label: 'Оценка рисков', shortLabel: 'Риски', icon: Shield, color: 'text-chart-5' },
  { id: 'incidents', label: 'Происшествия', shortLabel: 'Происш.', icon: AlertOctagon, color: 'text-chart-4' },
  { id: 'actions', label: 'Мероприятия', shortLabel: 'Мероп.', icon: CheckSquare, color: 'text-primary' },
  { id: 'ppe', label: 'СИЗиСО', shortLabel: 'СИЗиСО', icon: HardHat, color: 'text-chart-3' },
  { id: 'cars', label: 'Заказ авто', shortLabel: 'Авто', icon: Car, color: 'text-chart-5' },
]

interface DashboardNavProps {
  activeSection: string
  onSectionChange: (section: string) => void
}

export function DashboardNav({ activeSection, onSectionChange }: DashboardNavProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <TooltipProvider>
      <aside className={cn(
        'fixed left-0 top-0 h-screen bg-card border-r border-border z-20 transition-all duration-300',
        collapsed ? 'w-16' : 'w-56'
      )}>
        {/* Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                ВА
              </div>
              <span className="font-semibold text-sm">Витрина</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setCollapsed(!collapsed)}
          >
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        {/* Navigation */}
        <nav className="p-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            if (collapsed) {
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => onSectionChange(item.id)}
                      className={cn(
                        'w-full flex items-center justify-center h-10 rounded-lg transition-colors',
                        isActive 
                          ? 'bg-primary/10 text-primary' 
                          : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                      )}
                    >
                      <Icon className={cn('h-5 w-5', isActive && item.color)} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    {item.label}
                  </TooltipContent>
                </Tooltip>
              )
            }

            return (
              <button
                key={item.id}
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-3 h-10 rounded-lg transition-colors text-sm',
                  isActive 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <Icon className={cn('h-5 w-5 shrink-0', isActive && item.color)} />
                <span className="truncate">{item.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div className="absolute bottom-4 left-4 right-4">
            <div className="text-xs text-muted-foreground text-center">
              Витрина активности v1.0
            </div>
          </div>
        )}
      </aside>
    </TooltipProvider>
  )
}

// Mobile Navigation
export function DashboardMobileNav({ activeSection, onSectionChange }: DashboardNavProps) {
  return (
    <div className="lg:hidden sticky top-[73px] z-10 bg-background border-b border-border overflow-x-auto">
      <div className="flex gap-1 p-2 min-w-max">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeSection === item.id

          return (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={cn(
                'flex items-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm whitespace-nowrap',
                isActive 
                  ? 'bg-primary/10 text-primary font-medium' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              )}
            >
              <Icon className={cn('h-4 w-4', isActive && item.color)} />
              <span>{item.shortLabel}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
