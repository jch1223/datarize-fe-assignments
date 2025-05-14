'use client'

import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Calendar } from '@/shared/ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/ui/popover'
import { PopoverClose } from '@radix-ui/react-popover'
import { useState } from 'react'

interface DatePickerWithRangeProps {
  className?: string
  dateRange: DateRange
  onApply: (dateRange?: DateRange) => void
}

export function DatePickerWithRange({ className, dateRange: defaultDateRange, onApply }: DatePickerWithRangeProps) {
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(defaultDateRange)

  const handleDateRangeChange = (dateRange?: DateRange) => {
    setSelectedDateRange(dateRange)
  }

  const handleApply = (dateRange?: DateRange) => {
    if (!dateRange?.from || !dateRange?.to) return
    onApply(dateRange)
  }

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      setSelectedDateRange(defaultDateRange)
    }
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover onOpenChange={handleOpenChange}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={'outline'}
            className={cn(
              'w-[300px] justify-start text-left font-normal',
              !selectedDateRange && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {selectedDateRange?.from ? (
              selectedDateRange?.to ? (
                <>
                  {format(selectedDateRange.from, 'yyyy-MM-dd')} ~ {format(selectedDateRange.to, 'yyyy-MM-dd')}
                </>
              ) : (
                format(selectedDateRange.from, 'yyyy-MM-dd')
              )
            ) : (
              <span>날짜를 선택해주세요</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-5 flex flex-col gap-5" align="start">
          <Calendar
            className="p-0"
            initialFocus
            mode="range"
            defaultMonth={defaultDateRange?.from}
            selected={selectedDateRange}
            numberOfMonths={2}
            onSelect={handleDateRangeChange}
          />

          <div className="flex gap-3 justify-end">
            <PopoverClose asChild>
              <Button variant="secondary">취소</Button>
            </PopoverClose>
            <PopoverClose asChild>
              <Button
                variant="default"
                onClick={() => handleApply(selectedDateRange)}
                disabled={!selectedDateRange?.from || !selectedDateRange?.to}
              >
                검색
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
