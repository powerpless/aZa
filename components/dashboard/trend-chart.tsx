'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ChartContainer, ChartTooltip } from '@/components/ui/chart'
import {
  Pie, PieChart, Cell, Label,
  Line, LineChart, Area, AreaChart, Bar, BarChart,
  XAxis, YAxis, CartesianGrid, ResponsiveContainer
} from 'recharts'
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
  type = 'line',
  height = 250,
  stacked = false,
}: TrendChartProps) {
  const config = dataKeys.reduce((acc, { key, label, color }) => {
    acc[key] = { label, color }
    return acc
  }, {} as Record<string, { label: string; color: string }>)

  const renderChart = () => {
    const commonProps = {
      data,
      margin: { top: 5, right: 10, left: 0, bottom: 5 },
    }

    const xAxisProps = {
      dataKey: xAxisKey,
      tick: { fontSize: 11, fill: '#434652' },
      tickLine: false,
      axisLine: false,
    }

    const yAxisProps = {
      tick: { fontSize: 11, fill: '#434652' },
      tickLine: false,
      axisLine: false,
      width: 40,
    }

    const gridProps = {
      strokeDasharray: '3 3',
      stroke: '#c3c6d420',
      vertical: false,
    }

    const tooltipContent = ({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) => {
      if (active && payload && payload.length) {
        return (
          <div className="bg-white border border-[#c3c6d4]/20 rounded-lg px-3 py-2 shadow-xl">
            <p className="text-xs font-bold text-[#191c1e] mb-1">{label}</p>
            {payload.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-xs text-[#434652]">
                  {config[item.name]?.label || item.name}: {Number(item.value).toLocaleString('ru-RU')}
                </span>
              </div>
            ))}
          </div>
        )
      }
      return null
    }

    if (type === 'area') {
      return (
        <AreaChart {...commonProps}>
          <CartesianGrid {...gridProps} />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <ChartTooltip content={tooltipContent} />
          {dataKeys.map(({ key, color }) => (
            <Area
              key={key}
              type="monotone"
              dataKey={key}
              stroke={color}
              fill={color}
              fillOpacity={0.15}
              strokeWidth={2}
              dot={false}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </AreaChart>
      )
    }

    if (type === 'bar') {
      return (
        <BarChart {...commonProps}>
          <CartesianGrid {...gridProps} />
          <XAxis {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <ChartTooltip content={tooltipContent} />
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

    // Default: line chart
    return (
      <LineChart {...commonProps}>
        <CartesianGrid {...gridProps} />
        <XAxis {...xAxisProps} />
        <YAxis {...yAxisProps} />
        <ChartTooltip content={tooltipContent} />
        {dataKeys.map(({ key, color }) => (
          <Line
            key={key}
            type="monotone"
            dataKey={key}
            stroke={color}
            strokeWidth={2}
            dot={{ r: 3, fill: color, strokeWidth: 0 }}
            activeDot={{ r: 5, fill: color, strokeWidth: 2, stroke: '#fff' }}
          />
        ))}
      </LineChart>
    )
  }

  return (
    <Card className={cn('shadow-sm border-[#c3c6d4]/10', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={config} className="w-full" style={{ height }}>
          {renderChart()}
        </ChartContainer>
        <div className="flex flex-wrap justify-center gap-4 mt-3 pt-3 border-t border-[#c3c6d4]/10">
          {dataKeys.map(({ key, label, color }) => (
            <div key={key} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
              <span className="text-xs text-[#434652]">{label}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

interface RadialProgressProps {
  value: number
  size?: number
  strokeWidth?: number
  color?: string
  className?: string
  showLabel?: boolean
  label?: string
}

export function RadialProgress({
  value,
  size = 52,
  strokeWidth = 5,
  color = 'var(--primary)',
  className,
  showLabel = true,
  label,
}: RadialProgressProps) {
  const radius = (size - strokeWidth) / 2
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (Math.min(value, 100) / 100) * circumference

  return (
    <div className={cn('relative shrink-0', className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#c3c6d4"
          strokeWidth={strokeWidth}
          opacity={0.2}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700 ease-out"
        />
      </svg>
      {showLabel && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="font-bold leading-none" style={{ fontSize: size * 0.24 }}>
            {label || `${value}%`}
          </span>
        </div>
      )}
    </div>
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
    '#002b73', '#0040a1', '#2c59ba', '#5a7fd4', '#85a0e0',
    '#b2c5ff', '#d7e2ff', '#434652', '#747784', '#bbc6e2',
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)

  const chartData = data.map((item, index) => ({
    ...item,
    fill: item.color || colors[index % colors.length],
  }))

  return (
    <Card className={cn('shadow-sm border-[#c3c6d4]/10', className)}>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={{}} className="w-full" style={{ height }}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={78}
              paddingAngle={4}
              dataKey="value"
              nameKey="name"
              cornerRadius={6}
              stroke="none"
              style={{ filter: 'drop-shadow(0 4px 12px rgba(0,43,115,0.08))' }}
            >
              {chartData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 6}
                          className="fill-[#191c1e] text-lg font-bold"
                        >
                          {total.toLocaleString('ru-RU')}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 12}
                          className="fill-[#434652] text-[10px]"
                        >
                          всего
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <ChartTooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const value = payload[0].value as number
                  const percent = ((value / total) * 100).toFixed(1)
                  return (
                    <div className="bg-white border border-[#c3c6d4]/20 rounded-lg px-3 py-2 shadow-xl">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ backgroundColor: String(payload[0].payload?.fill || '') }}
                        />
                        <span className="text-sm font-medium">{payload[0].payload.name}</span>
                      </div>
                      <p className="text-sm text-[#434652] mt-1">
                        {value.toLocaleString('ru-RU')} ({percent}%)
                      </p>
                    </div>
                  )
                }
                return null
              }}
            />
          </PieChart>
        </ChartContainer>
        {showLegend && (
          <div className="flex flex-wrap justify-center gap-3 mt-3 pt-3 border-t border-[#c3c6d4]/10">
            {chartData.map((item) => {
              const percent = ((item.value / total) * 100).toFixed(0)
              return (
                <div key={item.name} className="flex items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: item.fill }}
                  />
                  <span className="text-xs text-[#434652]">
                    {item.name}: {item.value.toLocaleString('ru-RU')} ({percent}%)
                  </span>
                </div>
              )
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
