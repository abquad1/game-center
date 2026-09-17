'use client'
import { UpcomingMatch, upcomingMatchesData } from "@/lib/data/matches";


function getStatus(ratio: number) {
  if (ratio >= 1) return { label: "Sold Out", className: "bg-red-500/10 text-red-400" };
  if (ratio >= 0.5) return { label: "Active", className: "bg-green-500/10 text-green-400" };
  return { label: "Upcoming", className: "bg-amber-500/10 text-amber-400" };
}

function MatchRow({ match }: { match: UpcomingMatch }) {
  const ratio = match.seatsSold / match.seatsTotal;
  const status = getStatus(ratio);
  const barColor = ratio >= 0.5 ? "bg-green-500" : "bg-amber-500";

  return (
    <div className="flex items-center justify-between gap-6 border-b border-foreground/10 px-2 py-4 last:border-none">
      <div className="flex flex-col gap-1">
        <span className="font-semibold text-foreground">
          {match.homeTeam} vs {match.awayTeam}
        </span>
        <span className="text-xs text-foreground/40">
          {match.league} &middot; {match.date} &middot; {match.time}
        </span>
      </div>

      <div className="flex items-center gap-6 flex-1 justify-end">
        <div className="w-40 h-1.5 rounded-full bg-foreground/10 overflow-hidden hidden sm:block">
          <div
            className={`h-full rounded-full ${barColor}`}
            style={{ width: `${Math.min(ratio, 1) * 100}%` }}
          />
        </div>

        <span className="text-sm text-foreground/60 w-14 text-right">
          {match.seatsSold}/{match.seatsTotal}
        </span>

        <span className={`text-xs px-3 py-1 rounded-md ${status.className}`}>
          {status.label}
        </span>
      </div>
    </div>
  );
}

export default function UpcomingMatchesPanel() {
  return (
    <section className="bg-primary border border-foreground/10 rounded-lg p-4">

      <div className="flex flex-col mb-8">
        {upcomingMatchesData.slice(0, 2).map((match) => (
          <MatchRow key={match.id} match={match} />
        ))}
      </div>
    </section>
  );
}