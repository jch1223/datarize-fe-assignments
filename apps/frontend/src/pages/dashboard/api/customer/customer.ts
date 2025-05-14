import { API_URL } from '@/shared/config/api'
import ky from 'ky'

export interface GetCustomerParams {
  sortBy?: 'asc' | 'desc'
  name?: string
}

export const customerApi = {
  getCustomer: async (params?: GetCustomerParams) => {
    const response = await ky.get(`${API_URL}/api/customers`, {
      searchParams: {
        ...(params?.sortBy ? { sortBy: params.sortBy } : {}),
        ...(params?.name ? { name: params.name } : {}),
      },
    })
    return response.json()
  },
}
