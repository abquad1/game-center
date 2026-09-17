export type Booking = {
    match: string
    date: string
    seats: number
    status: 'Upcoming' | 'Used' | 'Cancelled'
  }
  
  export type Customer = {
    id: string
    name: string
    email: string
    phone: string
    matches: number
    totalSpent: number
    memberSince: string
    status: 'frequent' | 'new' | 'inactive'
    recentBookings: Booking[]
  }
  
  export const customers: Customer[] = [
    {
      id: '1',
      name: 'Chukwuemeka Obi',
      email: 'chukwu@gmail.com',
      phone: '08012345678',
      matches: 14,
      totalSpent: 14000,
      memberSince: 'Jan 2026',
      status: 'frequent',
      recentBookings: [
        { match: 'Man City vs Arsenal', date: 'Fri 20 Jun', seats: 2, status: 'Upcoming' },
        { match: 'Liverpool vs Chelsea', date: 'Sun 8 Jun', seats: 1, status: 'Used' },
        { match: 'Nigeria vs Ghana', date: 'Tue 3 Jun', seats: 2, status: 'Used' },
      ],
    },
    {
      id: '2',
      name: 'Fatima Aliyu',
      email: 'fatima@gmail.com',
      phone: '08023456789',
      matches: 7,
      totalSpent: 8000,
      memberSince: 'Feb 2026',
      status: 'frequent',
      recentBookings: [
        { match: 'Real Madrid vs Bayern', date: 'Sat 21 Jun', seats: 1, status: 'Upcoming' },
        { match: 'Man City vs Arsenal', date: 'Fri 20 Jun', seats: 1, status: 'Used' },
      ],
    },
    {
      id: '3',
      name: 'Emeka Nwosu',
      email: 'emeka@gmail.com',
      phone: '08034567890',
      matches: 3,
      totalSpent: 5000,
      memberSince: 'Apr 2026',
      status: 'new',
      recentBookings: [
        { match: 'Nigeria vs Ghana', date: 'Tue 24 Jun', seats: 3, status: 'Upcoming' },
      ],
    },
    {
      id: '4',
      name: 'Abubakar Bello',
      email: 'abu@gmail.com',
      phone: '08045678901',
      matches: 1,
      totalSpent: 2000,
      memberSince: 'Jun 2026',
      status: 'inactive',
      recentBookings: [
        { match: 'Man City vs Arsenal', date: 'Fri 20 Jun', seats: 1, status: 'Used' },
      ],
    },
  ]