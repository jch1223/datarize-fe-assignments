import { useSuspenseQuery } from '@tanstack/react-query'
import { purchaseAnalysisApi } from '../purchase'

const purchaseQueryKey = {
  all: ['purchase'],
  frequency: (from: string, to: string) => [...purchaseQueryKey.all, 'frequency', from, to],
}

export const usePurchaseFrequencyQuery = (from: string, to: string) => {
  return useSuspenseQuery({
    queryKey: purchaseQueryKey.frequency(from, to),
    queryFn: () => purchaseAnalysisApi.getPurchaseFrequency(from, to),
  })
}
