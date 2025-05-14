import { useDateRangeFilter } from '@/pages/dashboard/components/dateRangeFilter/hooks/useDateRangeFilter'
import { DatePickerWithRange } from '@/shared/ui/dateRangePicker'
import { DateRange } from 'react-day-picker'

export const DateRangeFilter = () => {
  const { dateRange, setDateRange, formatDateToIso } = useDateRangeFilter()

  const handleApply = (dateRange?: DateRange) => {
    if (!dateRange?.from || !dateRange?.to) return

    setDateRange({
      from: formatDateToIso(dateRange.from),
      to: formatDateToIso(dateRange.to),
    })
  }

  return (
    <DatePickerWithRange
      dateRange={{
        from: new Date(dateRange.from),
        to: new Date(dateRange.to),
      }}
      onApply={handleApply}
    />
  )
}
