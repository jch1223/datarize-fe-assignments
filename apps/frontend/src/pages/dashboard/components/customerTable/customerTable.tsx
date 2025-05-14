'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { useCustomersQuery } from '@/pages/dashboard/api/customer/hooks/useCustomerQuery'
import { Customer } from '@/pages/dashboard/api/customer/customer'
import { useCustomerTable } from '@/pages/dashboard/components/customerTable/hooks/useCustomerTable'
import { SearchNameInput } from '@/pages/dashboard/components/customerTable/searchNameInput'
import { CustomerDetailSheet } from '@/pages/dashboard/components/customerDetailSheet/customerDetailSheet'
import { Skeleton } from '@/shared/ui/skeleton'
import { HTTPError } from 'ky'

export const CustomerTable = () => {
  const { columns, filter, updateName, resetFilter } = useCustomerTable()
  const { data } = useCustomersQuery({
    name: filter.name,
    sortBy: filter.sortBy,
  })

  const handleNameSubmit = (name?: string) => {
    if (!name) return
    updateName(name)
  }

  const handleResetFilter = () => {
    resetFilter()
  }

  return (
    <div>
      <SearchNameInput name={filter.name} onSubmit={handleNameSubmit} onReset={handleResetFilter} />
      <CustomerTableImp data={data} columns={columns} />
    </div>
  )
}

interface CustomerTableProps {
  data: Customer[]
  columns: ColumnDef<Customer>[]
}

export function CustomerTableImp({ data, columns }: CustomerTableProps) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="w-full">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="w-1/4 text-center">
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => {
                return (
                  <CustomerDetailSheet id={row.original.id} name={row.original.name} key={row.id}>
                    <TableRow>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id} className="text-center">
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  </CustomerDetailSheet>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  검색 결과가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

const CustomerTableError = ({ error, onReset }: { error: HTTPError | Error; onReset: () => void }) => {
  const isHttpError = error instanceof HTTPError

  if (isHttpError && error.response.status === 404) {
    return <CustomerNotFound onReset={onReset} />
  }

  return (
    <div className="h-[400px] flex items-center justify-center">
      <div>
        {isHttpError
          ? `API 에러가 발생했습니다. (상태 코드: ${error.response.status})`
          : `에러가 발생했습니다: ${error.message}`}
        <br />
        잠시 후 다시 시도해주세요.
      </div>
    </div>
  )
}

const CustomerNotFound = ({ onReset }: { onReset: () => void }) => {
  const { filter, updateName, resetFilter } = useCustomerTable()

  const handleNameSubmit = (name?: string) => {
    if (!name) return
    updateName(name)
    onReset()
  }

  const handleResetFilter = () => {
    resetFilter()
    onReset()
  }

  return (
    <div>
      <SearchNameInput name={filter.name} onSubmit={handleNameSubmit} onReset={handleResetFilter} />
      <div>고객이 없습니다. 다시 검색해주세요.</div>
    </div>
  )
}

const CustomerTableSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Skeleton className="h-10 w-[240px]" />
        <Skeleton className="h-10 w-[100px]" />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Array(4)
                .fill(0)
                .map((_, index) => (
                  <TableHead key={index} className="w-1/4 text-center">
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array(10)
              .fill(0)
              .map((_, rowIndex) => (
                <TableRow key={rowIndex}>
                  {Array(4)
                    .fill(0)
                    .map((_, cellIndex) => (
                      <TableCell key={cellIndex} className="text-center">
                        <Skeleton className="h-6 w-full mx-auto" />
                      </TableCell>
                    ))}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

CustomerTable.Error = CustomerTableError
CustomerTable.Skeleton = CustomerTableSkeleton
