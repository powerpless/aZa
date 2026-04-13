'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { Calendar, ChevronDown, RefreshCw, Maximize2, Settings, Download } from 'lucide-react'
import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

interface DashboardHeaderProps {
  onPeriodChange?: (period: string) => void
  onEnterpriseChange?: (enterprise: string) => void
  onRefresh?: () => void
  onFullscreen?: () => void
}

export function DashboardHeader({
  onPeriodChange,
  onEnterpriseChange,
  onRefresh,
  onFullscreen,
}: DashboardHeaderProps) {
  const [period, setPeriod] = useState('month')
  const [enterprise, setEnterprise] = useState('all')
  const [dateFrom, setDateFrom] = useState<Date | undefined>(undefined)
  const [dateTo, setDateTo] = useState<Date | undefined>(undefined)
  const [isCustomPeriod, setIsCustomPeriod] = useState(false)

  const handlePeriodChange = (value: string) => {
    if (value === 'custom') {
      setIsCustomPeriod(true)
    } else {
      setIsCustomPeriod(false)
      setDateFrom(undefined)
      setDateTo(undefined)
    }
    setPeriod(value)
    onPeriodChange?.(value)
  }

  const handleEnterpriseChange = (value: string) => {
    setEnterprise(value)
    onEnterpriseChange?.(value)
  }

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 px-4 lg:px-6 py-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary text-primary-foreground font-bold text-lg">
            ВА
          </div>
          <div>
            <h1 className="text-lg font-semibold">Витрина активностей</h1>
            <p className="text-xs text-muted-foreground">Мониторинг всех модулей</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <Select value={period} onValueChange={handlePeriodChange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Период" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
              <SelectItem value="year">Год</SelectItem>
              <SelectItem value="custom">Выбрать даты</SelectItem>
            </SelectContent>
          </Select>

          {isCustomPeriod && (
            <div className="flex items-center gap-2">
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[130px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, 'dd.MM.yyyy', { locale: ru }) : 'От'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <span className="text-muted-foreground">—</span>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-[130px] justify-start text-left font-normal">
                    <Calendar className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, 'dd.MM.yyyy', { locale: ru }) : 'До'}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
          )}

          <Select value={enterprise} onValueChange={handleEnterpriseChange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Предприятие" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все предприятия</SelectItem>
              <SelectItem value="factory1">Завод №1</SelectItem>
              <SelectItem value="factory2">Завод №2</SelectItem>
              <SelectItem value="factory3">Завод №3</SelectItem>
              <SelectItem value="factory4">Завод №4</SelectItem>
              <SelectItem value="factory5">Завод №5</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={onRefresh}
              title="Обновить данные"
            >
              <RefreshCw className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={onFullscreen}
              title="Полноэкранный режим"
            >
              <Maximize2 className="h-4 w-4" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Экспорт в PDF
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Download className="h-4 w-4 mr-2" />
                  Экспорт в Excel
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </div>
  )
}
