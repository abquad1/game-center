'use client'
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/context/authContext"
import { upcomingMatches } from '@/lib/data/matches'
import Link from 'next/link'

function MatchesList() {
    const {userLoggedIn} = useAuth()
  return (
    <section>
      <div className="flex flex-col gap-2">
        {upcomingMatches.map((match) => (
          <div key={match.id} className="bg-primary text-sm text-foreground/30 border border-foreground/10 px-6 py-4 flex flex-row items-center gap-12 w-full rounded-lg">
            <span>{match.league}</span>

            <div className="space-x-2 text-foreground/80">
              <span>{match.homeTeam}</span>
              <span>vs</span>
              <span>{match.awayTeam}</span>
            </div>

            {match.tag && <span className="text-xs text-secondary">{match.tag}</span>}
            <span>{match.time}</span>
            <span className="text-xs">{match.date}</span>
            <span className="text-xs flex items-center gap-1">
              <h6 className="text-secondary-foreground">
                {match.soldOut ? "Sold out" : `${match.seatsLeft} seats left`}
              </h6>
            </span>

            {match.soldOut ? (
              <Button disabled className="text-foreground p-2 rounded-md disabled:bg-transparent">
                Full
              </Button>
            ) : (
              <Button disabled={!userLoggedIn} className="cursor-pointer text-foreground p-2 rounded-md disabled:bg-transparent">
                <Link href={`/matches/${match.id}`}>
                  Book (₦{match.price.toLocaleString()})
                </Link>
              </Button>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}

export default MatchesList