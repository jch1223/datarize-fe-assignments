import { Customer } from '@/pages/dashboard/api/customer/customer'
import { Button } from '@/shared/ui/button'
import { ColumnDef } from '@tanstack/react-table'
import { atom, useAtom } from 'jotai'
import { ArrowUpDown } from 'lucide-react'

export const columns: ColumnDef<Customer>[] = [
  {
    accessorKey: 'name',
    header: '이름',
    cell: ({ row }) => <div className="capitalize">{row.getValue('name')}</div>,
  },
  {
    accessorKey: 'count',
    header: '주문 횟수',
    cell: ({ row }) => <div className="lowercase">{Number(row.getValue('count')).toLocaleString()}</div>,
  },
  {
    accessorKey: 'totalAmount',
    header: ({ column }) => (
      <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
        총 주문 금액
        <ArrowUpDown />
      </Button>
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{Number(row.getValue('totalAmount')).toLocaleString()}원</div>
    },
  },
]

interface CustomerTableFilter {
  name?: string
  sortBy?: 'asc' | 'desc'
}

const customerTableFilterAtom = atom<CustomerTableFilter>({
  name: undefined,
  sortBy: undefined,
})

export const useCustomerTable = () => {
  const [filter, setFilter] = useAtom(customerTableFilterAtom)

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'id',
      header: '아이디',
      cell: ({ row }) => <div>{row.getValue('id')}</div>,
    },
    {
      accessorKey: 'name',
      header: '이름',
      cell: ({ row }) => <div>{row.getValue('name')}</div>,
    },
    {
      accessorKey: 'count',
      header: '주문 횟수',
      cell: ({ row }) => <div>{Number(row.getValue('count')).toLocaleString()}</div>,
    },
    {
      accessorKey: 'totalAmount',
      header: () => (
        <Button
          variant="ghost"
          onClick={() =>
            updateSortBy(filter.sortBy === undefined ? 'desc' : filter.sortBy === 'desc' ? 'asc' : undefined)
          }
        >
          총 주문 금액
          <ArrowUpDown />
        </Button>
      ),
      cell: ({ row }) => {
        return <div>{Number(row.getValue('totalAmount')).toLocaleString()}원</div>
      },
    },
  ]

  const updateSortBy = (sortBy: 'asc' | 'desc' | undefined) => {
    setFilter({ ...filter, sortBy })
  }

  const updateName = (name: string) => {
    setFilter({ ...filter, name })
  }

  const resetFilter = () => {
    setFilter({ name: undefined, sortBy: undefined })
  }

  return {
    columns,
    filter,
    updateSortBy,
    updateName,
    resetFilter,
  }
}
