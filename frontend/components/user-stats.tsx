"use client";
import { useGetProfileQuery } from "@/lib/api/authApi";
import InactiveState from "@/lib/inactive-state";
import { getAuthToken } from "@/lib/utils/cookie";
import { skipToken } from "@reduxjs/toolkit/query";
import { LuBadgeInfo } from "react-icons/lu";

type UserStatsProps = {
  // us: boolean
  totalMatches: number;
  totalSpent: string;
  upcomingTicket: number;
};

function StatCard({
  value,
  label,
  valueClassName = "text-foreground",
}: {
  value: string | number;
  label: string;
  valueClassName?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center bg-primary border border-foreground/10 p-4 w-1/3 rounded-lg">
      <h3 className={`${valueClassName} text-2xl`}>{value}</h3>
      <p className="text-foreground/30 text-sm">{label}</p>
    </div>
  );
}

export default function UserStats({
  totalMatches,
  totalSpent,
  upcomingTicket,
}: UserStatsProps) {
  const token = getAuthToken();

  const { data, error, isLoading } = useGetProfileQuery(
    token ? undefined : skipToken,
  );

  console.log(data);

  if (isLoading) {
    return null;
  }

  if (error || !data?.success) {
    return <InactiveState />;
  }

  return (
    <div className="w-full flex flex-row gap-8 mt-8 items-stretch">
      <StatCard value={totalMatches} label="Match Attended" />
      <StatCard
        value={`#${totalSpent}`}
        label="Total Spent"
        valueClassName="text-secondary"
      />
      <StatCard
        value={upcomingTicket}
        label="Upcoming Tickets"
        valueClassName="text-secondary-foreground"
      />
    </div>
  );
}
