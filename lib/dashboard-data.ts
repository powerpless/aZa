// Типы данных для витрины активности ПБиОТ

export interface TrendData {
  value: number
  previousValue: number
  change: number
  changePercent: number
  trend: 'up' | 'down' | 'stable'
}

export interface DepartmentMetric {
  id: string
  name: string
  enterprise: string
  value: number
  trend: TrendData
  engagement: number
}

export interface TopViolation {
  id: string
  type: string
  count: number
  percent: number
}

export interface TopUser {
  id: string
  name: string
  department: string
  count: number
}

export interface ModuleMetrics {
  total: TrendData
  byEnterprise: { name: string; value: number }[]
  topDepartments: DepartmentMetric[]
  zeroDepartments: { name: string; enterprise: string }[]
  engagement: TrendData
}

// Демо-данные для производственного контроля
export const productionControlData = {
  total: {
    value: 1247,
    previousValue: 1089,
    change: 158,
    changePercent: 14.5,
    trend: 'up' as const
  },
  violations: {
    value: 423,
    previousValue: 467,
    change: -44,
    changePercent: -9.4,
    trend: 'down' as const
  },
  topViolations: [
    { id: '1', type: 'Нарушение СИЗ', count: 89, percent: 21 },
    { id: '2', type: 'Загромождение проходов', count: 67, percent: 16 },
    { id: '3', type: 'Отсутствие ограждения', count: 54, percent: 13 },
    { id: '4', type: 'Неисправность оборудования', count: 48, percent: 11 },
    { id: '5', type: 'Нарушение техпроцесса', count: 41, percent: 10 },
  ],
  eliminationRate: {
    value: 78,
    previousValue: 72,
    change: 6,
    changePercent: 8.3,
    trend: 'up' as const
  },
  byEnterprise: [
    { name: 'Завод №1', value: 412 },
    { name: 'Завод №2', value: 298 },
    { name: 'Завод №3', value: 267 },
    { name: 'Завод №4', value: 156 },
    { name: 'Завод №5', value: 114 },
  ],
  byDepartment: [
    { name: 'Цех №1', value: 187, change: 23 },
    { name: 'Цех №3', value: 156, change: 12 },
    { name: 'Цех №7', value: 134, change: -5 },
    { name: 'Цех №2', value: 112, change: 8 },
    { name: 'Цех №5', value: 98, change: 15 },
  ],
  zeroDepartments: [
    { name: 'Цех №12', enterprise: 'Завод №3' },
    { name: 'Цех №8', enterprise: 'Завод №2' },
    { name: 'Склад №4', enterprise: 'Завод №1' },
  ],
  trendData: [
    { month: 'Янв', checks: 95, violations: 38 },
    { month: 'Фев', checks: 108, violations: 42 },
    { month: 'Мар', checks: 112, violations: 35 },
    { month: 'Апр', checks: 125, violations: 41 },
    { month: 'Май', checks: 134, violations: 37 },
    { month: 'Июн', checks: 142, violations: 33 },
  ],
}

