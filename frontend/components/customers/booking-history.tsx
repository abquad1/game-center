import { bookingHistory } from "@/lib/data/booking"

export default function BookingHistoryTable() {
  const now = new Date()

  return (
    <table className="w-full text-sm text-left border border-foreground/10 rounded-lg overflow-hidden">
      <thead className="bg-primary text-foreground/60 uppercase text-xs">
        <tr>
          <th className="px-4 py-3">Match</th>
          <th className="px-4 py-3">Date</th>
          <th className="px-4 py-3">Seats</th>
          <th className="px-4 py-3">Amount Paid</th>
          <th className="px-4 py-3">Status</th>
        </tr>
      </thead>
      <tbody>
        {bookingHistory.map((booking) => {
          const isUpcoming = booking.date > now

          return (
            <tr key={booking.id} className="border-t border-foreground/10">
              <td className="px-4 py-3 text-foreground/80">
                {booking.homeTeam} vs {booking.awayTeam}
              </td>
              <td className="px-4 py-3 text-foreground/60">
                {booking.date.toLocaleDateString('en-GB', {
                  weekday: 'short',
                  day: 'numeric',
                  month: 'short',
                  year: 'numeric',
                })}
              </td>
              <td className="px-4 py-3">{booking.seats}</td>
              <td className="px-4 py-3">₦{booking.amountPaid.toLocaleString()}</td>
              <td className="px-4 py-3">
                <span
                  className={`px-2 py-1 rounded-md text-xs border ${
                    isUpcoming
                      ? 'text-secondary-foreground border-secondary-foreground'
                      : 'text-foreground/40 border-foreground/20'
                  }`}
                >
                  {isUpcoming ? 'Upcoming' : 'Past'}
                </span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}