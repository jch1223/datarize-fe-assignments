import { API_URL } from '@/shared/config/api'
import ky from 'ky'

type PurchaseFrequencyResponse = {
  range: string
  count: number
}[]

export const purchaseAnalysisApi = {
  getPurchaseFrequency: async (from: string, to: string) => {
    const response = await ky<PurchaseFrequencyResponse>(`${API_URL}/api/purchase-frequency`, {
      searchParams: {
        from,
        to,
      },
    })
    return response.json()
  },
}
