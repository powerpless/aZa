'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { 
  ClipboardCheck, Eye, AlertTriangle, Shield, AlertOctagon, CheckSquare,
  TrendingUp, TrendingDown, Minus, Users, AlertCircle, Activity, HardHat, Car
} from 'lucide-react'
import { overviewData } from '@/lib/dashboard-data'

const iconMap = {
  ClipboardCheck,
  Eye,
  AlertTriangle,
  Shield,
  AlertOctagon,
  CheckSquare,
  HardHat,
  Users,
  Car,
}

export function OverviewSection() {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null)

  useEffect(() => {
    setLastUpdated(new Date().toLocaleString('ru-RU', { 
      day: 'numeric', 
      month: 'short', 
      hour: '2-digit', 
      minute: '2-digit' 
    }))
  }, [])
  return (
    <section className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold tracking-tight">
            Витрина активностей
          </h1>
          <p className="text-muted-foreground mt-1">
            Единый мониторинг всех модулей промышленной безопасности и охраны труда
          </p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-muted-foreground">Онлайн</span>
          </div>
          {lastUpdated && (
            <Badge variant="secondary" className="text-xs">
              Обновлено: {lastUpdated}
            </Badge>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-success/5 border-success/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Users className="h-4 w-4 text-success" />
              Общая активность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-success">
                {overviewData.totalEngagement.value}%
              </span>
              <span className={cn(
                'flex items-center text-sm',
                overviewData.totalEngagement.trend === 'up' ? 'text-success' : 'text-danger'
              )}>
                {overviewData.totalEngagement.trend === 'up' ? (
                  <TrendingUp className="h-4 w-4" />
                ) : (
                  <TrendingDown className="h-4 w-4" />
                )}
                {overviewData.totalEngagement.changePercent > 0 ? '+' : ''}
                {overviewData.totalEngagement.changePercent.toFixed(1)}%
              </span>
            </div>
            <Progress value={overviewData.totalEngagement.value} className="h-1.5 mt-2" />
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Вовлеченность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">
              {overviewData.modules.reduce((sum, m) => sum + m.value, 0).toLocaleString('ru-RU')}
            </div>
            <p className="text-xs text-muted-foreground mt-1">событий за период</p>
          </CardContent>
        </Card>

        <Card className="bg-rose-50 border-rose-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-rose-700" />
              Зоны риска
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-800">
              {overviewData.modules.reduce((sum, m) => sum + m.zeroDepartments, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">подразделений с нулевой активностью</p>
          </CardContent>
        </Card>
      </div>

      {/* Module Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {overviewData.modules.filter(m => m.id !== 'risks').map((module) => {
          const Icon = iconMap[module.icon as keyof typeof iconMap]
          const isPositive = module.trend.trend === 'up'
          const isNegative = module.trend.trend === 'down'
          // Для происшествий снижение — это хорошо
          const isGood = module.id === 'incidents' ? isNegative : isPositive

          return (
            <Card key={module.id} className="relative overflow-hidden group hover:border-primary/50 transition-colors">
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'flex items-center justify-center w-10 h-10 rounded-lg',
                      module.id === 'production' && 'bg-chart-1/20',
                      module.id === 'pab' && 'bg-chart-2/20',
                      module.id === 'hazards' && 'bg-chart-3/20',
                      module.id === 'risks' && 'bg-chart-5/20',
                      module.id === 'incidents' && 'bg-chart-4/20',
                      module.id === 'actions' && 'bg-primary/20',
                      module.id === 'ppe' && 'bg-chart-3/20',
                      module.id === 'users' && 'bg-chart-2/20',
                      module.id === 'cars' && 'bg-chart-5/20',
                    )}>
                      {Icon && <Icon className={cn(
                        'h-5 w-5',
                        module.id === 'production' && 'text-chart-1',
                        module.id === 'pab' && 'text-chart-2',
                        module.id === 'hazards' && 'text-chart-3',
                        module.id === 'risks' && 'text-chart-5',
                        module.id === 'incidents' && 'text-chart-4',
                        module.id === 'actions' && 'text-primary',
                        module.id === 'ppe' && 'text-chart-3',
                        module.id === 'users' && 'text-chart-2',
                        module.id === 'cars' && 'text-chart-5',
                      )} />}
                    </div>
                    <div>
                      <CardTitle className="text-sm font-medium">{module.name}</CardTitle>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="text-2xl font-bold tabular-nums">
                        {module.value.toLocaleString('ru-RU')}{(module as { isPercent?: boolean }).isPercent ? '%' : ''}
                      </span>
                      {module.id === 'production' && (
                        <p className="text-xs text-muted-foreground mt-0.5">записей создано</p>
                      )}
                    </div>
                    <span className={cn(
                      'flex items-center gap-1 text-sm',
                      isGood ? 'text-success' : !isPositive && !isNegative ? 'text-muted-foreground' : 'text-danger'
                    )}>
                      {isPositive ? <TrendingUp className="h-4 w-4" /> : 
                       isNegative ? <TrendingDown className="h-4 w-4" /> : 
                       <Minus className="h-4 w-4" />}
                      {module.trend.changePercent > 0 ? '+' : ''}{module.trend.changePercent.toFixed(1)}%
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Вовлеченность</span>
                      <span className="font-medium">{module.engagement}%</span>
                    </div>
                    <Progress value={module.engagement} className="h-1.5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </section>
  )
}
