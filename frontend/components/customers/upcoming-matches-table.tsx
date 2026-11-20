"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import MatchBookingDialog from "./match-booking-dialog";
import type { MatchDetails } from "@/lib/data/matches";
import { formatMatchDate } from "@/lib/match-filters";

type UpcomingMatchesTableProps = {
  matches: MatchDetails[];
};

export default function UpcomingMatchesTable({
  matches,
}: UpcomingMatchesTableProps) {
  return (
    <div className="mt-4 rounded-lg border border-foreground/10 overflow-x-auto w-full mb-8 ">
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
                className="bg-primary text-sm text-foreground/30"
              >
                <TableCell>{match.competition}</TableCell>
                <TableCell className="text-foreground/80">
                  <div className="flex items-center gap-2">
                    <span>{match.homeTeam}</span>
                    <span>vs</span>
                    <span>{match.awayTeam}</span>
                    {/* {match.tag && <span className="text-xs text-secondary ml-1">{match.tag}</span>} */}
                  </div>
                </TableCell>
                <TableCell>{time}</TableCell>
                <TableCell className="text-xs">{day}</TableCell>
                <TableCell className="text-xs">
                  <h6 className="text-secondary-foreground">
                    {match.totalSeats === 0
                      ? "Sold out"
                      : `${match.totalSeats} seats left`}
                  </h6>
                </TableCell>
                <TableCell className="text-right">
                  <MatchBookingDialog match={match} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
