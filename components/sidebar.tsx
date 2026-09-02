'use client'
import React from 'react'
import { usePathname } from 'next/navigation'
import { IoHomeOutline } from "react-icons/io5";
import { BsTicketDetailed } from "react-icons/bs";
import { IoFootballSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import Link from 'next/link';

type TabType = {
    name: string, 
    icon: React.ReactNode 
    link: string
}

const tabsList: TabType[] = [
    { name: 'Home', link: '/', icon: <IoHomeOutline /> },
    { name: 'Matches', link: '/matches', icon: <BsTicketDetailed /> },
    { name: 'Ticket', link: '/tickets', icon: <IoFootballSharp /> },
    { name: 'Profile', link: '/profile', icon: <CgProfile /> },
]

function Sidebar() {
    const pathname = usePathname()

  return (
    <section className="h-full w-84 shrink-0 sticky top-0">
        <div className="w-full h-full p-8 shadow-xs shadow-secondary-foreground/50">

            <h1 className="text-3xl text-secondary-foreground">
                BABS-SPORT
            </h1>

            <ul className="flex flex-col gap-6 mt-8">
                {tabsList.map((tab) => {
                    const isActive = tab.link === '/' 
                        ? pathname === '/' 
                        : pathname.startsWith(tab.link)

                    return (
                        <div 
                            className={`px-4 rounded-md flex items-center text-xl ${isActive ? 'bg-primary' : 'bg-transparent'}`} 
                            key={tab.name}
                        >
                            <span className='text-secondary-foreground'>{tab.icon}</span>
                            <Link href={tab.link} className={`px-4 py-2`}>
                                <li className={`text-lg ${isActive ? 'text-secondary-foreground' : 'text-foreground'}`}>
                                    {tab.name}
                                </li>
                            </Link>
                        </div>
                    )
                })}
            </ul>
        </div>
    </section>
  )
}

export default Sidebar