// Демо-данные для ПАБ
export const pabData = {
  total: {
    value: 892,
    previousValue: 756,
    change: 136,
    changePercent: 18.0,
    trend: 'up' as const
  },
  hazardousActions: {
    value: 1567,
    previousValue: 1423,
    change: 144,
    changePercent: 10.1,
    trend: 'up' as const
  },
  hazardousConditions: {
    value: 834,
    previousValue: 912,
    change: -78,
    changePercent: -8.6,
    trend: 'down' as const
  },
  topViolations: [
    { id: '1', type: 'Неприменение СИЗ', count: 234, percent: 15 },
    { id: '2', type: 'Нарушение позы/положения', count: 189, percent: 12 },
    { id: '3', type: 'Использование неисправного инструмента', count: 156, percent: 10 },
    { id: '4', type: 'Обход защитных устройств', count: 134, percent: 9 },
    { id: '5', type: 'Нарушение порядка работ', count: 112, percent: 7 },
  ],
  topDepartments: [
    { id: '1', name: 'Цех №1', enterprise: 'Завод №1', value: 145, trend: { value: 145, previousValue: 123, change: 22, changePercent: 17.9, trend: 'up' as const }, engagement: 87 },
    { id: '2', name: 'Цех №3', enterprise: 'Завод №2', value: 128, trend: { value: 128, previousValue: 112, change: 16, changePercent: 14.3, trend: 'up' as const }, engagement: 82 },
    { id: '3', name: 'Цех №7', enterprise: 'Завод №1', value: 112, trend: { value: 112, previousValue: 98, change: 14, changePercent: 14.3, trend: 'up' as const }, engagement: 79 },
    { id: '4', name: 'Цех №2', enterprise: 'Завод №3', value: 98, trend: { value: 98, previousValue: 89, change: 9, changePercent: 10.1, trend: 'up' as const }, engagement: 74 },
    { id: '5', name: 'Цех №5', enterprise: 'Завод №2', value: 87, trend: { value: 87, previousValue: 92, change: -5, changePercent: -5.4, trend: 'down' as const }, engagement: 68 },
  ],
  topLeaders: [
    { id: '1', name: 'Иванов И.И.', department: 'Цех №1', count: 45 },
    { id: '2', name: 'Петров П.П.', department: 'Цех №3', count: 38 },
    { id: '3', name: 'Сидоров С.С.', department: 'Цех №7', count: 32 },
    { id: '4', name: 'Козлов К.К.', department: 'Цех №2', count: 28 },
    { id: '5', name: 'Морозов М.М.', department: 'Цех №5', count: 24 },
  ],
  zeroDepartments: [
    { name: 'Цех №15', enterprise: 'Завод №4' },
    { name: 'Цех №11', enterprise: 'Завод №3' },
    { name: 'Участок №6', enterprise: 'Завод №5' },
    { name: 'Склад №2', enterprise: 'Завод №2' },
  ],
  byEnterprise: [
    { name: 'Завод №1', value: 298 },
    { name: 'Завод №2', value: 234 },
    { name: 'Завод №3', value: 187 },
    { name: 'Завод №4', value: 112 },
    { name: 'Завод №5', value: 61 },
  ],
  engagement: {
    value: 72,
    previousValue: 65,
    change: 7,
    changePercent: 10.8,
    trend: 'up' as const
  },
  trendData: [
    { month: 'Янв', audits: 128, actions: 245, conditions: 134 },
    { month: 'Фев', audits: 135, actions: 267, conditions: 142 },
    { month: 'Мар', audits: 142, actions: 256, conditions: 128 },
    { month: 'Апр', audits: 156, actions: 278, conditions: 145 },
    { month: 'Май', audits: 167, actions: 289, conditions: 138 },
    { month: 'Июн', audits: 164, actions: 232, conditions: 147 },
  ],
}

