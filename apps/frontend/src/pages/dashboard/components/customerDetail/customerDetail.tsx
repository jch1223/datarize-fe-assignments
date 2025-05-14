import { useCustomerQuery } from '@/pages/dashboard/api/customer/hooks/useCustomerQuery'
import { SheetDescription, SheetHeader, SheetTitle } from '@/shared/ui/sheet'

interface CustomerDetailProps {
  id: string
}

export const CustomerDetail = ({ id }: CustomerDetailProps) => {
  const { data } = useCustomerQuery(id)

  console.log(data)

  return (
    <div>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </div>
  )
}
