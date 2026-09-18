'use client'
import { upcomingMatches } from '@/lib/data/matches'
import { useAuth } from '@/lib/context/authContext'
import HomeHeader from '@/components/customers/home-header'
import UserStats from '@/components/user-stats'
import UpcomingMatchesTable from '@/components/customers/upcoming-matches-table'
import Hero from '@/components/customers/hero'
import { useRouter } from 'next/navigation'

const userDetails = {
  name: 'Chukwu',
  totalMatches: 14,
  totalSpent: '14,000',
  upcomingTicket: 3,
}

export default function Home() {
  const { userLoggedIn } = useAuth()
  const router = useRouter()
  return (
    <section className="relative w-full">
      <div className="h-full">
        <HomeHeader userName={userDetails.name} />

        <div className="h-px w-full bg-primary shrink-0 mt-4"></div>

        <Hero/>

        <UserStats
          userLoggedIn={userLoggedIn}
          totalMatches={userDetails.totalMatches}
          totalSpent={userDetails.totalSpent}
          upcomingTicket={userDetails.upcomingTicket}
        />

        <div className="w-full flex items-center text-sm justify-between mt-4">
          <p className="font-bold text-foreground/80">Upcoming matches</p>
          <span className="text-secondary-foreground hover:underline cursor-pointer" onClick={()=>router.push('/matches')}>See all</span>
        </div>

        <UpcomingMatchesTable matches={upcomingMatches.slice(0, 4)} />
      </div>
    </section>
  )
}