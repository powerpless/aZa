'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { cn } from '@/lib/utils'
import { AlertCircle, TrendingUp, TrendingDown } from 'lucide-react'

interface TopListItem {
  id: string
  name?: string
  type?: string
  department?: string
  enterprise?: string
  count?: number
  value?: number
  percent?: number
  change?: number
}

interface TopListProps {
  title: string
  items: TopListItem[]
  maxItems?: number
  showProgress?: boolean
  showRank?: boolean
  className?: string
  emptyMessage?: string
  variant?: 'default' | 'compact' | 'detailed'
  valueLabel?: string
}

export function TopList({
  title,
  items,
  maxItems = 5,
  showProgress = false,
  showRank = true,
  className,
  emptyMessage = 'Нет данных',
  variant = 'default',
  valueLabel = '',
}: TopListProps) {
  const displayItems = items.slice(0, maxItems)
  const maxValue = Math.max(...displayItems.map(item => item.count ?? item.value ?? 0))

  if (displayItems.length === 0) {
    return (
      <Card className={className}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium">{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{emptyMessage}</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {displayItems.map((item, index) => {
          const displayValue = item.count ?? item.value ?? 0
          const displayName = item.name ?? item.type ?? ''
          const progressValue = maxValue > 0 ? (displayValue / maxValue) * 100 : 0

          return (
            <div key={item.id} className="space-y-1">
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  {showRank && (
                    <span className={cn(
                      'flex items-center justify-center w-5 h-5 rounded text-xs font-medium',
                      index === 0 ? 'bg-primary text-primary-foreground' :
                      index === 1 ? 'bg-primary/70 text-primary-foreground' :
                      index === 2 ? 'bg-primary/50 text-primary-foreground' :
                      'bg-muted text-muted-foreground'
                    )}>
                      {index + 1}
                    </span>
                  )}
                  <span className="truncate max-w-[180px]" title={displayName}>
                    {displayName}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium tabular-nums">
                    {displayValue.toLocaleString('ru-RU')}
                    {valueLabel && <span className="text-muted-foreground ml-1">{valueLabel}</span>}
                  </span>
                  {item.percent !== undefined && (
                    <Badge variant="secondary" className="text-xs">
                      {item.percent}%
                    </Badge>
                  )}
                  {item.change !== undefined && (
                    <span className={cn(
                      'flex items-center text-xs',
                      item.change > 0 ? 'text-success' : item.change < 0 ? 'text-danger' : 'text-muted-foreground'
                    )}>
                      {item.change > 0 ? <TrendingUp className="h-3 w-3" /> : item.change < 0 ? <TrendingDown className="h-3 w-3" /> : null}
                    </span>
                  )}
                </div>
              </div>
              {variant === 'detailed' && item.department && (
                <p className="text-xs text-muted-foreground ml-7">{item.department}</p>
              )}
              {showProgress && (
                <Progress value={progressValue} className="h-1.5" />
              )}
            </div>
          )
        })}
      </CardContent>
    </Card>
  )
}

interface ZeroActivityListProps {
  title: string
  items: { name: string; enterprise: string }[]
  className?: string
}

export function ZeroActivityList({ title, items, className }: ZeroActivityListProps) {
  if (items.length === 0) {
    return (
      <Card className={cn('border-success/30 bg-success/5', className)}>
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {title}
            <Badge variant="outline" className="text-success border-success/30">
              Все активны
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-success">Нет подразделений с нулевой активностью</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className={cn('border-danger/30 bg-danger/5', className)}>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-danger" />
          {title}
          <Badge variant="outline" className="text-danger border-danger/30">
            {items.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-sm">
            <span className="text-danger">{item.name}</span>
            <span className="text-muted-foreground text-xs">{item.enterprise}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
