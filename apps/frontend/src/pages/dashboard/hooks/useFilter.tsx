import { atom, useAtom } from 'jotai'

interface DateRangeFilter {
  from: string
  to: string
}

interface Filter {
  dateRange: DateRangeFilter
}

const filterAtom = atom<Filter>({
  dateRange: {
    from: '2024-07-01',
    to: '2024-07-31',
  },
})

export const useFilter = () => {
  const [filter, setFilter] = useAtom(filterAtom)

  const formatDateToIso = (date: Date) => {
    return date.toISOString().split('T')[0]
  }

  const updateDateRange = (dateRange: DateRangeFilter) => {
    setFilter({
      ...filter,
      dateRange,
    })
  }

  return {
    filter,
    updateDateRange,
    formatDateToIso,
  }
}
