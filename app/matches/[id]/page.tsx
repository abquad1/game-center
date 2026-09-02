import Link from "next/link"
import { upcomingMatches } from '@/lib/data/matches'
import { notFound } from "next/navigation"
import { IoIosArrowBack } from "react-icons/io"
import SeatSelector from "./seat-selector"

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const match = upcomingMatches.find((m) => m.id === Number(id))

  if (!match) return notFound()

  return (
    <div className="flex flex-col gap-4">
      <Link href="/matches" className="flex gap-2 text-sm items-center text-secondary-foreground hover:underline w-fit">
        <IoIosArrowBack />
        Back to matches
      </Link>

      <div className="bg-primary text-sm text-foreground border border-foreground/10 px-6 py-4 flex flex-col justify-between w-full rounded-lg">
        <h1 className="text-secondary-foreground">MATCH DETAILS</h1>

        <div className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl">{match.homeTeam} vs {match.awayTeam}</h3>
            <p>{match.time}</p>
          </div>
          <div className="flex flex-col gap-4 items-end">
            <p>{match.league}</p>
            <p>{match.date}</p>
            <span className='text-secondary px-2 py-1 rounded-md w-fit border border-secondary text-xs'>
              {match.seatsLeft !== null
                ? `${match.seatsLeft} seat${match.seatsLeft > 1 ? 's' : ''} remaining`
                : 'Sold out'}
            </span>
          </div>
        </div>
      </div>

      {/* Seats selection — client component, receives plain data as props */}
      {!match.soldOut && match.seatsLeft !== null && (
        <SeatSelector match={match} />
        )}


    </div>
  )
}