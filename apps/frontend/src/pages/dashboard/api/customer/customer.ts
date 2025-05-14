import { API_URL } from '@/shared/config/api'
import ky from 'ky'

export interface GetCustomersParams {
  sortBy?: 'asc' | 'desc'
  name?: string
}

export interface Customer {
  id: string
  name: string
  count: number
  totalAmount: number
}

type GetCustomersResponse = Customer[]

export const customerApi = {
  getCustomers: async (params?: GetCustomersParams) => {
    const response = await ky.get<GetCustomersResponse>(`${API_URL}/api/customers`, {
      searchParams: {
        ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
        ...(params?.name ? { name: params.name } : {}),
      },
    })
    return response.json()
  },
  getCustomer: async (id: string) => {
    const response = await ky.get<Customer>(`${API_URL}/api/customer/${id}/purchases`)
    return response.json()
  },
}