// Демо-данные для регистрации опасных действий и условий
export const hazardRegistrationData = {
  total: {
    value: 2401,
    previousValue: 2156,
    change: 245,
    changePercent: 11.4,
    trend: 'up' as const
  },
  topActions: [
    { id: '1', type: 'Работа без СИЗ', count: 312, percent: 18 },
    { id: '2', type: 'Нарушение скоростного режима', count: 267, percent: 15 },
    { id: '3', type: 'Небезопасное использование инструмента', count: 198, percent: 11 },
    { id: '4', type: 'Работа в опасной зоне', count: 167, percent: 10 },
    { id: '5', type: 'Нарушение правил подъема грузов', count: 145, percent: 8 },
  ],
  topConditions: [
    { id: '1', type: 'Скользкие поверхности', count: 189, percent: 23 },
    { id: '2', type: 'Недостаточное освещение', count: 156, percent: 19 },
    { id: '3', type: 'Неисправность оборудования', count: 134, percent: 16 },
    { id: '4', type: 'Загромождение проходов', count: 112, percent: 13 },
    { id: '5', type: 'Отсутствие ограждений', count: 98, percent: 12 },
  ],
  topUsers: [
    { id: '1', name: 'Смирнов А.А.', department: 'Цех №1', count: 67 },
    { id: '2', name: 'Кузнецов Б.Б.', department: 'Цех №3', count: 54 },
    { id: '3', name: 'Попов В.В.', department: 'Цех №7', count: 48 },
    { id: '4', name: 'Соколов Г.Г.', department: 'Цех №2', count: 42 },
    { id: '5', name: 'Лебедев Д.Д.', department: 'Цех №5', count: 38 },
  ],
  byDepartment: [
    { name: 'Цех №1', value: 423, change: 45 },
    { name: 'Цех №3', value: 367, change: 32 },
    { name: 'Цех №7', value: 298, change: -12 },
    { name: 'Цех №2', value: 256, change: 28 },
    { name: 'Цех №5', value: 212, change: 18 },
  ],
  engagement: {
    value: 45,
    previousValue: 38,
    change: 7,
    changePercent: 18.4,
    trend: 'up' as const
  },
  zeroDepartments: [
    { name: 'Цех №18', enterprise: 'Завод №5' },
    { name: 'Участок №9', enterprise: 'Завод №4' },
    { name: 'Цех №14', enterprise: 'Завод №3' },
  ],
  byEnterprise: [
    { name: 'Завод №1', value: 678 },
    { name: 'Завод №2', value: 567 },
    { name: 'Завод №3', value: 489 },
    { name: 'Завод №4', value: 378 },
    { name: 'Завод №5', value: 289 },
  ],
  trendData: [
    { month: 'Янв', actions: 256, conditions: 112 },
    { month: 'Фев', actions: 278, conditions: 124 },
    { month: 'Мар', actions: 289, conditions: 118 },
    { month: 'Апр', actions: 312, conditions: 134 },
    { month: 'Май', actions: 334, conditions: 142 },
    { month: 'Июн', actions: 298, conditions: 148 },
  ],
}

// Демо-данные для оценки рисков
export const riskData = {
  total: {
    value: 567,
    previousValue: 489,
    change: 78,
    changePercent: 16.0,
    trend: 'up' as const
  },
  byCategory: [
    { name: 'Высокий', value: 45, color: 'var(--danger)' },
    { name: 'Средний', value: 189, color: 'var(--warning)' },
    { name: 'Низкий', value: 333, color: 'var(--success)' },
  ],
  byEnterprise: [
    { name: 'Завод №1', high: 12, medium: 56, low: 89 },
    { name: 'Завод №2', high: 9, medium: 45, low: 78 },
    { name: 'Завод №3', high: 11, medium: 42, low: 67 },
    { name: 'Завод №4', high: 8, medium: 28, low: 56 },
    { name: 'Завод №5', high: 5, medium: 18, low: 43 },
  ],
  trendData: [
    { month: 'Янв', identified: 78, mitigated: 45 },
    { month: 'Фев', identified: 89, mitigated: 56 },
    { month: 'Мар', identified: 94, mitigated: 67 },
    { month: 'Апр', identified: 102, mitigated: 78 },
    { month: 'Май', identified: 98, mitigated: 85 },
    { month: 'Июн', identified: 106, mitigated: 92 },
  ],
  zeroDepartments: [
    { name: 'Цех №16', enterprise: 'Завод №4' },
    { name: 'Участок №7', enterprise: 'Завод №5' },
  ],
}

