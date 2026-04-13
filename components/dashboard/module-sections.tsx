'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { MetricCard, CompactMetric } from './metric-card'
import { TopList, ZeroActivityList } from './top-list'
import { TrendChart, DistributionChart } from './trend-chart'
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

// Производственный контроль
export function ProductionControlSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-chart-1/20">
          <ClipboardCheck className="h-5 w-5 text-chart-1" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Производственный контроль</h2>
          <p className="text-sm text-muted-foreground">Проверки и выявленные нарушения</p>
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
        <Card className="bg-rose-50 border-rose-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Нулевая активность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-800">
              {productionControlData.zeroDepartments.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">подразделений</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
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
        <TopList
          title="ТОП-5 типов нарушений"
          items={productionControlData.topViolations}
          showProgress
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
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-chart-2/20">
          <Eye className="h-5 w-5 text-chart-2" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Поведенческий аудит безопасности</h2>
          <p className="text-sm text-muted-foreground">Выявление опасных действий и условий</p>
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
        <Card className="bg-rose-50 border-rose-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Нулевая активность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-800">
              {pabData.zeroDepartments.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">подразделений</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Динамика аудитов по типам наблюдения</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { name: 'На транспорте', value: 312, percent: 35 },
              { name: 'На объекте', value: 389, percent: 44 },
              { name: 'На производстве', value: 191, percent: 21 },
            ].map((item) => (
              <div key={item.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{item.name}</span>
                  <span className="text-muted-foreground">{item.value} ({item.percent}%)</span>
                </div>
                <Progress value={item.percent} className="h-1.5" />
              </div>
            ))}
          </CardContent>
        </Card>
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

      <div className="grid lg:grid-cols-3 gap-4">
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
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-chart-3/20">
          <AlertTriangle className="h-5 w-5 text-chart-3" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Регистрация опасных действий и условий</h2>
          <p className="text-sm text-muted-foreground">Выявление и фиксация опасностей сотрудниками</p>
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
        <Card className="bg-rose-50 border-rose-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Нулевая активность
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-800">
              {hazardRegistrationData.zeroDepartments.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">подразделений</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-4">
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

      <div className="grid lg:grid-cols-3 gap-4">
        <TopList
          title="ТОП-5 опасных действий"
          items={hazardRegistrationData.topActions}
          showProgress
        />
        <TopList
          title="ТОП-5 опасных условий"
          items={hazardRegistrationData.topConditions}
          showProgress
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
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-chart-5/20">
          <Shield className="h-5 w-5 text-chart-5" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Оценка рисков</h2>
          <p className="text-sm text-muted-foreground">Идентификация и управление рисками</p>
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

      <div className="grid lg:grid-cols-2 gap-4">
        <TrendChart
          title="Динамика выявления и митигации"
          data={riskData.trendData}
          dataKeys={[
            { key: 'identified', label: 'Выявлено', color: 'var(--chart-4)' },
            { key: 'mitigated', label: 'Митигировано', color: 'var(--chart-1)' },
          ]}
          type="area"
        />
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Распределение по предприятиям</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {riskData.byEnterprise.map((enterprise) => (
              <div key={enterprise.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span>{enterprise.name}</span>
                  <span className="text-muted-foreground">
                    {enterprise.high + enterprise.medium + enterprise.low}
                  </span>
                </div>
                <div className="flex h-2 rounded-full overflow-hidden bg-muted">
                  <div
                    className="bg-danger"
                    style={{ width: `${(enterprise.high / (enterprise.high + enterprise.medium + enterprise.low)) * 100}%` }}
                  />
                  <div
                    className="bg-warning"
                    style={{ width: `${(enterprise.medium / (enterprise.high + enterprise.medium + enterprise.low)) * 100}%` }}
                  />
                  <div
                    className="bg-success"
                    style={{ width: `${(enterprise.low / (enterprise.high + enterprise.medium + enterprise.low)) * 100}%` }}
                  />
                </div>
              </div>
            ))}
            <div className="flex gap-4 pt-2 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-danger" /> Высокий</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-warning" /> Средний</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded bg-success" /> Низкий</span>
            </div>
          </CardContent>
        </Card>
      </div>

    </section>
  )
}

// Происшествия
export function IncidentsSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-chart-4/20">
          <AlertOctagon className="h-5 w-5 text-chart-4" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Происшествия</h2>
          <p className="text-sm text-muted-foreground">Регистрация и расследование происшествий</p>
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

      <div className="grid lg:grid-cols-2 gap-4">
        <TrendChart
          title="Динамика происшествий"
          data={incidentData.trendData}
          dataKeys={[
            { key: 'incidents', label: 'Происшествия', color: 'var(--chart-4)' },
          ]}
          type="bar"
        />
        <DistributionChart
          title="Распределение по предприятиям"
          data={incidentData.byEnterprise}
        />
      </div>
    </section>
  )
}

