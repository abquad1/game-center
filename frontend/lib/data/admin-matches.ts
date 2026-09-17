export type AdminMatch = {
    id: string
    homeTeam: string
    awayTeam: string
    competition: string
    dateTime: string // ISO string, e.g. "2026-09-17T20:00:00"
    seatsBooked: number
    seatsTotal: number
    ticketPrice: number
  }
  
  export const adminMatches: AdminMatch[] = [
    {
      id: '1',
      homeTeam: 'Man City',
      awayTeam: 'Arsenal',
      competition: 'Premier League',
      dateTime: '2026-09-17T20:00:00', // today
      seatsBooked: 42,
      seatsTotal: 50,
      ticketPrice: 1000,
    },
    {
      id: '2',
      homeTeam: 'Real Madrid',
      awayTeam: 'Bayern Munich',
      competition: 'UCL',
      dateTime: '2026-09-18T21:00:00', // tomorrow
      seatsBooked: 16,
      seatsTotal: 50,
      ticketPrice: 1500,
    },
    {
      id: '3',
      homeTeam: 'Nigeria',
      awayTeam: 'Ghana',
      competition: 'AFCON',
      dateTime: '2026-09-21T18:00:00', // a few days out
      seatsBooked: 5,
      seatsTotal: 50,
      ticketPrice: 2000,
    },
    {
      id: '4',
      homeTeam: 'Liverpool',
      awayTeam: 'Chelsea',
      competition: 'EPL',
      dateTime: '2026-09-10T15:00:00', // past
      seatsBooked: 50,
      seatsTotal: 50,
      ticketPrice: 1000,
    },
    {
      id: '5',
      homeTeam: 'PSG',
      awayTeam: 'Barcelona',
      competition: 'UCL',
      dateTime: '2026-09-05T20:45:00', // past
      seatsBooked: 48,
      seatsTotal: 50,
      ticketPrice: 1800,
    },
  ]