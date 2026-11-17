// lib/types/match.ts

// Generic wrapper your backend puts around every response
export type ApiResponse<T> = {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string; // ISO date string
  path: string;
};

// Add the other statuses your backend uses, e.g. "PUBLISHED" | "CANCELLED"
export type MatchStatus = "DRAFT" | "PUBLISHED";

// What you send to POST /matches
export type CreateMatchRequest = {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  kickoffTime: string; // ISO date string, e.g. "2026-10-04T15:00:00.000Z"
  pricePerSeat: number;
  totalSeats: number;
  externalFixtureId?: string; // optional, if the backend allows it
  publish?: boolean;
};

// A match as the backend returns it
export type Match = {
  _id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  kickoffTime: string;
  pricePerSeat: number;
  totalSeats: number;
  availableSeats: number;
  status: MatchStatus;
  externalFixtureId?: string;
  createdBy: string; // user id
  createdAt: string;
  updatedAt: string;
  __v: number;
};

// Full response of POST /matches
export type CreateMatchResponse = ApiResponse<Match>;

// export type MatchType = {
//   id: number;
//   league: "EPL" | "UCL" | "AFCON";
//   homeTeam: string;
//   awayTeam: string;
//   tag?: string;
//   time: string;
//   date: string;
//   seatsLeft: number | null;
//   price: number;
//   soldOut?: boolean;
// };

export const upcomingMatches: Match[] = [
  // {
  //   id: 1,
  //   league: "EPL",
  //   homeTeam: "Man City",
  //   awayTeam: "Arsenal",
  //   tag: "Today",
  //   kickoffTime: "2026-10-04T15:00:00.000Z",
  //   pricePerSeat: 1000,
  //   totalSeats: 100,
  //   availableSeats: 100,
  //   status: "DRAFT",
  //   externalFixtureId: "123",
  //   createdBy: "123",
  //   createdAt: "2026-10-04T15:00:00.000Z",
  //   updatedAt: "2026-10-04T15:00:00.000Z",
  //   __v: 0,
  // },
  // {
  //   id: 2,
  //   league: "UCL",
  //   homeTeam: "Real Madrid",
  //   awayTeam: "Bayern Munich",
  //   time: "9:00 PM",
  //   date: "Sat 21 Jun",
  //   seatsLeft: 8,
  //   price: 1000,
  // },
  // {
  //   id: 3,
  //   league: "EPL",
  //   homeTeam: "Liverpool",
  //   awayTeam: "Chelsea",
  //   time: "7:30 PM",
  //   date: "Sun 22 Jun",
  //   seatsLeft: null,
  //   price: 1000,
  //   soldOut: true,
  // },
  // {
  //   id: 4,
  //   league: "AFCON",
  //   homeTeam: "Nigeria",
  //   awayTeam: "Ghana",
  //   time: "6:00 PM",
  //   date: "Tue 24 Jun",
  //   seatsLeft: 34,
  //   price: 1000,
  // },
  // {
  //   id: 5,
  //   league: "EPL",
  //   homeTeam: "Tottenham",
  //   awayTeam: "Newcastle",
  //   time: "5:30 PM",
  //   date: "Wed 25 Jun",
  //   seatsLeft: 20,
  //   price: 1000,
  // },
  // {
  //   id: 6,
  //   league: "UCL",
  //   homeTeam: "PSG",
  //   awayTeam: "Barcelona",
  //   tag: "Big Match",
  //   time: "8:45 PM",
  //   date: "Thu 26 Jun",
  //   seatsLeft: 5,
  //   price: 1500,
  // },
  // {
  //   id: 7,
  //   league: "EPL",
  //   homeTeam: "Manchester United",
  //   awayTeam: "Aston Villa",
  //   time: "4:00 PM",
  //   date: "Sat 28 Jun",
  //   seatsLeft: null,
  //   price: 1000,
  //   soldOut: true,
  // },
  // {
  //   id: 8,
  //   league: "AFCON",
  //   homeTeam: "Senegal",
  //   awayTeam: "Egypt",
  //   time: "7:00 PM",
  //   date: "Sun 29 Jun",
  //   seatsLeft: 41,
  //   price: 1200,
  // },
  // {
  //   id: 9,
  //   league: "UCL",
  //   homeTeam: "Juventus",
  //   awayTeam: "AC Milan",
  //   time: "9:00 PM",
  //   date: "Tue 1 Jul",
  //   seatsLeft: 15,
  //   price: 1300,
  // },
  // {
  //   id: 10,
  //   league: "EPL",
  //   homeTeam: "Brighton",
  //   awayTeam: "West Ham",
  //   tag: "Weekend",
  //   time: "3:00 PM",
  //   date: "Sat 5 Jul",
  //   seatsLeft: 27,
  //   price: 1000,
  // },
];

// Admin side data
export type UpcomingMatch = {
  id: string;
  league: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  seatsSold: number;
  seatsTotal: number;
};

export const upcomingMatchesData: UpcomingMatch[] = [
  {
    id: "1",
    league: "EPL",
    homeTeam: "Man City",
    awayTeam: "Arsenal",
    date: "Fri 20 Jun",
    time: "8 PM",
    seatsSold: 42,
    seatsTotal: 50,
  },
  {
    id: "2",
    league: "UCL",
    homeTeam: "Real Madrid",
    awayTeam: "Bayern",
    date: "Sat 21 Jun",
    time: "9 PM",
    seatsSold: 16,
    seatsTotal: 50,
  },
  {
    id: "3",
    league: "EPL",
    homeTeam: "Liverpool",
    awayTeam: "Chelsea",
    date: "Sun 22 Jun",
    time: "4 PM",
    seatsSold: 8,
    seatsTotal: 50,
  },
  {
    id: "4",
    league: "AFCON",
    homeTeam: "Nigeria",
    awayTeam: "Ghana",
    date: "Tue 24 Jun",
    time: "6 PM",
    seatsSold: 50,
    seatsTotal: 50,
  },
  {
    id: "5",
    league: "EPL",
    homeTeam: "Man United",
    awayTeam: "Spurs",
    date: "Wed 25 Jun",
    time: "7:30 PM",
    seatsSold: 30,
    seatsTotal: 50,
  },
  {
    id: "6",
    league: "UCL",
    homeTeam: "PSG",
    awayTeam: "Barcelona",
    date: "Fri 27 Jun",
    time: "8 PM",
    seatsSold: 45,
    seatsTotal: 50,
  },
  {
    id: "7",
    league: "EPL",
    homeTeam: "Newcastle",
    awayTeam: "Aston Villa",
    date: "Sat 28 Jun",
    time: "3 PM",
    seatsSold: 5,
    seatsTotal: 50,
  },
  {
    id: "8",
    league: "AFCON",
    homeTeam: "Egypt",
    awayTeam: "Senegal",
    date: "Sun 29 Jun",
    time: "5 PM",
    seatsSold: 22,
    seatsTotal: 50,
  },
  {
    id: "9",
    league: "UCL",
    homeTeam: "Juventus",
    awayTeam: "AC Milan",
    date: "Mon 30 Jun",
    time: "8:45 PM",
    seatsSold: 12,
    seatsTotal: 50,
  },
  {
    id: "10",
    league: "EPL",
    homeTeam: "Brighton",
    awayTeam: "Everton",
    date: "Wed 2 Jul",
    time: "8 PM",
    seatsSold: 38,
    seatsTotal: 50,
  },
];