// Мероприятия
export function ActionsSection() {
  const completionRate = Math.round((actionsData.completed.value / actionsData.assigned.value) * 100)

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
          <CheckSquare className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Мероприятия</h2>
          <p className="text-sm text-muted-foreground">Корректирующие и предупреждающие действия</p>
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

      <div className="grid lg:grid-cols-2 gap-4">
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
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">По предприятиям</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {actionsData.byEnterprise.map((enterprise) => {
              const rate = Math.round((enterprise.completed / enterprise.assigned) * 100)
              return (
                <div key={enterprise.name} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span>{enterprise.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground text-xs">
                        {enterprise.completed}/{enterprise.assigned}
                      </span>
                      {enterprise.overdue > 0 && (
                        <Badge variant="outline" className="text-danger border-danger/30 text-xs">
                          {enterprise.overdue} просрочено
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Progress value={rate} className="h-1.5" />
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>

    </section>
  )
}

// СИЗиСО - Средства индивидуальной защиты и спецодежда
export function PPESection() {
  const getStatusColor = (status: 'normal' | 'attention' | 'risk') => {
    switch (status) {
      case 'normal': return 'text-success'
      case 'attention': return 'text-warning'
      case 'risk': return 'text-danger'
    }
  }

  const getStatusBg = (status: 'normal' | 'attention' | 'risk') => {
    switch (status) {
      case 'normal': return 'bg-success'
      case 'attention': return 'bg-warning'
      case 'risk': return 'bg-danger'
    }
  }

  const getStatusIcon = (status: 'normal' | 'attention' | 'risk') => {
    switch (status) {
      case 'normal': return '🟢'
      case 'attention': return '🟡'
      case 'risk': return '🔴'
    }
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/20">
          <HardHat className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">СИЗиСО</h2>
          <p className="text-sm text-muted-foreground">Средства индивидуальной защиты и спецодежда</p>
        </div>
      </div>

      {/* Основные метрики */}
      <div className="grid grid-cols-2 gap-4">
        <MetricCard
          title="Обеспеченность"
          value={`${ppeData.overallProvision.value}%`}
          trend={ppeData.overallProvision}
          icon={<HardHat className="h-4 w-4" />}
        />
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Сотрудники
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {ppeData.totalUsers.current}/{ppeData.totalUsers.total}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              {ppeData.totalUsers.percent}% сотрудников в ЛК
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Структура выдачи и Обеспеченность */}
      <div className="grid lg:grid-cols-2 gap-4">
        <DistributionChart
          title="Структура выдачи СИЗиСО"
          data={ppeData.byType}
        />
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Обеспеченность по типам СИЗиСО</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {ppeData.provision.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <span>{item.name}</span>
                <div className="flex items-center gap-2">
                  <Progress 
                    value={item.percent} 
                    className={cn('h-2 w-24', `[&>div]:${getStatusBg(item.status)}`)} 
                  />
                  <span className={cn('font-medium w-12 text-right', getStatusColor(item.status))}>
                    {item.percent}%
                  </span>
                  <span className="text-xs">
                    {item.trend === 'up' ? '↑' : '↓'}
                  </span>
                </div>
              </div>
            ))}
            <div className="flex gap-4 pt-3 text-xs text-muted-foreground border-t mt-3">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-success" /> норма (90-100%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-warning" /> внимание (75-89%)</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-danger" /> риск (0-74%)</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Рейтинг обеспеченности и Дефицит */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-chart-3" />
              <CardTitle className="text-sm font-medium">Рейтинг обеспеченности по предприятиям</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {ppeData.byEnterprise.map((enterprise, idx) => (
              <div key={enterprise.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                      {idx + 1}
                    </span>
                    <span>{enterprise.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={cn('font-medium', getStatusColor(enterprise.status))}>
                      {enterprise.percent}%
                    </span>
                    <span className="w-4 h-4 flex items-center justify-center text-xs">
                      {getStatusIcon(enterprise.status)}
                    </span>
                  </div>
                </div>
                <Progress 
                  value={enterprise.percent} 
                  className={cn('h-1.5', `[&>div]:${getStatusBg(enterprise.status)}`)} 
                />
              </div>
            ))}
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
                    <span className="w-5 h-5 rounded-full bg-danger/10 text-danger flex items-center justify-center text-xs font-medium">
                      {idx + 1}
                    </span>
                    <span className="truncate max-w-[200px]">{item.name}</span>
                  </div>
                  <span className="font-medium text-danger">{item.value}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              Количество недостающих единиц СИЗиСО по обеспеченности
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}

// Сотрудники
export function UsersSection() {
  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-chart-2/20">
          <Users className="h-5 w-5 text-chart-2" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Сотрудники</h2>
          <p className="text-sm text-muted-foreground">Статистика по пользователям Личного кабинета</p>
        </div>
      </div>

      {/* Основные метрики */}
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

      {/* Топ по количеству и Популярные модули */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-chart-3" />
              <CardTitle className="text-sm font-medium">ТОП по количеству пользователей</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {usersData.byEnterprise.map((enterprise, idx) => (
              <div key={enterprise.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium">
                      {idx + 1}
                    </span>
                    <span>{enterprise.name}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">{enterprise.users} / {enterprise.total}</span>
                    <span className="font-medium text-primary">{enterprise.percent}%</span>
                  </div>
                </div>
                <Progress value={enterprise.percent} className="h-1.5" />
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
                    <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-medium shrink-0">
                      {idx + 1}
                    </span>
                    <span className="w-24 shrink-0">{module.name}</span>
                    <div className="flex-1">
                      <div 
                        className="h-2 rounded bg-primary/70" 
                        style={{ width: `${(module.visits / maxVisits) * 100}%` }}
                      />
                    </div>
                    <span className="font-medium w-12 text-right">{module.visits}</span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Среднее количество входов */}
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
                  <span className="w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                    {idx + 1}
                  </span>
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
    <section className="space-y-4">
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-chart-3/20">
          <Car className="h-5 w-5 text-chart-3" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Заказ авто</h2>
          <p className="text-sm text-muted-foreground">Статистика по заявкам на автотранспорт</p>
        </div>
      </div>

      {/* Основные метрики */}
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

      {/* Структура автопарка и Рейтинг водителей */}
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
            {carOrderData.topDrivers.map((driver, idx) => (
              <div key={driver.name} className="flex items-center justify-between text-sm py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-2">
                  <span className="text-chart-3 font-medium">
                    {'★'.repeat(Math.floor(driver.rating))}
                  </span>
                  <span className="font-medium">{driver.rating}</span>
                  <span>{driver.name}</span>
                </div>
                <div className="text-muted-foreground">
                  {driver.trips} поездок
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Количество заказов по предприятиям */}
      <div className="grid lg:grid-cols-2 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Количество заказов по предприятиям</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {carOrderData.ordersByEnterprise.map((enterprise) => {
              const maxValue = Math.max(...carOrderData.ordersByEnterprise.map(e => e.value))
              return (
                <div key={enterprise.name} className="flex items-center gap-2 text-sm">
                  <span className="w-24 shrink-0">{enterprise.name}</span>
                  <div className="flex-1">
                    <div 
                      className="h-4 rounded bg-primary/70 flex items-center justify-end pr-2" 
                      style={{ width: `${(enterprise.value / maxValue) * 100}%` }}
                    >
                      <span className="text-xs text-primary-foreground font-medium">{enterprise.value}</span>
                    </div>
                  </div>
                  <span className={cn('text-xs', enterprise.trend === 'up' ? 'text-success' : 'text-danger')}>
                    {enterprise.trend === 'up' ? '↑' : '↓'}
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Среднее количество заказов на авто</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {carOrderData.avgOrdersPerCar.map((enterprise) => {
              const maxValue = Math.max(...carOrderData.avgOrdersPerCar.map(e => e.value))
              return (
                <div key={enterprise.name} className="flex items-center gap-2 text-sm">
                  <span className="w-24 shrink-0">{enterprise.name}</span>
                  <div className="flex-1">
                    <div 
                      className="h-4 rounded bg-chart-2/70 flex items-center justify-end pr-2" 
                      style={{ width: `${(enterprise.value / maxValue) * 100}%` }}
                    >
                      <span className="text-xs font-medium">{enterprise.value}</span>
                    </div>
                  </div>
                  <span className={cn('text-xs', enterprise.trend === 'up' ? 'text-success' : 'text-danger')}>
                    {enterprise.trend === 'up' ? '↑' : '↓'}
                  </span>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
