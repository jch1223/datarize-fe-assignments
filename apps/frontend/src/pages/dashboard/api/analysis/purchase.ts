import { API_URL } from '@/shared/config/api'
import ky from 'ky'

export interface PurchaseFrequencyParams {
  from: string
  to: string
}

type PurchaseFrequencyResponse = {
  range: string
  count: number
}[]

export const purchaseAnalysisApi = {
  getPurchaseFrequency: async ({ from, to }: PurchaseFrequencyParams) => {
    const response = await ky<PurchaseFrequencyResponse>(`${API_URL}/api/purchase-frequency`, {
      searchParams: {
        from,
        to,
      },
    })
    return response.json()
  },
}
