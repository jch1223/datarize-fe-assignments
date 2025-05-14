import { customerApi, GetCustomersParams } from '@/pages/dashboard/api/customer/customer'
import { useSuspenseQuery } from '@tanstack/react-query'

const customerQueryKey = {
  all: ['customer'],
  list: (params?: GetCustomersParams) => [...customerQueryKey.all, 'list', params],
  detail: (id: string) => [...customerQueryKey.all, 'detail', id],
}

export const useCustomersQuery = (params?: GetCustomersParams) => {
  return useSuspenseQuery({
    queryKey: customerQueryKey.list(params),
    queryFn: () => customerApi.getCustomers(params),
  })
}

export const useCustomerQuery = (id: string) => {
  return useSuspenseQuery({
    queryKey: customerQueryKey.detail(id),
    queryFn: () => customerApi.getCustomer(id),
  })
}
