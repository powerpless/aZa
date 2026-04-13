'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import type { TrendData } from '@/lib/dashboard-data'

interface MetricCardProps {
  title: string
  value: number | string
  subtitle?: string
  trend?: TrendData
  unit?: string
  icon?: React.ReactNode
  className?: string
  size?: 'sm' | 'md' | 'lg'
  invertTrend?: boolean
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  unit = '',
  icon,
  className,
  size = 'md',
  invertTrend = false,
}: MetricCardProps) {
  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground'
    const isPositive = invertTrend ? trend.trend === 'down' : trend.trend === 'up'
    const isNegative = invertTrend ? trend.trend === 'up' : trend.trend === 'down'
    if (isPositive) return 'text-success'
    if (isNegative) return 'text-danger'
    return 'text-muted-foreground'
  }

  const TrendIcon = trend?.trend === 'up' ? TrendingUp : trend?.trend === 'down' ? TrendingDown : Minus

  return (
    <Card className={cn('relative overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className={cn(
          'font-medium text-muted-foreground',
          size === 'sm' ? 'text-xs' : size === 'lg' ? 'text-base' : 'text-sm'
        )}>
          {title}
        </CardTitle>
        {icon && (
          <div className="text-muted-foreground">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent>
        <div className={cn(
          'font-bold tabular-nums tracking-tight',
          size === 'sm' ? 'text-xl' : size === 'lg' ? 'text-4xl' : 'text-2xl'
        )}>
          {typeof value === 'number' ? value.toLocaleString('ru-RU') : value}
          {unit && <span className="text-muted-foreground text-lg ml-1">{unit}</span>}
        </div>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
        {trend && (
          <div className={cn('flex items-center gap-1 mt-1', getTrendColor())}>
            <TrendIcon className="h-4 w-4" />
            <span className="text-sm font-medium">
              {trend.changePercent > 0 ? '+' : ''}{trend.changePercent.toFixed(1)}%
            </span>
            <span className="text-xs text-muted-foreground ml-1">
              vs пред. период
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

interface CompactMetricProps {
  label: string
  value: number | string
  trend?: TrendData
  invertTrend?: boolean
}

export function CompactMetric({ label, value, trend, invertTrend = false }: CompactMetricProps) {
  const getTrendColor = () => {
    if (!trend) return 'text-muted-foreground'
    const isPositive = invertTrend ? trend.trend === 'down' : trend.trend === 'up'
    const isNegative = invertTrend ? trend.trend === 'up' : trend.trend === 'down'
    if (isPositive) return 'text-success'
    if (isNegative) return 'text-danger'
    return 'text-muted-foreground'
  }

  const TrendIcon = trend?.trend === 'up' ? TrendingUp : trend?.trend === 'down' ? TrendingDown : Minus

  return (
    <div className="space-y-1">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-xl font-bold tabular-nums">
          {typeof value === 'number' ? value.toLocaleString('ru-RU') : value}
        </span>
        {trend && (
          <span className={cn('flex items-center gap-0.5 text-xs', getTrendColor())}>
            <TrendIcon className="h-3 w-3" />
            {trend.changePercent > 0 ? '+' : ''}{trend.changePercent.toFixed(1)}%
          </span>
        )}
      </div>
    </div>
  )
}
