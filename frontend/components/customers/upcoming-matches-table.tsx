'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAuth } from '@/lib/context/authContext'
import MatchBookingDialog from './match-booking-dialog'
import type { MatchType } from "@/lib/data/matches"

type UpcomingMatchesTableProps = {
  matches: MatchType[]
}

export default function UpcomingMatchesTable({ matches }: UpcomingMatchesTableProps) {
  const { userLoggedIn } = useAuth()

  return (
    <div className="mt-4 rounded-lg border border-foreground/10 overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-primary hover:bg-primary">
            <TableHead>League</TableHead>
            <TableHead>Match</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Availability</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {matches.map((match) => (
            <TableRow key={match.id} className="bg-primary text-sm text-foreground/30">
              <TableCell>{match.league}</TableCell>
              <TableCell className="text-foreground/80">
                <div className="flex items-center gap-2">
                  <span>{match.homeTeam}</span>
                  <span>vs</span>
                  <span>{match.awayTeam}</span>
                  {match.tag && <span className="text-xs text-secondary ml-1">{match.tag}</span>}
                </div>
              </TableCell>
              <TableCell>{match.time}</TableCell>
              <TableCell className="text-xs">{match.date}</TableCell>
              <TableCell className="text-xs">
                <h6 className="text-secondary-foreground">
                  {match.soldOut ? "Sold out" : `${match.seatsLeft} seats left`}
                </h6>
              </TableCell>
              <TableCell className="text-right">
                <MatchBookingDialog match={match} userLoggedIn={userLoggedIn} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}