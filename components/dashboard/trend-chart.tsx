'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart'
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Line, LineChart, XAxis, YAxis, ResponsiveContainer, Legend, Cell } from 'recharts'
import { cn } from '@/lib/utils'

interface TrendChartProps {
  title: string
  data: Record<string, unknown>[]
  dataKeys: { key: string; label: string; color: string }[]
  xAxisKey?: string
  className?: string
  type?: 'area' | 'line' | 'bar'
  height?: number
  stacked?: boolean
}

export function TrendChart({
  title,
  data,
  dataKeys,
  xAxisKey = 'month',
  className,
  type = 'area',
  height = 200,
  stacked = false,
}: TrendChartProps) {
  const config = dataKeys.reduce((acc, { key, label, color }) => {
    acc[key] = { label, color }
    return acc
  }, {} as Record<string, { label: string; color: string }>)

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 10, right: 10, left: 0, bottom: 0 },
    }

    if (type === 'bar') {
      return (
        <BarChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
          <XAxis 
            dataKey={xAxisKey} 
            tickLine={false} 
            axisLine={false}
            tick={{ fontSize: 11 }}
            className="fill-muted-foreground"
          />
          <YAxis 
            tickLine={false} 
            axisLine={false}
            tick={{ fontSize: 11 }}
            className="fill-muted-foreground"
            width={40}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {dataKeys.map(({ key, color }) => (
            <Bar
              key={key}
              dataKey={key}
              fill={color}
              radius={[4, 4, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </BarChart>
      )
    }

    if (type === 'line') {
      return (
        <LineChart {...commonProps}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
          <XAxis 
            dataKey={xAxisKey} 
            tickLine={false} 
            axisLine={false}
            tick={{ fontSize: 11 }}
            className="fill-muted-foreground"
          />
          <YAxis 
            tickLine={false} 
            axisLine={false}
            tick={{ fontSize: 11 }}
            className="fill-muted-foreground"
            width={40}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          {dataKeys.map(({ key, color }) => (
            <Line
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              strokeWidth={2}
              dot={{ fill: color, strokeWidth: 0, r: 3 }}
              activeDot={{ r: 5 }}
            />
          ))}
        </LineChart>
      )
    }

    return (
      <AreaChart {...commonProps}>
        <defs>
          {dataKeys.map(({ key, color }) => (
            <linearGradient key={key} id={`gradient-${key}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity={0.3} />
              <stop offset="100%" stopColor={color} stopOpacity={0.05} />
            </linearGradient>
          ))}
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" vertical={false} />
        <XAxis 
          dataKey={xAxisKey} 
          tickLine={false} 
          axisLine={false}
          tick={{ fontSize: 11 }}
          className="fill-muted-foreground"
        />
        <YAxis 
          tickLine={false} 
          axisLine={false}
          tick={{ fontSize: 11 }}
          className="fill-muted-foreground"
          width={40}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        {dataKeys.map(({ key, color }) => (
          <Area
            key={key}
            type="monotone"
            dataKey={key}
            stroke={color}
            strokeWidth={2}
            fill={`url(#gradient-${key})`}
            stackId={stacked ? 'stack' : undefined}
          />
        ))}
      </AreaChart>
    )
  }

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-3">
          {dataKeys.map(({ key, label, color }) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
              <span className="text-xs text-muted-foreground">{label}</span>
            </div>
          ))}
        </div>
        <ChartContainer config={config} className="w-full" style={{ height }}>
          {renderChart()}
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

interface DistributionChartProps {
  title: string
  data: { name: string; value: number; color?: string }[]
  className?: string
  height?: number
  showLegend?: boolean
}

export function DistributionChart({
  title,
  data,
  className,
  height = 200,
  showLegend = true,
}: DistributionChartProps) {
  const colors = [
    'var(--chart-1)',
    'var(--chart-2)',
    'var(--chart-3)',
    'var(--chart-4)',
    'var(--chart-5)',
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  return (
    <Card className={className}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="w-full" style={{ height }}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" className="stroke-border/30" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis 
              type="category" 
              dataKey="name" 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 11 }}
              className="fill-muted-foreground"
              width={80}
            />
            <ChartTooltip 
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const value = payload[0].value as number
                  const percent = ((value / total) * 100).toFixed(1)
                  return (
                    <div className="bg-background border border-border rounded-lg px-3 py-2 shadow-lg">
                      <p className="text-sm font-medium">{payload[0].payload.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {value.toLocaleString('ru-RU')} ({percent}%)
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell key={entry.name} fill={entry.color || colors[index % colors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
        {showLegend && (
          <div className="flex flex-wrap gap-3 mt-3 pt-3 border-t border-border">
            {data.map((item, index) => (
              <div key={item.name} className="flex items-center gap-1.5">
                <div 
                  className="w-2.5 h-2.5 rounded-sm" 
                  style={{ backgroundColor: item.color || colors[index % colors.length] }} 
                />
                <span className="text-xs text-muted-foreground">
                  {item.name}: {item.value.toLocaleString('ru-RU')}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
