"use client";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import ProfileContent from "@/components/customers/profile-content";
import InactiveState from "@/lib/inactive-state";
import { getAuthToken, removeAuthToken } from "@/lib/utils/cookie";
import { skipToken } from "@reduxjs/toolkit/query";
import { useGetProfileQuery } from "@/lib/api/authApi";
import { useRouter } from "next/navigation";

type PopoverListType =
  | { name: string; icon: React.ReactNode; link: string; onClick?: never }
  | { name: string; icon: React.ReactNode; link?: never; onClick: () => void };

function Profile() {
  const token = getAuthToken();
  const router = useRouter();

  const Logout = () => {
    removeAuthToken();
    router.push("/");
  };
  const { data, error, isLoading } = useGetProfileQuery(
    token ? undefined : skipToken,
  );

  if (isLoading) {
    return null;
  }

  const isUserProfile = data?.success || !error;

  const popoverList: PopoverListType[] = [
    {
      name: "Log Out",
      icon: <CiLogout />,
      onClick: Logout,
    },
    {
      name: "Delete Account",
      icon: <MdDeleteOutline />,
      link: "/",
    },
  ];

  return (
    <section className="relative w-full mb-8">
      <div className="w-full">
        <h1 className="block md:hidden text-xl md:text-3xl font-bold text-secondary-foreground">
          BABS-SPORT
        </h1>

        {isUserProfile ? (
          <>
            <div className="flex items-center justify-between">
              <h1 className="text-secondary-foreground">My Profile</h1>

              <div className="">
                <Popover>
                  <PopoverTrigger
                    render={
                      <Button className="bg-secondary-foreground/20 rounded-lg cursor-pointer hover:bg-secondary-foreground/20">
                        <BsThreeDotsVertical />
                      </Button>
                    }
                  />
                  <PopoverContent className="w-36 py-4 bg-primary/80 backdrop-blur-md text-foreground mr-6">
                    <ul className="flex flex-col gap-8">
                      {popoverList.map((list) => (
                        <li className="cursor-pointer" key={list.name}>
                          {list.onClick ? (
                            <div
                              onClick={list.onClick}
                              className={`flex items-center gap-2  `}
                            >
                              <span>{list.icon}</span>
                              <p>{list.name}</p>
                            </div>
                          ) : (
                            <Link
                              href={list.link}
                              className={`flex items-center gap-2 text-red-400 `}
                            >
                              <span>{list.icon}</span>
                              <p>{list.name}</p>
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="mt-8">
              <ProfileContent />
            </div>
          </>
        ) : (
          // inactive state
          <InactiveState />
        )}
      </div>
    </section>
  );
}

export default Profile;
