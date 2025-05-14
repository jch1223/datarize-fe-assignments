'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/ui/table'
import { useCustomersQuery } from '@/pages/dashboard/api/customer/hooks/useCustomerQuery'
import { Customer } from '@/pages/dashboard/api/customer/customer'
import { useCustomerTable } from '@/pages/dashboard/components/customerTable/hooks/useCustomerTable'
import { SearchNameInput } from '@/pages/dashboard/components/customerTable/searchNameInput'
import { Sheet, SheetContent, SheetTrigger } from '@/shared/ui/sheet'
import { CustomerDetail } from '@/pages/dashboard/components/customerDetail/customerDetail'
import { Suspense } from 'react'
import { ErrorBoundary } from '@/shared/ui/errorBoundary'

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

  const handleRowClick = (id: string) => {
    console.log(id)
  }

  return (
    <div>
      <SearchNameInput name={filter.name} onSubmit={handleNameSubmit} onReset={handleResetFilter} />
      <CustomerTableImp data={data} columns={columns} onRowClick={handleRowClick} />
    </div>
  )
}

interface CustomerTableProps {
  data: Customer[]
  columns: ColumnDef<Customer>[]
  onRowClick: (id: string) => void
}

export function CustomerTableImp({ data, columns, onRowClick }: CustomerTableProps) {
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
              table.getRowModel().rows.map((row) => (
                <Sheet key={row.id}>
                  <SheetTrigger asChild>
                    <TableRow key={row.id} onClick={() => onRowClick(row.original.id)}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  </SheetTrigger>
                  <SheetContent>
                    <ErrorBoundary fallback={<div>Error</div>}>
                      <Suspense fallback={<div>Loading...</div>}>
                        <CustomerDetail id={row.original.id} />
                      </Suspense>
                    </ErrorBoundary>
                  </SheetContent>
                </Sheet>
              ))
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
