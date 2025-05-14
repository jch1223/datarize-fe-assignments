import { useCustomerQuery } from '@/pages/dashboard/api/customer/hooks/useCustomerQuery'
import { PurchaseProduct } from '@/pages/dashboard/components/customerDetailSheet/purchaseProduct'
import { Button } from '@/shared/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { Suspense } from 'react'
import { ErrorBoundary } from 'react-error-boundary'

interface CustomerDetailProps {
  id: string
  name: string
  children: React.ReactNode
}

export const CustomerDetailSheet = ({ id, name, children }: CustomerDetailProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent>
        <SheetHeader>
          <SheetTitle>{name}님의 상세 구매 내역</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col gap-4 px-4 overflow-y-auto">
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                fallbackRender={({ resetErrorBoundary }) => (
                  <CustomerDetailContentError onReset={resetErrorBoundary} id={id} />
                )}
              >
                <Suspense fallback={<CustomerDetailContentSkeleton />}>
                  <CustomerDetailContent id={id} />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </div>
      </SheetContent>
    </Sheet>
  )
}

const CustomerDetailContentError = ({ onReset, id }: { onReset: () => void; id: string }) => {
  const { refetch } = useCustomerQuery(id)

  const handleReset = () => {
    onReset()
    refetch()
  }

  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full">
      오류가 발생했습니다. 잠시후 다시 시도해주세요
      <Button onClick={handleReset}>다시 시도</Button>
    </div>
  )
}

const CustomerDetailContent = ({ id }: { id: string }) => {
  const { data } = useCustomerQuery(id)

  return (
    <div className="flex flex-col gap-4 ">
      {data?.map((purchase) => (
        <PurchaseProduct key={purchase.date} {...purchase} />
      ))}
    </div>
  )
}

const CustomerDetailContentSkeleton = () => {
  return (
    <div className="flex flex-col gap-4">
      <PurchaseProduct.Skeleton />
    </div>
  )
}
