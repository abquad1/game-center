import Link from "next/link";
import { notFound } from "next/navigation";
import { IoIosArrowBack } from "react-icons/io";
import SeatSelector from "./seat-selector";
import { formatMatchDate } from "@/lib/match-filters";
import { getMatch } from "@/lib/get-match";

export default async function MatchDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const match = await getMatch(id);

  if (!match) return notFound(); // check BEFORE using match

  const { day, time } = formatMatchDate(match.kickoffTime);
  const soldOut = match.totalSeats <= 0;

  return (
    <div className="flex flex-col gap-4">
      <Link
        href="/matches"
        className="flex gap-2 text-sm items-center text-secondary-foreground hover:underline w-fit"
      >
        <IoIosArrowBack />
        Back to matches
      </Link>

      <div className="bg-primary text-sm text-foreground border border-foreground/10 px-6 py-4 flex flex-col justify-between w-full rounded-lg">
        <h1 className="text-secondary-foreground">MATCH DETAILS</h1>

        <div className="flex flex-row items-center justify-between">
          <div>
            <h3 className="text-2xl">
              {match.homeTeam} vs {match.awayTeam}
            </h3>
            <p>{time}</p>
          </div>
          <div className="flex flex-col gap-4 items-end">
            <p>{match.competition}</p>
            <p>{day}</p>
            <span className="text-secondary-foreground px-2 py-1 rounded-md w-fit border border-secondary text-xs">
              {soldOut
                ? "Sold out"
                : `${match.totalSeats} seat${match.totalSeats > 1 ? "s" : ""} remaining`}
            </span>
          </div>
        </div>
      </div>

      {!soldOut && <SeatSelector match={match} />}
    </div>
  );
}
