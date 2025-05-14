import { customerApi, GetCustomerParams } from '@/pages/dashboard/api/customer/customer'
import { useSuspenseQuery } from '@tanstack/react-query'

const customerQueryKey = {
  all: ['customer'],
  list: (params?: GetCustomerParams) => [...customerQueryKey.all, 'list', params],
}

export const useCustomerQuery = (params?: GetCustomerParams) => {
  return useSuspenseQuery({
    queryKey: customerQueryKey.list(params),
    queryFn: () => customerApi.getCustomer(params),
  })
}