// Демо-данные для происшествий
export const incidentData = {
  total: {
    value: 23,
    previousValue: 31,
    change: -8,
    changePercent: -25.8,
    trend: 'down' as const
  },
  hipo: {
    value: 5,
    previousValue: 8,
    change: -3,
    changePercent: -37.5,
    trend: 'down' as const
  },
  investigationStatus: {
    completed: 18,
    inProgress: 4,
    pending: 1,
  },
  byType: [
    { name: 'Микротравмы', value: 12 },
    { name: 'Первая помощь', value: 6 },
    { name: 'ЛТИ', value: 3 },
    { name: 'Серьезные', value: 2 },
  ],
  trendData: [
    { month: 'Янв', incidents: 5, hipo: 2 },
    { month: 'Фев', incidents: 6, hipo: 1 },
    { month: 'Мар', incidents: 4, hipo: 1 },
    { month: 'Апр', incidents: 3, hipo: 0 },
    { month: 'Май', incidents: 3, hipo: 1 },
    { month: 'Июн', incidents: 2, hipo: 0 },
  ],
  byEnterprise: [
    { name: 'Завод №1', value: 8 },
    { name: 'Завод №2', value: 6 },
    { name: 'Завод №3', value: 5 },
    { name: 'Завод №4', value: 3 },
    { name: 'Завод №5', value: 1 },
  ],
}

// Демо-данные для мероприятий
export const actionsData = {
  assigned: {
    value: 1456,
    previousValue: 1234,
    change: 222,
    changePercent: 18.0,
    trend: 'up' as const
  },
  completed: {
    value: 1123,
    previousValue: 987,
    change: 136,
    changePercent: 13.8,
    trend: 'up' as const
  },
  overdue: {
    value: 89,
    previousValue: 112,
    change: -23,
    changePercent: -20.5,
    trend: 'down' as const
  },
  completionRate: {
    value: 77,
    previousValue: 80,
    change: -3,
    changePercent: -3.8,
    trend: 'down' as const
  },
  trendData: [
    { month: 'Янв', assigned: 234, completed: 189, overdue: 18 },
    { month: 'Фев', assigned: 245, completed: 198, overdue: 15 },
    { month: 'Мар', assigned: 256, completed: 212, overdue: 12 },
    { month: 'Апр', assigned: 267, completed: 223, overdue: 14 },
    { month: 'Май', assigned: 234, completed: 178, overdue: 16 },
    { month: 'Июн', assigned: 220, completed: 123, overdue: 14 },
  ],
  byEnterprise: [
    { name: 'Завод №1', assigned: 412, completed: 334, overdue: 28 },
    { name: 'Завод №2', assigned: 356, completed: 287, overdue: 22 },
    { name: 'Завод №3', assigned: 298, completed: 234, overdue: 18 },
    { name: 'Завод №4', assigned: 234, completed: 167, overdue: 14 },
    { name: 'Завод №5', assigned: 156, completed: 101, overdue: 7 },
  ],
  zeroDepartments: [
    { name: 'Цех №19', enterprise: 'Завод №5' },
  ],
}

