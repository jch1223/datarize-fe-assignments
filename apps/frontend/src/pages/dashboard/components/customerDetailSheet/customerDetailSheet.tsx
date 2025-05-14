import { useCustomerQuery } from '@/pages/dashboard/api/customer/hooks/useCustomerQuery'
import { PurchaseProduct } from '@/pages/dashboard/components/customerDetailSheet/purchaseProduct'
import { ErrorBoundary } from '@/shared/ui/errorBoundary'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/shared/ui/sheet'
import { Suspense } from 'react'

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
          <ErrorBoundary fallback={<div>Loading...</div>}>
            <Suspense fallback={<div>Loading...</div>}>
              <CustomerDetailContent id={id} />
            </Suspense>
          </ErrorBoundary>
        </div>
      </SheetContent>
    </Sheet>
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
