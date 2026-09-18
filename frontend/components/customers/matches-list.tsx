'use client'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useAuth } from "@/lib/context/authContext"
import { upcomingMatches } from '@/lib/data/matches'
import Link from 'next/link'

function MatchesList() {
  const { userLoggedIn } = useAuth()

  return (
    <section className="rounded-lg border border-foreground/10 overflow-x-auto w-full">
      <Table >
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
          {upcomingMatches.map((match) => (
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
                {match.soldOut ? (
                  <Button disabled className="text-foreground p-2 rounded-md disabled:bg-transparent">
                    Full
                  </Button>
                ) : (
                  <Button
                    disabled={!userLoggedIn}
                    nativeButton={false}
                    className="cursor-pointer text-foreground p-2 rounded-md disabled:bg-transparent"
                    render={
                      <Link href={`/matches/${match.id}`}>
                        Book (₦{match.price.toLocaleString()})
                      </Link>
                    }
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </section>
  )
}

export default MatchesList