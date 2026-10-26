import React from "react";
import { CiPhone, CiCalendarDate, CiMail } from "react-icons/ci";
import BookingHistoryTable from "./booking-history";
import Link from "next/link";
import { FaRegEdit } from "react-icons/fa";
import { useGetProfileQuery } from "@/lib/api/authApi";
import { skipToken } from "@reduxjs/toolkit/query";
import { getAuthToken } from "@/lib/utils/cookie";

type userType = {
  name: string;
  totalMatches: number;
  totalSpent: string;
  upcomingTicket: number;
};

function ProfileContent() {
  const personalInfo = {
    phone: "08143967609",
  };
  const token = getAuthToken();

  const { data, isLoading } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  if (isLoading) {
    return null;
  }

  const userProfile = data?.data || undefined;

  const memberSince = userProfile?.createdAt
    ? new Date(userProfile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "";

  const userDetails: userType = {
    name: "Chukwu",
    totalMatches: 14,
    totalSpent: "14,000",
    upcomingTicket: 3,
  };

  const initials = userProfile
    ? userProfile.fullName
        ?.split(" ")
        .map((name) => name[0])
        .join("")
        .toUpperCase()
    : undefined;
  const phone = personalInfo.phone;

  return (
    <section className="relative w-full">
      <div className="w-full">
        {/* first card */}
        <div className=" flex items-start justify-between gap-4 bg-primary border border-foreground/10 px-6 py-6">
          <div className="flex items-center gap-4 ">
            <div className="flex items-center font-bold justify-center h-16 w-16 text-foreground bg-secondary rounded-full text-2xl">
              {initials}
            </div>

            <div className="flex flex-col gap-2 ">
              <h3 className="text-2xl">{userProfile?.fullName}</h3>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-8">
                <div className="flex items-center gap-1 text-sm text-foreground/50">
                  <CiPhone />
                  <p className="">{phone}</p>
                </div>

                <div className="flex items-center gap-1 text-sm text-foreground/50">
                  <CiMail />
                  <p className="">{userProfile?.email}</p>
                </div>

                <div className="flex items-center gap-1 text-sm text-foreground/50">
                  <CiCalendarDate />
                  <p className="">Member since {memberSince}</p>
                </div>
              </div>
            </div>
          </div>

          <Link
            href="/profile/edit-profile"
            className="flex items-center text-secondary-foreground p-2"
          >
            <FaRegEdit />
          </Link>
        </div>

        {/* details card */}
        <div className="w-full flex flex-row gap-4 md:gap-8 mt-8 ">
          <div className="bg-primary border border-foreground/10 p-2 md:p-4 flex flex-col w-1/3 rounded-lg">
            <h3 className="text-foreground text-lg md:text-2xl">
              {userDetails.totalMatches}
            </h3>
            <p className="text-foreground/30 text-sm">Match Attended</p>
          </div>

          <div className="bg-primary border border-foreground/10 p-2 md:p-4 flex flex-col w-1/3 rounded-lg">
            <h3 className="text-secondary text-lg md:text-2xl">
              #{userDetails.totalSpent}
            </h3>
            <p className="text-foreground/30  text-sm">Total Spent</p>
          </div>

          <div className="bg-primary border border-foreground/10 p-2 md:p-4 flex flex-col w-1/3 rounded-lg">
            <h3 className="text-secondary-foreground text-lg md:text-2xl">
              {userDetails.upcomingTicket}
            </h3>
            <p className="text-foreground/30 text-sm">Upcoming Tickets</p>
          </div>
        </div>

        {/* tickets sections */}
        <div className="w-full flex items-center text-sm justify-between mt-8">
          <p className="font-bold text-foreground/80">Booking history</p>
          <span className="text-secondary-foreground hover:underline cursor-pointer">
            <Link href="/tickets">View all tickets</Link>
          </span>
        </div>

        <div className="pt-8">
          <BookingHistoryTable />
        </div>
      </div>
    </section>
  );
}

export default ProfileContent;
