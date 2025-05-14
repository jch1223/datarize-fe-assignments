import { useFilter } from '@/pages/dashboard/hooks/useFilter'
import { DatePickerWithRange } from '@/shared/ui/dateRangePicker'
import { DateRange } from 'react-day-picker'

export const DateRangeFilter = () => {
  const { filter, updateDateRange, formatDateToIso } = useFilter()

  const handleApply = (dateRange?: DateRange) => {
    if (!dateRange?.from || !dateRange?.to) return

    updateDateRange({
      from: formatDateToIso(dateRange.from),
      to: formatDateToIso(dateRange.to),
    })
  }

  return (
    <DatePickerWithRange
      dateRange={{
        from: new Date(filter.dateRange.from),
        to: new Date(filter.dateRange.to),
      }}
      onApply={handleApply}
    />
  )
}
