'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MetricCard, CompactMetric } from './metric-card'
import { TopList, ZeroActivityList } from './top-list'
import { TrendChart, DistributionChart, RadialProgress } from './trend-chart'
import { cn } from '@/lib/utils'
import {
  ClipboardCheck, Eye, AlertTriangle, Shield, AlertOctagon, CheckSquare,
  TrendingUp, TrendingDown, Users, Building2, ChevronRight, HardHat, Star, Car
} from 'lucide-react'
import {
  productionControlData,
  pabData,
  hazardRegistrationData,
  riskData,
  incidentData,
  actionsData,
  ppeData,
  usersData,
  carOrderData,
} from '@/lib/dashboard-data'

// Modern pie chart colors
const pieColors = [
  '#002b73', '#0040a1', '#2c59ba', '#5a7fd4', '#85a0e0',
  '#b2c5ff', '#d7e2ff', '#434652', '#747784', '#bbc6e2',
]

// Mini pie chart component for enterprise distributions
function MiniPieChart({
  data,
  title,
  size = 120
}: {
  data: { name: string; value: number; color: string }[]
  title: string
  size?: number
}) {
  const total = data.reduce((sum, d) => sum + d.value, 0)
  let cumPercent = 0

  const gradientStops = data.map((d) => {
    const start = cumPercent
    const percent = (d.value / total) * 100
    cumPercent += percent
    return `${d.color} ${start}% ${cumPercent}%`
  }).join(', ')

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="rounded-full relative"
        style={{
          width: size,
          height: size,
          background: `conic-gradient(${gradientStops})`,
        }}
      >
        <div
          className="absolute bg-white rounded-full flex items-center justify-center"
          style={{
            inset: size * 0.22,
          }}
        >
          <span className="text-sm font-bold text-[#002b73]">{total}</span>
        </div>
      </div>
      <p className="text-xs font-bold text-[#434652] text-center">{title}</p>
    </div>
  )
}

// Section wrapper with soft blue styling
function SectionCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn(
      'bg-white/80 backdrop-blur-sm p-8 rounded-xl border border-[#c3c6d4]/10 shadow-sm',
      className
    )}>
      {children}
    </div>
  )
}

