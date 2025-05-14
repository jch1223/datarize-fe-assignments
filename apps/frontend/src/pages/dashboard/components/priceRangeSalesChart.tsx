import { BarChart } from '@/shared/ui/barChart'
import { usePurchaseFrequencyQuery } from '../api/analysis/hooks/usePurchaseQuery'
import { useDateRangeFilter } from '@/pages/dashboard/components/dateRangeFilter/hooks/useDateRangeFilter'

export const PriceRangeSalesChart = () => {
  const { dateRange } = useDateRangeFilter()
  const { data } = usePurchaseFrequencyQuery({ from: dateRange.from, to: dateRange.to })

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