// Демо-данные для СИЗиСО
export const ppeData = {
  overallProvision: {
    value: 92,
    previousValue: 89,
    change: 3,
    changePercent: 3.4,
    trend: 'up' as const
  },
  totalUsers: {
    current: 1050,
    total: 7000,
    percent: 15,
  },
  risks: {
    value: 20,
    previousValue: 25,
    change: -5,
    changePercent: -20,
    trend: 'down' as const
  },
  incidents: {
    value: 10,
    previousValue: 12,
    change: -2,
    changePercent: -16.7,
    trend: 'down' as const
  },
  byType: [
    { name: 'Одежда', value: 35, percent: 35 },
    { name: 'Обувь', value: 25, percent: 25 },
    { name: 'Голова', value: 15, percent: 15 },
    { name: 'Очки', value: 10, percent: 10 },
    { name: 'Перчатки', value: 8, percent: 8 },
    { name: 'Расходные', value: 5, percent: 5 },
    { name: 'Вспомогательные', value: 2, percent: 2 },
  ],
  provision: [
    { name: 'Одежда', percent: 95, trend: 'up' as const, status: 'normal' as const },
    { name: 'Обувь', percent: 66, trend: 'down' as const, status: 'risk' as const },
    { name: 'Голова', percent: 88, trend: 'up' as const, status: 'attention' as const },
    { name: 'Очки', percent: 95, trend: 'down' as const, status: 'normal' as const },
    { name: 'Перчатки', percent: 95, trend: 'down' as const, status: 'normal' as const },
    { name: 'Расходные', percent: 95, trend: 'up' as const, status: 'normal' as const },
    { name: 'Вспомогательные', percent: 95, trend: 'up' as const, status: 'normal' as const },
  ],
  byEnterprise: [
    { name: 'Энерджи', percent: 95, status: 'normal' as const, details: { clothes: 96, shoes: 94, head: 95 } },
    { name: 'Коал', percent: 80, status: 'attention' as const, details: { clothes: 85, shoes: 75, head: 80 } },
    { name: 'Дистрибьюшн', percent: 55, status: 'risk' as const, details: { clothes: 60, shoes: 50, head: 55 } },
  ],
  deficit: [
    { name: 'Костюм рабочий из смесовой ткани', value: 1000, byEnterprise: { energy: 400, coal: 350, distribution: 250 } },
    { name: 'Костюм рабочий из х/б ткани', value: 900, byEnterprise: { energy: 350, coal: 300, distribution: 250 } },
    { name: 'Ботинки с жестким подноском', value: 700, byEnterprise: { energy: 280, coal: 240, distribution: 180 } },
    { name: 'Сапоги', value: 600, byEnterprise: { energy: 240, coal: 200, distribution: 160 } },
    { name: 'Перчатки трикотажные', value: 540, byEnterprise: { energy: 220, coal: 180, distribution: 140 } },
  ],
  enterpriseChildren: {
    'Энерджи': ['БТЭЦ', 'ЖТЭЦ', 'ГРЭС'],
    'Дистрибьюшн': ['БРП', 'ПЭС', 'ПТЭ'],
  },
}

// Демо-данные для Пользователей
export const usersData = {
  total: {
    current: 1050,
    all: 7000,
    percent: 15,
    change: 45,
  },
  active: {
    current: 700,
    total: 1050,
    percent: 67,
    change: -15,
  },
  newUsers: {
    value: 65,
    total: 1050,
    change: 12,
  },
  leader: {
    name: '��оал',
    value: 500,
    percent: 90,
    change: 18,
  },
  byEnterprise: [
    { name: 'Коал', users: 455, total: 500, percent: 91 },
    { name: 'Энерджи', users: 3420, total: 4500, percent: 76 },
    { name: 'Дистрибьюшн', users: 1240, total: 2000, percent: 62 },
  ],
  popularModules: [
    { name: 'Поведенческий аудит безопасности', visits: 455 },
    { name: 'СИЗиСО', visits: 280 },
    { name: 'ПК', visits: 266 },
    { name: 'OУ/ОД', visits: 150 },
    { name: 'Происшествия', visits: 145 },
    { name: 'Риски', visits: 135 },
    { name: 'Оплата труда', visits: 95 },
    { name: 'Заказ авто', visits: 75 },
    { name: 'Питание', visits: 30 },
    { name: 'СКУД', visits: 15 },
    { name: 'Тестирование', visits: 10 },
    { name: 'Мероприятия', visits: 5 },
  ],
  avgLogins: [
    { name: 'Коал', value: 5, logins: 500, activeUsers: 200 },
    { name: 'Энерджи', value: 2, logins: 400, activeUsers: 200 },
    { name: 'Дистрибьюшн', value: 1.1, logins: 220, activeUsers: 200 },
  ],
}

// Демо-данные для Заказа авто
export const carOrderData = {
  totalOrders: {
    value: 420,
    change: 6,
  },
  totalCars: {
    value: 100,
    change: 0,
  },
  fleetLoad: {
    value: 70,
    change: 5,
  },
  avgTripTime: {
    value: '2 часа',
    change: '+1 час',
  },
  fleetStructure: [
    { type: 'Легковых', count: 85, load: 80 },
    { type: 'Грузовых', count: 15, load: 5 },
  ],
  topDrivers: [
    { name: 'Иванов', rating: 4.9, trips: 58, enterprise: 'Энерджи' },
    { name: 'Петров', rating: 4.8, trips: 46, enterprise: 'Коал' },
    { name: 'Сидоров', rating: 4.7, trips: 39, enterprise: 'Дистрибьюшн' },
  ],
  ordersByEnterprise: [
    { name: 'Коал', value: 91, trend: 'down' as const, employees: 500 },
    { name: 'Энерджи', value: 76, trend: 'up' as const, employees: 4500 },
    { name: 'Дистрибьюшн', value: 62, trend: 'up' as const, employees: 2000 },
  ],
  avgOrdersPerCar: [
    { name: 'Коал', value: 70, trend: 'up' as const },
    { name: 'Энерджи', value: 60, trend: 'down' as const },
    { name: 'Дистрибьюшн', value: 50, trend: 'up' as const },
  ],
}