// Производственный контроль
export function ProductionControlSection() {
  const violationPieData = productionControlData.topViolations.map((v, i) => ({
    name: v.type,
    value: v.count,
    color: pieColors[i],
  }))

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#dae2ff]">
          <ClipboardCheck className="h-5 w-5 text-[#002b73]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#002b73]">Производственный контроль</h2>
          <p className="text-xs text-[#434652] font-medium">Проверки и выявленные нарушения</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Проверок проведено"
          value={productionControlData.total.value}
          subtitle="записей создано"
          trend={productionControlData.total}
          icon={<ClipboardCheck className="h-4 w-4" />}
        />
        <MetricCard
          title="Выявлено нарушений"
          value={productionControlData.violations.value}
          trend={productionControlData.violations}
          invertTrend
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <MetricCard
          title="Устранено"
          value={`${productionControlData.eliminationRate.value}%`}
          trend={productionControlData.eliminationRate}
          icon={<CheckSquare className="h-4 w-4" />}
        />
        <Card className="bg-[#fef2f2] border-[#fecaca]/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Нулевая активность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#ba1a1a]">
              {productionControlData.zeroDepartments.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">подразделений</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <TrendChart
          title="Динамика проверок и нарушений"
          data={productionControlData.trendData}
          dataKeys={[
            { key: 'checks', label: 'Проверки', color: 'var(--chart-1)' },
            { key: 'violations', label: 'Нарушения', color: 'var(--chart-4)' },
          ]}
          type="area"
          className="lg:col-span-2"
        />
        {/* PIE CHART: ТОП-5 типов нарушений */}
        <DistributionChart
          title="ТОП-5 типов нарушений"
          data={violationPieData}
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Исполнение плана графика по проверкам</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {productionControlData.byEnterprise.map((enterprise) => {
              const planValue = Math.round(enterprise.value * 1.2)
              const percent = Math.round((enterprise.value / planValue) * 100)
              return (
                <div key={enterprise.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{enterprise.name}</span>
                    <span className="text-muted-foreground">
                      {percent}% (план: {planValue} / факт: {enterprise.value})
                    </span>
                  </div>
                  <Progress value={percent} className="h-1.5" />
                </div>
              )
            })}
          </CardContent>
        </Card>
        <ZeroActivityList
          title="Нулевая активность"
          items={productionControlData.zeroDepartments}
        />
      </div>
    </section>
  )
}

// Поведенческий аудит безопасности
export function PABSection() {
  // Pie chart data for audit types
  const auditTypesPieData = [
    { name: 'На транспорте', value: 312, color: '#002b73' },
    { name: 'На объекте', value: 389, color: '#0040a1' },
    { name: 'На производстве', value: 191, color: '#b2c5ff' },
  ]

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#dcfce7]">
          <Eye className="h-5 w-5 text-[#005237]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#002b73]">Поведенческий аудит безопасности</h2>
          <p className="text-xs text-[#434652] font-medium">Выявление опасных действий и условий</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <MetricCard
          title="Аудитов проведено"
          value={pabData.total.value}
          trend={pabData.total}
          icon={<Eye className="h-4 w-4" />}
        />
        <MetricCard
          title="Опасных действий"
          value={pabData.hazardousActions.value}
          trend={pabData.hazardousActions}
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <MetricCard
          title="Опасных условий"
          value={pabData.hazardousConditions.value}
          trend={pabData.hazardousConditions}
          invertTrend
          icon={<AlertOctagon className="h-4 w-4" />}
        />
        <MetricCard
          title="Вовлеченность"
          value={`${pabData.engagement.value}%`}
          trend={pabData.engagement}
          icon={<Users className="h-4 w-4" />}
        />
        <Card className="bg-[#fef2f2] border-[#fecaca]/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Нулевая активность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#ba1a1a]">
              {pabData.zeroDepartments.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">подразделений</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* PIE CHART: Динамика аудитов по типам наблюдения */}
        <DistributionChart
          title="Динамика аудитов по типам наблюдения"
          data={auditTypesPieData}
        />
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Исполнение плана графика по аудитам</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {pabData.byEnterprise.map((enterprise) => {
              const planValue = Math.round(enterprise.value * 1.15)
              const percent = Math.round((enterprise.value / planValue) * 100)
              return (
                <div key={enterprise.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{enterprise.name}</span>
                    <span className="text-muted-foreground">
                      {percent}% (план: {planValue} / факт: {enterprise.value})
                    </span>
                  </div>
                  <Progress value={percent} className="h-1.5" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <TrendChart
          title="Динамика опасных ситуаций"
          data={pabData.trendData}
          dataKeys={[
            { key: 'actions', label: 'Опасные действия', color: 'var(--chart-4)' },
            { key: 'conditions', label: 'Опасные условия', color: 'var(--chart-3)' },
          ]}
          type="line"
          className="lg:col-span-2"
        />
        <TopList
          title="ТОП-5 опасных ситуаций"
          items={pabData.topViolations}
          showProgress
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <TopList
          title="ТОП подразделений по выявлениям"
          items={pabData.topDepartments.map(d => ({
            id: d.id,
            name: d.name,
            value: d.value,
            department: d.enterprise,
          }))}
          variant="detailed"
        />
        <TopList
          title="Рейтинг сотрудников по активности"
          items={pabData.topLeaders.map(l => ({
            id: l.id,
            name: l.name,
            value: l.count,
            department: l.department,
          }))}
          variant="detailed"
          valueLabel="аудитов"
        />
      </div>

      <ZeroActivityList
        title="Нулевая активность"
        items={pabData.zeroDepartments}
      />
    </section>
  )
}

// Регистрация опасных действий и условий
export function HazardRegistrationSection() {
  // Pie chart data for top actions
  const actionsPieData = hazardRegistrationData.topActions.map((a, i) => ({
    name: a.type,
    value: a.count,
    color: pieColors[i],
  }))

  // Pie chart data for top conditions
  const conditionsPieData = hazardRegistrationData.topConditions.map((c, i) => ({
    name: c.type,
    value: c.count,
    color: pieColors[i + 5], // offset colors for visual distinction
  }))

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#fef2f2]">
          <AlertTriangle className="h-5 w-5 text-[#ba1a1a]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#002b73]">Регистрация опасных действий и условий</h2>
          <p className="text-xs text-[#434652] font-medium">Выявление и фиксация опасностей сотрудниками</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Всего регистраций"
          value={hazardRegistrationData.total.value}
          trend={hazardRegistrationData.total}
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <MetricCard
          title="Вовлеченность"
          value={`${hazardRegistrationData.engagement.value}%`}
          trend={hazardRegistrationData.engagement}
          icon={<Users className="h-4 w-4" />}
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Активных участников
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {hazardRegistrationData.topUsers.reduce((sum, u) => sum + u.count, 0)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">за текущий месяц</p>
          </CardContent>
        </Card>
        <Card className="bg-[#fef2f2] border-[#fecaca]/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Нулевая активность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-[#ba1a1a]">
              {hazardRegistrationData.zeroDepartments.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">подразделений</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <TrendChart
          title="Динамика регистраций"
          data={hazardRegistrationData.trendData}
          dataKeys={[
            { key: 'actions', label: 'Опасные действия', color: 'var(--chart-4)' },
            { key: 'conditions', label: 'Опасные условия', color: 'var(--chart-3)' },
          ]}
          type="bar"
          stacked
          className="lg:col-span-2"
        />
        <TopList
          title="ТОП-3 пользователей за текущий квартал"
          items={hazardRegistrationData.topUsers.slice(0, 3).map(u => ({
            id: u.id,
            name: u.name,
            value: u.count,
            department: u.department,
          }))}
          variant="detailed"
          valueLabel="рег."
        />
      </div>

      {/* PIE CHARTS: ТОП-5 опасных действий и условий */}
      <div className="grid lg:grid-cols-3 gap-6">
        <DistributionChart
          title="ТОП-5 опасных действий"
          data={actionsPieData}
        />
        <DistributionChart
          title="ТОП-5 опасных условий"
          data={conditionsPieData}
        />
        <ZeroActivityList
          title="Нулевая активность"
          items={hazardRegistrationData.zeroDepartments}
        />
      </div>
    </section>
  )
}

// Оценка рисков
export function RiskAssessmentSection() {
  const riskColors = {
    high: '#e57373',
    medium: '#ffb74d',
    low: '#81c784',
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#f3e8ff]">
          <Shield className="h-5 w-5 text-[#6b21a8]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#002b73]">Оценка рисков</h2>
          <p className="text-xs text-[#434652] font-medium">Идентификация и управление рисками</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Всего рисков"
          value={riskData.total.value}
          trend={riskData.total}
          icon={<Shield className="h-4 w-4" />}
        />
        <Card className="border-danger/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-danger">Высокий риск</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-danger">{riskData.byCategory[0].value}</div>
            <Progress value={(riskData.byCategory[0].value / riskData.total.value) * 100} className="h-1.5 mt-2 [&>div]:bg-danger" />
          </CardContent>
        </Card>
        <Card className="border-warning/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-warning">Средний риск</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-warning">{riskData.byCategory[1].value}</div>
            <Progress value={(riskData.byCategory[1].value / riskData.total.value) * 100} className="h-1.5 mt-2 [&>div]:bg-warning" />
          </CardContent>
        </Card>
        <Card className="border-success/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-success">Низкий риск</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-success">{riskData.byCategory[2].value}</div>
            <Progress value={(riskData.byCategory[2].value / riskData.total.value) * 100} className="h-1.5 mt-2 [&>div]:bg-success" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <TrendChart
          title="Динамика выявления и митигации"
          data={riskData.trendData}
          dataKeys={[
            { key: 'identified', label: 'Выявлено', color: 'var(--chart-4)' },
            { key: 'mitigated', label: 'Митигировано', color: 'var(--chart-1)' },
          ]}
          type="area"
        />
        {/* PIE CHARTS: 5 pie charts per factory */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Распределение по предприятиям</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
              {riskData.byEnterprise.map((enterprise) => (
                <MiniPieChart
                  key={enterprise.name}
                  title={enterprise.name}
                  data={[
                    { name: 'Высокий', value: enterprise.high, color: riskColors.high },
                    { name: 'Средний', value: enterprise.medium, color: riskColors.medium },
                    { name: 'Низкий', value: enterprise.low, color: riskColors.low },
                  ]}
                  size={100}
                />
              ))}
            </div>
            <div className="flex justify-center gap-6 pt-4 mt-4 border-t border-[#c3c6d4]/10">
              <span className="flex items-center gap-1.5 text-xs text-[#434652]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: riskColors.high }} /> Высокий
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#434652]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: riskColors.medium }} /> Средний
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#434652]">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: riskColors.low }} /> Низкий
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Происшествия
export function IncidentsSection() {
  const incidentsByEnterprise = incidentData.byEnterprise.map((e, i) => ({
    name: e.name,
    value: e.value,
    color: ['#002b73', '#2c59ba', '#5a7fd4', '#85a0e0', '#b2c5ff'][i],
  }))

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#fef9c3]">
          <AlertOctagon className="h-5 w-5 text-[#854d0e]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#002b73]">Происшествия</h2>
          <p className="text-xs text-[#434652] font-medium">Регистрация и расследование происшествий</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Всего происшествий"
          value={incidentData.total.value}
          trend={incidentData.total}
          invertTrend
          icon={<AlertOctagon className="h-4 w-4" />}
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Статусы расследования происшествий
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-success">Завершено</span>
              <span className="font-medium">{incidentData.investigationStatus.completed}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-danger">Не завершено</span>
              <span className="font-medium">{incidentData.investigationStatus.inProgress + incidentData.investigationStatus.pending}</span>
            </div>
          </CardContent>
        </Card>
        <Card className="lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Категории
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {[
              { name: 'Смертельный случай', value: 0 },
              { name: 'Происшествия с потерей рабочих дней', value: 2 },
              { name: 'Авария', value: 3 },
              { name: 'ДТП', value: 5 },
              { name: 'Остальные', value: 13 },
            ].map((type) => (
              <div key={type.name} className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{type.name}</span>
                <span className="font-medium">{type.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <TrendChart
          title="Динамика происшествий"
          data={incidentData.trendData}
          dataKeys={[
            { key: 'incidents', label: 'Происшествия', color: 'var(--chart-4)' },
          ]}
          type="bar"
        />
        {/* Single pie chart: distribution across all factories */}
        <DistributionChart
          title="Распределение по предприятиям"
          data={incidentsByEnterprise}
        />
      </div>
    </section>
  )
}

// Мероприятия
export function ActionsSection() {
  const completionRate = Math.round((actionsData.completed.value / actionsData.assigned.value) * 100)
  const actionColors = ['#002b73', '#0040a1', '#2c59ba', '#5a7fd4', '#85a0e0']

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#dae2ff]">
          <CheckSquare className="h-5 w-5 text-[#002b73]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#002b73]">Мероприятия</h2>
          <p className="text-xs text-[#434652] font-medium">Корректирующие и предупреждающие действия</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Назначено"
          value={actionsData.assigned.value}
          trend={actionsData.assigned}
          icon={<CheckSquare className="h-4 w-4" />}
        />
        <MetricCard
          title="Выполнено"
          value={actionsData.completed.value}
          trend={actionsData.completed}
          icon={<CheckSquare className="h-4 w-4" />}
        />
        <MetricCard
          title="Просрочено"
          value={actionsData.overdue.value}
          trend={actionsData.overdue}
          invertTrend
          icon={<AlertTriangle className="h-4 w-4" />}
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              На согласовании
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate}%</div>
            <Progress value={completionRate} className="h-2 mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <TrendChart
          title="Динамика мероприятий"
          data={actionsData.trendData}
          dataKeys={[
            { key: 'assigned', label: 'Назначено', color: 'var(--chart-2)' },
            { key: 'completed', label: 'Выполнено', color: 'var(--chart-1)' },
            { key: 'overdue', label: 'Просрочено', color: 'var(--chart-4)' },
          ]}
          type="line"
        />
        {/* PIE CHARTS: По предприятиям */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">По предприятиям</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
              {actionsData.byEnterprise.map((enterprise, i) => (
                <MiniPieChart
                  key={enterprise.name}
                  title={enterprise.name}
                  data={[
                    { name: 'Выполнено', value: enterprise.completed, color: actionColors[i] },
                    { name: 'Просрочено', value: enterprise.overdue, color: '#ba1a1a' },
                    { name: 'В работе', value: enterprise.assigned - enterprise.completed - enterprise.overdue, color: '#e0e3e5' },
                  ]}
                  size={100}
                />
              ))}
            </div>
            <div className="flex justify-center gap-6 pt-4 mt-4 border-t border-[#c3c6d4]/10">
              <span className="flex items-center gap-1.5 text-xs text-[#434652]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#002b73]" /> Выполнено
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#434652]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ba1a1a]" /> Просрочено
              </span>
              <span className="flex items-center gap-1.5 text-xs text-[#434652]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#e0e3e5]" /> В работе
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// СИЗиСО - Средства индивидуальной защиты и спецодежда
export function PPESection() {
  const getStatusIcon = (status: 'normal' | 'attention' | 'risk') => {
    switch (status) {
      case 'normal': return '🟢'
      case 'attention': return '🟡'
      case 'risk': return '🔴'
    }
  }

  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#dae2ff]">
          <HardHat className="h-5 w-5 text-[#002b73]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#002b73]">СИЗиСО</h2>
          <p className="text-xs text-[#434652] font-medium">Средства индивидуальной защиты и спецодежда</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          title="Обеспеченность"
          value={`${ppeData.overallProvision.value}%`}
          trend={ppeData.overallProvision}
          icon={<HardHat className="h-4 w-4" />}
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Сотрудники</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{ppeData.totalUsers.current}/{ppeData.totalUsers.total}</div>
            <p className="text-xs text-muted-foreground mt-1">{ppeData.totalUsers.percent}% сотрудников в ЛК</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <DistributionChart title="Структура выдачи СИЗиСО" data={ppeData.byType} />
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Обеспеченность по типам СИЗиСО</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {ppeData.provision.map((item) => {
              const statusColorMap = { normal: 'var(--success)', attention: 'var(--warning)', risk: 'var(--danger)' }
              return (
                <div key={item.name} className="flex items-center gap-3 text-sm">
                  <RadialProgress value={item.percent} size={36} strokeWidth={3.5} color={statusColorMap[item.status]} />
                  <span className="flex-1">{item.name}</span>
                  <span className="text-xs">{item.trend === 'up' ? '↑' : '↓'}</span>
                </div>
              )
            })}
            <div className="flex gap-4 pt-3 text-xs text-muted-foreground border-t mt-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> норма (90-100%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> внимание (75-89%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger" /> риск (0-74%)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-chart-3" />
              <CardTitle className="text-sm font-medium">Рейтинг обеспеченности по предприятиям</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {ppeData.byEnterprise.map((enterprise, idx) => {
              const statusColorMap = { normal: 'var(--success)', attention: 'var(--warning)', risk: 'var(--danger)' }
              return (
                <div key={enterprise.name} className="flex items-center gap-4">
                  <RadialProgress value={enterprise.percent} size={52} color={statusColorMap[enterprise.status]} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">{idx + 1}</span>
                        <span className="text-sm font-medium">{enterprise.name}</span>
                      </div>
                      <span className="w-4 h-4 flex items-center justify-center text-xs">{getStatusIcon(enterprise.status)}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-danger" />
              <CardTitle className="text-sm font-medium">Дефицит СИЗиСО</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {ppeData.deficit.map((item, idx) => (
                <div key={item.name} className="flex items-center justify-between text-sm py-1 border-b border-border last:border-0">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-danger/10 text-danger flex items-center justify-center text-xs font-medium">{idx + 1}</span>
                    <span className="truncate max-w-[200px]">{item.name}</span>
                  </div>
                  <span className="font-medium text-danger">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">Количество недостающих единиц СИЗиСО по обеспеченности</p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Сотрудники
export function UsersSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#dcfce7]">
          <Users className="h-5 w-5 text-[#005237]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#002b73]">Сотрудники</h2>
          <p className="text-xs text-[#434652] font-medium">Статистика по пользователям Личного кабинета</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData.total.current}/{usersData.total.all}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">({usersData.total.percent}%)</span>
              <span className={cn('text-xs font-medium', usersData.total.change > 0 ? 'text-success' : 'text-danger')}>
                {usersData.total.change > 0 ? '+' : ''}{usersData.total.change}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Активные</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData.active.current}/{usersData.active.total}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">({usersData.active.percent}%)</span>
              <span className={cn('text-xs font-medium', usersData.active.change > 0 ? 'text-success' : 'text-danger')}>
                {usersData.active.change > 0 ? '+' : ''}{usersData.active.change}
              </span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Лидер по количеству</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData.leader.value} ({usersData.leader.percent}%)</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">{usersData.leader.name}</span>
              <span className="text-xs font-medium text-success">+{usersData.leader.change}</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Новые</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{usersData.newUsers.value}/{usersData.newUsers.total}</div>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-xs text-muted-foreground">за период</span>
              <span className="text-xs font-medium text-success">+{usersData.newUsers.change}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-chart-3" />
              <CardTitle className="text-sm font-medium">ТОП по количеству пользователей</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {usersData.byEnterprise.map((enterprise, idx) => (
              <div key={enterprise.name} className="flex items-center gap-4">
                <RadialProgress value={enterprise.percent} size={52} color="var(--primary)" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs font-medium">{idx + 1}</span>
                      <span className="text-sm font-medium">{enterprise.name}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{enterprise.users} / {enterprise.total}</span>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <HardHat className="h-4 w-4 text-primary" />
              <CardTitle className="text-sm font-medium">ТОП популярных модулей</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-1 max-h-[300px] overflow-y-auto">
              {usersData.popularModules.map((module, idx) => {
                const maxVisits = usersData.popularModules[0].visits
                return (
                  <div key={module.name} className="flex items-center gap-2 text-sm py-1">
                    <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-medium shrink-0">{idx + 1}</span>
                    <span className="w-24 shrink-0">{module.name}</span>
                    <div className="flex-1">
                      <div className="h-2 rounded bg-primary/70" style={{ width: `${(module.visits / maxVisits) * 100}%` }} />
                    </div>
                    <span className="font-medium w-12 text-right">{module.visits}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-chart-3" />
            <CardTitle className="text-sm font-medium">Среднее количество входов активных пользователей</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-3 gap-4">
            {usersData.avgLogins.map((enterprise, idx) => (
              <div key={enterprise.name} className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">{idx + 1}</span>
                  <span className="font-medium">{enterprise.name}</span>
                </div>
                <div className="text-3xl font-bold text-primary">{enterprise.value}</div>
                <p className="text-xs text-muted-foreground mt-1">входов на пользователя</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

// Заказ авто
export function CarOrderSection() {
  return (
    <section className="space-y-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#fef2f2]">
          <Car className="h-5 w-5 text-[#ba1a1a]" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-[#002b73]">Заказ авто</h2>
          <p className="text-xs text-[#434652] font-medium">Статистика по заявкам на автотранспорт</p>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего заявок</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carOrderData.totalOrders.value}</div>
            <span className={cn('text-xs font-medium', carOrderData.totalOrders.change > 0 ? 'text-success' : 'text-danger')}>
              {carOrderData.totalOrders.change > 0 ? '+' : ''}{carOrderData.totalOrders.change}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Всего авто</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carOrderData.totalCars.value}</div>
            <span className={cn('text-xs font-medium', carOrderData.totalCars.change > 0 ? 'text-success' : carOrderData.totalCars.change < 0 ? 'text-danger' : 'text-muted-foreground')}>
              {carOrderData.totalCars.change > 0 ? '+' : ''}{carOrderData.totalCars.change}
            </span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Загрузка парка</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carOrderData.fleetLoad.value}%</div>
            <span className="text-xs font-medium text-success">+{carOrderData.fleetLoad.change}%</span>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Среднее время поездок</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{carOrderData.avgTripTime.value}</div>
            <span className="text-xs text-muted-foreground">{carOrderData.avgTripTime.change}</span>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Структура автопарка</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {carOrderData.fleetStructure.map((item) => (
              <div key={item.type} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.type}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{item.count} ед.</span>
                    <span className="font-medium">Загрузка {item.load}%</span>
                  </div>
                </div>
                <Progress value={item.load} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-chart-3" />
              <CardTitle className="text-sm font-medium">Рейтинг водителей</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            {carOrderData.topDrivers.map((driver) => (
              <div key={driver.name} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-chart-3 font-medium">{'★'.repeat(Math.floor(driver.rating))}</span>
                  <span className="font-medium">{driver.rating}</span>
                  <span>{driver.name}</span>
                </div>
                <div className="text-muted-foreground">{driver.trips} поездок</div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Количество заказов по предприятиям</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {carOrderData.byEnterprise.map((enterprise) => (
              <div key={enterprise.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{enterprise.name}</span>
                  <span className="font-medium">{enterprise.orders} заявок</span>
                </div>
                <Progress value={(enterprise.orders / carOrderData.totalOrders.value) * 100} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Загрузка парка по предприятиям</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {carOrderData.byEnterprise.map((enterprise) => (
              <div key={enterprise.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{enterprise.name}</span>
                  <span className="font-medium">{enterprise.load}%</span>
                </div>
                <Progress value={enterprise.load} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
