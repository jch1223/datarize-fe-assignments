import { useSuspenseQuery } from '@tanstack/react-query'
import { purchaseAnalysisApi, PurchaseFrequencyParams } from '../purchase'

const purchaseQueryKey = {
  all: ['purchase'],
  frequency: (from: string, to: string) => [...purchaseQueryKey.all, 'frequency', from, to],
}

export const usePurchaseFrequencyQuery = ({ from, to }: PurchaseFrequencyParams) => {
  return useSuspenseQuery({
    queryKey: purchaseQueryKey.frequency(from, to),
    queryFn: () => purchaseAnalysisApi.getPurchaseFrequency({ from, to }),
  })
}
