import { BarChart } from '@/shared/ui/barChart'
import { usePurchaseFrequencyQuery } from '../api/analysis/hooks/usePurchaseQuery'
import { useFilter } from '@/pages/dashboard/hooks/useFilter'

export const PriceRangeSalesChart = () => {
  const { filter } = useFilter()
  const { data } = usePurchaseFrequencyQuery(filter.dateRange.from, filter.dateRange.to)

  return (
    <div className="h-[400px]">
      <BarChart
        data={data}
        xAxisKey="range"
        barDataKeys={['count']}
        tooltipOptions={{ formatter: (value) => [value, '구매 수'] }}
      />
    </div>
  )
}
