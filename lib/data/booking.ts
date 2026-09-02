export type BookingType = {
    id: number;
    matchId: number;
    homeTeam: string;
    awayTeam: string;
    date: Date;
    seats: number;
    amountPaid: number;
  };
  
  export const bookingHistory: BookingType[] = [
    {
      id: 1,
      matchId: 1,
      homeTeam: "Man City",
      awayTeam: "Arsenal",
      date: new Date("2026-10-20T20:00:00"),
      seats: 2,
      amountPaid: 2 * 1000,
    },
    {
      id: 2,
      matchId: 3,
      homeTeam: "Liverpool",
      awayTeam: "Chelsea",
      date: new Date("2026-06-22T19:30:00"),
      seats: 1,
      amountPaid: 1 * 1000,
    },
    {
      id: 3,
      matchId: 5,
      homeTeam: "Tottenham",
      awayTeam: "Newcastle",
      date: new Date("2025-05-14T17:30:00"),
      seats: 3,
      amountPaid: 3 * 1000,
    },
    {
      id: 4,
      matchId: 7,
      homeTeam: "Manchester United",
      awayTeam: "Aston Villa",
      date: new Date("2025-12-02T16:00:00"),
      seats: 1,
      amountPaid: 1 * 1000,
    },
    {
      id: 5,
      matchId: 2,
      homeTeam: "Real Madrid",
      awayTeam: "Bayern Munich",
      date: new Date("2026-11-21T21:00:00"),
      seats: 4,
      amountPaid: 4 * 1000,
    },
    {
      id: 6,
      matchId: 8,
      homeTeam: "Senegal",
      awayTeam: "Egypt",
      date: new Date("2025-01-19T19:00:00"),
      seats: 2,
      amountPaid: 2 * 1000,
    },
    {
      id: 7,
      matchId: 9,
      homeTeam: "Juventus",
      awayTeam: "AC Milan",
      date: new Date("2026-07-01T21:00:00"),
      seats: 1,
      amountPaid: 1 * 1000,
    },
    {
      id: 8,
      matchId: 4,
      homeTeam: "Nigeria",
      awayTeam: "Ghana",
      date: new Date("2026-06-24T18:00:00"),
      seats: 5,
      amountPaid: 5 * 1000,
    },
    {
      id: 9,
      matchId: 6,
      homeTeam: "PSG",
      awayTeam: "Barcelona",
      date: new Date("2024-11-08T20:45:00"),
      seats: 2,
      amountPaid: 2 * 1000,
    },
    {
      id: 10,
      matchId: 10,
      homeTeam: "Brighton",
      awayTeam: "West Ham",
      date: new Date("2026-10-05T15:00:00"),
      seats: 3,
      amountPaid: 3 * 1000,
    },
  ];