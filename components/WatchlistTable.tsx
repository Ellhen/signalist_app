'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import { WATCHLIST_TABLE_HEADER } from '@/lib/constants'

export default function WatchlistTable({
  items
}: {
  items: {
    _id: string
    userId: string
    symbol: string
    company: string
    addedAt: string
  }[]
  userId: string
}) {
  const [rows, setRows] = useState(items)

  return (
    <Table className="custom-scrollbar">
      <TableHeader>
        <TableRow className="hover:bg-transparent">
          {WATCHLIST_TABLE_HEADER.map(header => (
            <TableHead
              key={header}
              className="bg-dark-400 py-4 text-left text-purple-100 first:pl-5 last:pr-5"
            >
              {header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {rows.map(stock => (
          <TableRow
            key={stock._id}
            className="relative overflow-hidden rounded-lg border-b border-purple-100/5 hover:bg-dark-400/30"
          >
            <TableCell className="py-4 text-left first:pl-5 last:pr-5">
              {stock.company}
            </TableCell>
            <TableCell className="py-4 text-left">{stock.symbol}</TableCell>
            <TableCell className="py-4 text-left">-</TableCell>
            <TableCell className="py-4 text-left">-</TableCell>
            <TableCell className="py-4 text-left">-</TableCell>
            <TableCell className="py-4 text-left">-</TableCell>
            <TableCell className="py-4 text-left">-</TableCell>
            <TableCell className="py-4 text-left last:pr-5"></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
