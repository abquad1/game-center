'use client'
import { useMemo, useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { customers, Customer } from '@/lib/data/customers'
import CustomerDetailDialog from './customer-detail-dialog'

function getInitials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

const tabs = [
  { key: 'all', label: 'All' },
  { key: 'frequent', label: 'Frequent' },
  { key: 'new', label: 'New' },
  { key: 'inactive', label: 'Inactive' },
] as const

export default function CustomersTable() {
  const [activeTab, setActiveTab] = useState<typeof tabs[number]['key']>('all')
  const [search, setSearch] = useState('')
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null)

  const counts = useMemo(() => ({
    all: customers.length,
    frequent: customers.filter((c) => c.status === 'frequent').length,
    new: customers.filter((c) => c.status === 'new').length,
    inactive: customers.filter((c) => c.status === 'inactive').length,
  }), [])

  const filtered = useMemo(() => {
    return customers.filter((c) => {
      const matchesTab = activeTab === 'all' || c.status === activeTab
      const query = search.trim().toLowerCase()
      const matchesSearch = !query || c.name.toLowerCase().includes(query) || c.phone.includes(query)
      return matchesTab && matchesSearch
    })
  }, [activeTab, search])

  return (
    <div className="w-full relative flex flex-col gap-8 md:gap-4">
      <div className="w-full flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0">
        <h2 className="text-xl font-semibold text-foreground">
          Customers <span className="text-foreground/40 font-normal">({customers.length})</span>
        </h2>
        <div className="flex items-center gap-3">
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name or phone..."
            className="bg-[#0f0f12] border-foreground/10 w-64"
          />
          <Button className="bg-foreground/10 hover:bg-foreground/20">Export</Button>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeTab === tab.key
                ? 'bg-secondary-foreground text-black font-semibold'
                : 'bg-foreground/5 text-foreground/60 hover:bg-foreground/10'
            }`}
          >
            {tab.label} ({counts[tab.key]})
          </button>
        ))}
      </div>

      <div className="rounded-lg border border-foreground/10 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className='pl-2 md:pl-8'>Customer</TableHead>
              <TableHead>Phone</TableHead>
              <TableHead>Matches</TableHead>
              <TableHead>Total Spent</TableHead>
              <TableHead className="text-right pr-2 md:pr-8">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((customer) => (
              <TableRow key={customer.id} className="bg-primary text-sm text-foreground/40">
                <TableCell className="text-foreground/80 pl-2 md:pl-8">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold text-foreground">
                      {getInitials(customer.name)}
                    </span>
                    <div className="flex flex-col">
                      <span className="text-foreground font-medium">{customer.name}</span>
                      <span className="text-xs text-foreground/40">{customer.email}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer.phone}</TableCell>
                <TableCell>{customer.matches} match{customer.matches !== 1 ? 'es' : ''}</TableCell>
                <TableCell className="text-secondary">₦{customer.totalSpent.toLocaleString()}</TableCell>
                <TableCell className="text-right pr-2 md:pr-8">
                  <button
                    onClick={() => setSelectedCustomer(customer)}
                    className="text-secondary-foreground hover:underline text-sm"
                  >
                    View
                  </button>
                </TableCell>
              </TableRow>
            ))}

            {filtered.length === 0 && (
              <TableRow className="bg-primary">
                <TableCell colSpan={5} className="text-center text-foreground/30 py-8">
                  No customers found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <CustomerDetailDialog
        customer={selectedCustomer}
        onOpenChangeAction={(open) => !open && setSelectedCustomer(null)}
      />
    </div>
  )
}