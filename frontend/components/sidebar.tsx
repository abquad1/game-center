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
  { name: 'Matches', link: '/matches', icon: <BsTicketDetailed /> },
  { name: 'Ticket', link: '/tickets', icon: <IoFootballSharp /> },
  { name: 'Profile', link: '/profile', icon: <CgProfile /> },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="h-full w-84 shrink-0 sticky top-0">
      <div className="w-full h-full p-8 shadow-xs shadow-secondary-foreground/50">
        <h1 className="text-3xl font-bold text-secondary-foreground">
          BABS-SPORT
        </h1>

        <nav className="mt-8">
          <ul className="flex flex-col gap-4">
            {tabsList.map((tab) => {
              const isActive =
                tab.link === '/'
                  ? pathname === '/'
                  : pathname.startsWith(tab.link)

              return (
                <li key={tab.name}>
                  <Link
                    href={tab.link}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md text-xl transition-colors focus:outline-0 ${
                      isActive
                        ? 'bg-primary text-secondary-foreground'
                        : 'bg-transparent text-foreground'
                    }`}
                  >
                    <span className="text-secondary-foreground">{tab.icon}</span>
                    <span className="text-lg">{tab.name}</span>
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