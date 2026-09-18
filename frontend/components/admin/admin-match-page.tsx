'use client'
import { useMemo, useState } from 'react'
import AddMatchDialog, { NewMatchInput } from './add-match-dialog'
import { adminMatches, AdminMatch } from '@/lib/data/admin-matches'
import { categorizeMatches, formatMatchDate } from '@/lib/match-filters'

function MatchRow({ match, section }: { match: AdminMatch; section: 'active' | 'upcoming' | 'past' }) {
  const { day, time } = formatMatchDate(match.dateTime)
  const ratio = match.seatsBooked / match.seatsTotal

  const style =
    section === 'active'
      ? { badge: 'bg-green-500/10 text-green-400 border-green-500/30', bar: 'bg-green-500', label: 'Active' }
      : { badge: 'bg-amber-500/10 text-amber-400 border-amber-500/30', bar: 'bg-amber-500', label: 'Upcoming' }

  const buttons =
    section === 'active'
      ? ['Edit match', `View bookings (${match.seatsBooked})`, 'Export list', 'Cancel match']
      : ['Edit', `Bookings (${match.seatsBooked})`, 'Cancel']

  if (section === 'past') {
    return (
      <div className="flex items-center justify-between gap-6 px-2 md:px-6 py-4 border border-foreground/10 rounded-lg mb-3 text-foreground/40">
        <div>
          <h3 className="text-sm md:text-base font-medium">{match.homeTeam} vs {match.awayTeam}</h3>
          <p className="text-xs mt-1">{match.competition} &middot; {day} &middot; {time}</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <span>{match.seatsTotal} / {match.seatsTotal} seats &middot; ₦{(match.seatsBooked * match.ticketPrice).toLocaleString()}</span>
          <button className="text-secondary-foreground hover:underline">View →</button>
        </div>
      </div>
    )
  }

  return (
    <div className="border border-foreground/10 rounded-lg overflow-hidden mb-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 px-2 md:px-6 py-4">
        <div>
          <h3 className="font-semibold text-foreground text-sm md:text-lg">{match.homeTeam} vs {match.awayTeam}</h3>
          <p className="text-xs text-foreground/40 mt-1">{match.competition} &middot; {day} &middot; {time}</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-end gap-1 w-40">
            <div className="w-full h-1.5 rounded-full bg-foreground/10 overflow-hidden">
              <div className={`h-full rounded-full ${style.bar}`} style={{ width: `${Math.min(ratio, 1) * 100}%` }} />
            </div>
            <span className="text-xs text-foreground/40">{match.seatsBooked} / {match.seatsTotal} seats</span>
          </div>
          <span className={`text-xs px-3 py-1 rounded-md border ${style.badge}`}>{style.label}</span>
        </div>
      </div>

      <div className="grid border-t border-foreground/10 text-sm" style={{ gridTemplateColumns: `repeat(${buttons.length}, 1fr)` }}>
        {buttons.map((label, i) => (
          <button
            key={label}
            className={`py-3 text-center hover:bg-foreground/5 transition-colors ${
              label.startsWith('Cancel') ? 'text-red-400' : 'text-foreground/70'
            } ${i !== buttons.length - 1 ? 'border-r border-foreground/10' : ''}`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  )
}

export default function MatchesPage() {
  const [matches, setMatches] = useState<AdminMatch[]>(adminMatches)

  const { active, upcoming, past } = useMemo(() => categorizeMatches(matches), [matches])

  const handleCreateMatch = (input: NewMatchInput) => {
    const newMatch: AdminMatch = {
      id: crypto.randomUUID(),
      homeTeam: input.homeTeam,
      awayTeam: input.awayTeam,
      competition: input.competition || 'Friendly',
      dateTime: `${input.date}T${input.time}:00`,
      seatsBooked: 0,
      seatsTotal: Number(input.seatCapacity) || 0,
      ticketPrice: Number(input.ticketPrice) || 0,
    }
    setMatches((prev) => [...prev, newMatch])
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-foreground">Matches</h2>
        <AddMatchDialog onCreateAction={handleCreateMatch} />
      </div>

      {active.length > 0 && (
        <div>
          <p className="text-xs text-foreground/40 uppercase tracking-widest mb-3">Active tonight</p>
          {active.map((match) => <MatchRow key={match.id} match={match} section="active" />)}
        </div>
      )}

      <div>
        <p className="text-xs text-foreground/40 uppercase tracking-widest mb-3">Upcoming</p>
        {upcoming.length > 0
          ? upcoming.map((match) => <MatchRow key={match.id} match={match} section="upcoming" />)
          : <p className="text-sm text-foreground/30">No upcoming matches.</p>}
      </div>

      <div>
        <p className="text-xs text-foreground/40 uppercase tracking-widest mb-3">Past matches</p>
        {past.map((match) => <MatchRow key={match.id} match={match} section="past" />)}
      </div>
    </div>
  )
}