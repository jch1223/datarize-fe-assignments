import { CustomerTable } from '@/pages/dashboard/components/customerTable/customerTable'
import { Layout } from '@/pages/dashboard/components/layout/layout'
import { DateRangeFilter } from '@/pages/dashboard/components/dateRangeFilter/dateRangeFilter'
import { PriceRangeSalesChart } from '@/pages/dashboard/components/priceRangeSalesChart'
import { Suspense } from 'react'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'

export const Dashboard = () => {
  return (
    <Layout>
      <div>
        <DateRangeFilter />
      </div>

      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            fallbackRender={({ resetErrorBoundary, error }) => (
              <PriceRangeSalesChart.Error error={error} onReset={resetErrorBoundary} />
            )}
          >
            <Suspense fallback={<PriceRangeSalesChart.Skeleton />}>
              <PriceRangeSalesChart />
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>

      <div>
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              fallbackRender={({ resetErrorBoundary, error }) => (
                <CustomerTable.Error error={error} onReset={resetErrorBoundary} />
              )}
            >
              <Suspense fallback={<CustomerTable.Skeleton />}>
                <CustomerTable />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </Layout>
  )
}
