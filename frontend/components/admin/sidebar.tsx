'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { BsTicketDetailed } from 'react-icons/bs'
import Link from 'next/link'
import { MdOutlineDashboard } from "react-icons/md";
import { IoScan } from "react-icons/io5";
import { FaUsers } from "react-icons/fa6";
import { IoSettingsOutline } from "react-icons/io5";

type TabType = {
  name: string
  icon: React.ReactNode
  link: string
}

const tabsList: TabType[] = [
  { name: 'Dashboard', link: '/admin', icon: <MdOutlineDashboard />  },
  { name: 'Scan & Verify', link: '/admin/scan-verify', icon: <IoScan />  },
  { name: 'Customers', link: '/admin/customers', icon: <FaUsers />  },
  { name: 'Matches', link: '/admin/matches', icon: <BsTicketDetailed /> },
  { name: 'Settings', link: '/admin/settings', icon: <IoSettingsOutline /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed bottom-0 left-0 md:left-0 md:sticky z-50 md:h-full w-full md:w-72 shrink-0 md:top-0">
      <div className="relative w-full h-full py-0 md:px-8 md:py-8 backdrop-blur-2xl shadow-xs shadow-secondary-foreground/50">
        <h1 className="hidden md:flex text-2xl font-bold text-secondary-foreground">
          BABS-SPORT
        </h1>
        <p className="hidden md:flex text-lg">
          ADMIN PORTAL
        </p>

        <nav className=" mt-8">
          <ul className="w-full flex flex-row md:flex-col gap-0 md:gap-4">
            {tabsList.map((tab) => {
              const isActive =
                tab.link === '/admin'
                  ? pathname === '/admin'
                  : pathname.startsWith(tab.link)

              return (
                <li key={tab.name} className='w-1/5 shadow-xs md:shadow-none shadow-secondary-foreground md:w-full'>
                  <Link
                    href={tab.link}
                    className={`flex flex-col md:flex-row items-center justify-center md:justify-start gap-1 md:gap-3 px-2 md:px-4 py-3 rounded-none md:rounded-md text-base md:text-xl transition-colors focus:outline-0 ${
                      isActive
                        ? 'bg-primary font-bold text-secondary-foreground border-l-2 border-secondary-foreground'
                        : 'bg-transparent text-foreground'
                    }`}
                  >
                    <span className=" text-2xl">{tab.icon}</span>
                    <span className="text-xs md:text-lg">{tab.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  )
}