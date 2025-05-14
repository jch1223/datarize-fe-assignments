import { atom, useAtom } from 'jotai'

interface DateRangeFilter {
  from: string
  to: string
}

const dateRangeFilterAtom = atom<DateRangeFilter>({
  from: '2024-07-01',
  to: '2024-07-31',
})

export const useDateRangeFilter = () => {
  const [dateRange, setDateRange] = useAtom(dateRangeFilterAtom)

  const formatDateToIso = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  return {
    dateRange,
    setDateRange,
    formatDateToIso,
  }
}
