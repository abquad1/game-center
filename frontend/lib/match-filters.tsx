import { MatchDetails } from "./data/matches";

function isSameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

export function categorizeMatches(
  matches: MatchDetails[],
  now: Date = new Date(),
) {
  const active: MatchDetails[] = [];
  const upcoming: MatchDetails[] = [];
  const past: MatchDetails[] = [];

  for (const match of matches) {
    const matchDate = new Date(match.kickoffTime);

    if (isSameDay(matchDate, now)) {
      active.push(match);
    } else if (matchDate.getTime() > now.getTime()) {
      upcoming.push(match);
    } else {
      past.push(match);
    }
  }

  upcoming.sort(
    (a, b) =>
      new Date(a.kickoffTime).getTime() - new Date(b.kickoffTime).getTime(),
  );
  past.sort(
    (a, b) =>
      new Date(b.kickoffTime).getTime() - new Date(a.kickoffTime).getTime(),
  );

  return { active, upcoming, past };
}

export function formatMatchDate(dateTime: string) {
  const d = new Date(dateTime);
  const day = d.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
  const time = d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  return { day, time };
}
