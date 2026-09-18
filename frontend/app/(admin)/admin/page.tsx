'use client'
import { useAuth } from '@/lib/context/authContext'
import HomeHeader from '@/components/admin/home-header'
import UserStats from '@/components/user-stats'
import { useRouter } from 'next/navigation'
import BookingsList from '@/components/admin/check-ins'
import UpcomingMatchesPanel from '@/components/admin/matches-list'

const ticketDetails = {
  name: 'Admin',
  totalTickets: 42,
  totalRevenue: '14,000',
  checkedIn: 29,
}

export default function Home() {
  const { userLoggedIn } = useAuth()
  const router = useRouter()
  return (
    <section className="relative w-full ">
      <div className="h-full">
        <HomeHeader userName={ticketDetails.name} />

        <div className="h-px w-full bg-primary shrink-0 mt-4"></div>

        {/* <Hero/> */}

        <UserStats
          userLoggedIn={userLoggedIn}
          totalMatches={ticketDetails.totalTickets}
          totalSpent={ticketDetails.totalRevenue}
          upcomingTicket={ticketDetails.checkedIn}
        />

        <div className="w-full flex items-center text-sm justify-between my-4">
            <p className="font-bold text-foreground/80">Recent Check-ins</p>
            <span className="text-secondary-foreground hover:underline cursor-pointer" 
            onClick={()=>router.push('/matches')}>
                View all
            </span>
        </div>

        <BookingsList/>

        <div className="w-full flex items-center text-sm justify-between my-4">
            <p className="font-bold text-foreground/80">Upcoming matches</p>
            <span className="text-secondary-foreground hover:underline cursor-pointer" 
            onClick={()=>router.push('/matches')}>
                Manage
            </span>
        </div>

        <UpcomingMatchesPanel/>

      </div>
    </section>
  )
}