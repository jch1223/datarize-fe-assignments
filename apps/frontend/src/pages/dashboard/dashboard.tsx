import { DateRangeFilter } from '@/pages/dashboard/components/dateRangeFilter/dateRangeFilter'
import { PriceRangeSalesChart } from '@/pages/dashboard/components/priceRangeSalesChart'
import { ErrorBoundary } from '@/shared/ui/errorBoundary'
import { Suspense } from 'react'

export const Dashboard = () => {
  return (
    <div>
      <div>
        <DateRangeFilter />
      </div>

      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <PriceRangeSalesChart />
        </Suspense>
      </ErrorBoundary>

      <div>테이블</div>
    </div>
  )
}
