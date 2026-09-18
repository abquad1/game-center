'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import { IoHomeOutline, IoFootballSharp } from 'react-icons/io5'
import { BsTicketDetailed } from 'react-icons/bs'
import { CgProfile } from 'react-icons/cg'
import Link from 'next/link'

type TabType = {
  name: string
  icon: React.ReactNode
  link: string
}

const tabsList: TabType[] = [
  { name: 'Home', link: '/', icon: <IoHomeOutline /> },
  { name: 'Match', link: '/matches', icon: <BsTicketDetailed /> },
  { name: 'Ticket', link: '/tickets', icon: <IoFootballSharp /> },
  { name: 'Profile', link: '/profile', icon: <CgProfile /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed bottom-0 left-0 md:left-0 md:sticky z-50 md:h-full w-full md:w-72 shrink-0 md:top-0">
      <div className="relative w-full h-full py-0 md:px-8 md:py-8 backdrop-blur-2xl shadow-xs shadow-secondary-foreground/50">
        <h1 className="hidden md:flex text-2xl font-bold text-secondary-foreground">
          BABS-SPORT
        </h1>

        <nav className=" mt-8">
          <ul className="w-full flex flex-row md:flex-col gap-0 md:gap-4">
            {tabsList.map((tab) => {
              const isActive =
                tab.link === '/'
                  ? pathname === '/'
                  : pathname.startsWith(tab.link)

              return (
                <li key={tab.name} className='w-1/5 shadow-xs md:shadow-none shadow-secondary-foreground md:w-full'>
                  <Link
                    href={tab.link}
                    className={`flex flex-col md:flex-row items-center justify-center gap-1 md:gap-3 px-2 md:px-4 py-3 rounded-none md:rounded-md text-base md:text-xl transition-colors focus:outline-0 ${
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