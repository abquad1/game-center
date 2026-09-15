'use client'
import { LuBadgeInfo } from "react-icons/lu"

type UserStatsProps = {
  userLoggedIn: boolean
  totalMatches: number
  totalSpent: string
  upcomingTicket: number
}

function StatCard({ value, label, valueClassName = "text-foreground" }: {
  value: string | number
  label: string
  valueClassName?: string
}) {
  return (
    <div className="bg-primary border border-foreground/10 p-4 flex flex-col w-1/3 rounded-lg">
      <h3 className={`${valueClassName} text-2xl`}>{value}</h3>
      <p className="text-foreground/30 text-sm">{label}</p>
    </div>
  )
}

export default function UserStats({ userLoggedIn, totalMatches, totalSpent, upcomingTicket }: UserStatsProps) {
  if (!userLoggedIn) {
    return (
      <div className="bg-primary border border-foreground/10 p-4 flex items-center gap-4 w-full rounded-lg">
        <LuBadgeInfo className="text-secondary-foreground text-6xl md:text-base" />
        <div>
          You&apos;re browsing as a guest.{' '}
          <span className="text-secondary-foreground font-bold">Login or sign up</span> to book seats and view your tickets
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-row gap-8 mt-8">
      <StatCard value={totalMatches} label="Match Attended" />
      <StatCard value={`#${totalSpent}`} label="Total Spent" valueClassName="text-secondary" />
      <StatCard value={upcomingTicket} label="Upcoming Tickets" valueClassName="text-secondary-foreground" />
    </div>
  )
}