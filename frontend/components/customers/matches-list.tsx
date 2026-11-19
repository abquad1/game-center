"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetMatchesQuery } from "@/lib/api/matches-api";
import { formatMatchDate } from "@/lib/match-filters";
import { useProfile } from "@/lib/utils/use-profile";
import Link from "next/link";

function MatchesList() {
  const { isAuthenticated } = useProfile();
  const today = new Date();
  const date = today.toISOString().split("T")[0];

  const { data: matches = [] } = useGetMatchesQuery({
    date,
  });

  console.log(matches);

  return (
    <section className="rounded-lg border border-foreground/10 overflow-x-auto w-full">
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
          {matches.map((match) => {
            const { day, time } = formatMatchDate(match.kickoffTime);

            return (
              <TableRow
                key={match.id}
                className="bg-primary text-sm text-foreground/60"
              >
                <TableCell>{match.competition}</TableCell>
                <TableCell className="text-foreground/80">
                  <div className="flex items-center gap-2">
                    <span>{match.homeTeam}</span>
                    <span>vs</span>
                    <span>{match.awayTeam}</span>
                    {/* {match.tag && (
                    <span className="text-xs text-secondary ml-1">
                      {match.tag}
                    </span>
                  )} */}
                  </div>
                </TableCell>
                <TableCell>{time}</TableCell>
                <TableCell className="text-xs">{date}</TableCell>
                <TableCell className="text-xs">
                  <p className="font-bold text-secondary-foreground">
                    {match.pricePerSeat === 0
                      ? "Sold out"
                      : `${match.totalSeats} seats left`}
                  </p>
                </TableCell>
                <TableCell className="text-right">
                  {50 - match.totalSeats > 0 ? (
                    <Button
                      disabled
                      className="text-foreground p-2 rounded-md disabled:bg-transparent"
                    >
                      Full
                    </Button>
                  ) : isAuthenticated ? (
                    <Button
                      nativeButton={false}
                      className="cursor-pointer text-foreground p-2 rounded-md"
                      render={
                        <Link href={`/matches/${match.id}`}>
                          Book (₦{match.pricePerSeat.toLocaleString()})
                        </Link>
                      }
                    />
                  ) : (
                    <Button
                      disabled
                      className="text-foreground p-2 rounded-md disabled:bg-transparent"
                    >
                      Login to book
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </section>
  );
}

export default MatchesList;
