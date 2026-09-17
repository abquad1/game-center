'use client'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { Customer } from '@/lib/data/customers'

const statusStyles: Record<string, string> = {
  Upcoming: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  Used: 'bg-green-500/10 text-green-400 border-green-500/30',
  Cancelled: 'bg-red-500/10 text-red-400 border-red-500/30',
}

function getInitials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

type CustomerDetailDialogProps = {
  customer: Customer | null
  onOpenChangeAction: (open: boolean) => void
}

export default function CustomerDetailDialog({ customer, onOpenChangeAction }: CustomerDetailDialogProps) {
  return (
    <Dialog open={!!customer} onOpenChange={onOpenChangeAction}>
      <DialogContent className="sm:max-w-sm bg-primary">
        {customer && (
          <>
            <DialogHeader>
              <DialogTitle className="text-secondary-foreground text-xs tracking-widest uppercase text-center">
                Selected customer
              </DialogTitle>
            </DialogHeader>

            <div className="flex flex-col items-center gap-2">
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-white text-xl font-semibold">
                {getInitials(customer.name)}
              </span>
              <h3 className="text-lg font-semibold text-foreground mt-1">{customer.name}</h3>
              <p className="text-sm text-foreground/50">{customer.phone}</p>
              <p className="text-sm text-foreground/50">{customer.email}</p>
              <span className="text-xs px-3 py-1 rounded-md bg-foreground/10 text-foreground/60 mt-1">
                Member &middot; {customer.memberSince}
              </span>
            </div>

            <div className="flex gap-3 mt-4">
              <div className="flex-1 bg-[#0f0f12] border border-foreground/10 rounded-lg py-3 flex flex-col items-center">
                <span className="text-xl font-semibold text-foreground">{customer.matches}</span>
                <span className="text-xs text-foreground/40">Matches</span>
              </div>
              <div className="flex-1 bg-[#0f0f12] border border-foreground/10 rounded-lg py-3 flex flex-col items-center">
                <span className="text-xl font-semibold text-secondary">₦{(customer.totalSpent / 1000).toFixed(0)}k</span>
                <span className="text-xs text-foreground/40">Spent</span>
              </div>
            </div>

            <div className="mt-4">
              <p className="text-xs text-foreground/40 uppercase tracking-widest mb-2">Recent bookings</p>
              <div className="flex flex-col gap-2">
                {customer.recentBookings.map((booking, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-foreground">{booking.match}</p>
                      <p className="text-xs text-foreground/40">{booking.date} &middot; {booking.seats} seat{booking.seats > 1 ? 's' : ''}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-md border ${statusStyles[booking.status]}`}>
                      {booking.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}