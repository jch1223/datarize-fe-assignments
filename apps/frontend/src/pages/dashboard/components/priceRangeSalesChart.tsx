import { BarChart } from '@/shared/ui/barChart'
import { usePurchaseFrequencyQuery } from '../api/analysis/hooks/usePurchaseQuery'

export const PriceRangeSalesChart = () => {
  const { data } = usePurchaseFrequencyQuery('2024-07-01', '2024-07-31')

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
