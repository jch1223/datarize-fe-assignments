'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { useCustomersQuery } from '@/pages/dashboard/api/customer/hooks/useCustomerQuery'
import { Customer } from '@/pages/dashboard/api/customer/customer'
import { useCustomerTable } from '@/pages/dashboard/components/customerTable/hooks/useCustomerTable'
import { SearchNameInput } from '@/pages/dashboard/components/customerTable/searchNameInput'
import { CustomerDetailSheet } from '@/pages/dashboard/components/customerDetailSheet/customerDetailSheet'

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
                    <TableHead key={header.id}>
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
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
