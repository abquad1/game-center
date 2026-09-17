'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export type Booking = {
  id: string;
  bookingId: string;
  fullName: string;
  numberOfTickets: number;
  time: string;
};

export const bookings: Booking[] = [
  { id: "1", bookingId: "KLO-483918", fullName: "Chukwu Okafor", numberOfTickets: 2, time: "8:02pm" },
  { id: "2", bookingId: "KLO-491207", fullName: "Aisha Bello", numberOfTickets: 1, time: "7:45pm" },
  { id: "3", bookingId: "KLO-502334", fullName: "Tunde Adewale", numberOfTickets: 4, time: "8:15pm" },
];

function getInitials(fullName: string) {
  return fullName
    .trim()
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function BookingsList() {
  return (
    <section className="rounded-lg border border-foreground/10 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead>Full Name</TableHead>
            <TableHead>Booking ID</TableHead>
            <TableHead>No. of Tickets</TableHead>
            <TableHead className="text-right">Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.map((booking) => (
            <TableRow key={booking.id} className="bg-primary text-sm text-foreground/30">
              <TableCell className="text-foreground/80">
                <div className="flex items-center gap-3">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-foreground/20 text-xs font-semibold text-foreground">
                    {getInitials(booking.fullName)}
                  </span>
                  <span>{booking.fullName}</span>
                </div>
              </TableCell>
              <TableCell>{booking.bookingId}</TableCell>
              <TableCell>{booking.numberOfTickets}</TableCell>
              <TableCell className="text-right text-xs">{booking.time}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default BookingsList