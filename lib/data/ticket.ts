export type TicketType = {
    id: number;
    bookingId: string;       // e.g. "KLO-391047"
    homeTeam: string;
    awayTeam: string;
    league: string;
    date: Date;
    seats: number;
  };
  
  export const myTickets: TicketType[] = [
    {
      id: 1,
      bookingId: "KLO-391047",
      homeTeam: "Real Madrid",
      awayTeam: "Bayern Munich",
      league: "UCL",
      date: new Date("2026-06-21T21:00:00"),
      seats: 1,
    },
    {
      id: 2,
      bookingId: "KLO-482910",
      homeTeam: "Man City",
      awayTeam: "Arsenal",
      league: "Premier League",
      date: new Date("2026-06-20T20:00:00"),
      seats: 2,
    },
    {
      id: 3,
      bookingId: "KLO-217563",
      homeTeam: "Liverpool",
      awayTeam: "Chelsea",
      league: "Premier League",
      date: new Date("2026-10-14T19:30:00"), // past → "Used"
      seats: 1,
    },
  ];