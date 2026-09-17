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

  // for admin
  // lib/data/ticket.ts

export type Ticket = {
  bookingId: string;
  fullName: string;
  match: string;
  numberOfTickets: number;
  paid: string;
  bookedAt: string;
};

export const tickets: Ticket[] = [
  {
    bookingId: "KLO-483918",
    fullName: "Chukwuemeka Obi",
    match: "Man City vs Arsenal",
    numberOfTickets: 2,
    paid: "2,000",
    bookedAt: "Fri 20 Jun · 3:14 PM",
  },
  {
    bookingId: "KLO-391047",
    fullName: "Fatima Aliyu",
    match: "Man City vs Arsenal",
    numberOfTickets: 1,
    paid: "1,000",
    bookedAt: "Fri 20 Jun · 2:50 PM",
  },
  {
    bookingId: "KLO-228810",
    fullName: "Emeka Nwosu",
    match: "Real Madrid vs Bayern",
    numberOfTickets: 3,
    paid: "3,000",
    bookedAt: "Thu 19 Jun · 6:10 PM",
  },
  {
    bookingId: "KLO-119203",
    fullName: "Abubakar Bello",
    match: "Man City vs Arsenal",
    numberOfTickets: 1,
    paid: "1,000",
    bookedAt: "Fri 20 Jun · 1:05 PM",
  },
  {
    bookingId: "KLO-003847",
    fullName: "Ngozi Okonkwo",
    match: "Nigeria vs Ghana",
    numberOfTickets: 4,
    paid: "4,000",
    bookedAt: "Mon 16 Jun · 9:22 AM",
  },
]