// Общая сводка по всем модулям
export const overviewData = {
  modules: [
    { 
      id: 'production', 
      name: 'Производственный контроль', 
      icon: 'ClipboardCheck',
      value: productionControlData.total.value,
      trend: productionControlData.total,
      engagement: 68,
      zeroDepartments: productionControlData.zeroDepartments.length
    },
    { 
      id: 'pab', 
      name: 'Поведенческий аудит безопасности', 
      icon: 'Eye',
      value: pabData.total.value,
      trend: pabData.total,
      engagement: pabData.engagement.value,
      zeroDepartments: pabData.zeroDepartments.length
    },
    { 
      id: 'hazards', 
      name: 'Опасные действия/условия', 
      icon: 'AlertTriangle',
      value: hazardRegistrationData.total.value,
      trend: hazardRegistrationData.total,
      engagement: hazardRegistrationData.engagement.value,
      zeroDepartments: hazardRegistrationData.zeroDepartments.length
    },
    { 
      id: 'risks', 
      name: 'Оценка рисков', 
      icon: 'Shield',
      value: riskData.total.value,
      trend: riskData.total,
      engagement: 52,
      zeroDepartments: riskData.zeroDepartments.length
    },
    { 
      id: 'incidents', 
      name: 'Происшествия', 
      icon: 'AlertOctagon',
      value: incidentData.total.value,
      trend: incidentData.total,
      engagement: 100,
      zeroDepartments: 0
    },
    { 
      id: 'actions', 
      name: 'Мероприятия', 
      icon: 'CheckSquare',
      value: actionsData.completed.value,
      trend: actionsData.completed,
      engagement: actionsData.completionRate.value,
      zeroDepartments: actionsData.zeroDepartments.length
    },
    { 
      id: 'ppe', 
      name: 'СИЗиСО', 
      icon: 'HardHat',
      value: ppeData.overallProvision.value,
      trend: ppeData.overallProvision,
      engagement: ppeData.overallProvision.value,
      zeroDepartments: 0,
      isPercent: true
    },
    { 
      id: 'users', 
      name: 'Сотрудники', 
      icon: 'Users',
      value: usersData.total.current,
      trend: { value: usersData.total.current, previousValue: usersData.total.current - usersData.total.change, change: usersData.total.change, changePercent: (usersData.total.change / (usersData.total.current - usersData.total.change)) * 100, trend: 'up' as const },
      engagement: usersData.active.percent,
      zeroDepartments: 0
    },
    { 
      id: 'cars', 
      name: 'Заказ авто', 
      icon: 'Car',
      value: carOrderData.totalOrders.value,
      trend: { value: carOrderData.totalOrders.value, previousValue: carOrderData.totalOrders.value - carOrderData.totalOrders.change, change: carOrderData.totalOrders.change, changePercent: (carOrderData.totalOrders.change / (carOrderData.totalOrders.value - carOrderData.totalOrders.change)) * 100, trend: 'up' as const },
      engagement: carOrderData.fleetLoad.value,
      zeroDepartments: 0
    },
  ],
  totalEngagement: {
    value: 67,
    previousValue: 61,
    change: 6,
    changePercent: 9.8,
    trend: 'up' as const
  },
  totalZeroDepartments: 13,
  lastUpdated: new Date().toISOString(),
}
