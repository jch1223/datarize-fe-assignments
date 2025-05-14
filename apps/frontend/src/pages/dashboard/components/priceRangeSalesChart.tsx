import { BarChart } from '@/shared/ui/barChart'
import { usePurchaseFrequencyQuery } from '../api/analysis/hooks/usePurchaseQuery'
import { useDateRangeFilter } from '@/pages/dashboard/components/dateRangeFilter/hooks/useDateRangeFilter'
import { Skeleton } from '@/shared/ui/skeleton'
import { HTTPError } from 'ky'
import { Button } from '@/shared/ui/button'

export const PriceRangeSalesChart = () => {
  const { dateRange } = useDateRangeFilter()
  const { data } = usePurchaseFrequencyQuery({ from: dateRange.from, to: dateRange.to })

  if (!data) {
    return <PriceRangeSalesChartSkeleton />
  }

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

const PriceRangeSalesChartError = ({ onReset }: { error: Error | HTTPError; onReset: () => void }) => {
  const { dateRange } = useDateRangeFilter()
  const { refetch } = usePurchaseFrequencyQuery({ from: dateRange.from, to: dateRange.to })

  const handleReset = () => {
    onReset()
    refetch()
  }

  return (
    <div className="h-[400px] flex flex-col gap-4 items-center justify-center">
      <div>에러가 발생했습니다. 잠시 후 다시 시도해주세요.</div>
      <Button onClick={handleReset}>다시 시도</Button>
    </div>
  )
}

const PriceRangeSalesChartSkeleton = () => {
  return (
    <div className="h-[400px]">
      <Skeleton className="h-full w-full" />
    </div>
  )
}

PriceRangeSalesChart.Skeleton = PriceRangeSalesChartSkeleton
PriceRangeSalesChart.Error = PriceRangeSalesChartError
