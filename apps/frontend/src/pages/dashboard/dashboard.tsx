import { CustomerTable } from '@/pages/dashboard/components/customerTable/customerTable'
import { Layout } from '@/pages/dashboard/components/layout/layout'
import { DateRangeFilter } from '@/pages/dashboard/components/dateRangeFilter/dateRangeFilter'
import { PriceRangeSalesChart } from '@/pages/dashboard/components/priceRangeSalesChart'
import { ErrorBoundary } from '@/shared/ui/errorBoundary'
import { Suspense } from 'react'

export const Dashboard = () => {
  return (
    <Layout>
      <div>
        <DateRangeFilter />
      </div>

      <ErrorBoundary fallback={<div>Error</div>}>
        <Suspense fallback={<div>Loading...</div>}>
          <PriceRangeSalesChart />
        </Suspense>
      </ErrorBoundary>

      <div>
        {/* TODO: 404 응답 에러 핸들링 */}
        <ErrorBoundary fallback={<div>Error</div>}>
          <Suspense fallback={<div>Loading...</div>}>
            <CustomerTable />
          </Suspense>
        </ErrorBoundary>
      </div>
    </Layout>
  )
}
