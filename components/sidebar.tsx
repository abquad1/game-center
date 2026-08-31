'use client'
import React, { useState } from 'react'
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


const tabsList:TabType[] = [
    {
        name: 'Home',
        link: '/',
        icon: <IoHomeOutline />
    },
    {
        name: 'Matches',
        link: '/matches',
        icon: <BsTicketDetailed />
    },
    {
        name: 'Ticket',
        link: '/ticket',
        icon: <IoFootballSharp />
    },
    {
        name: 'Profile',
        link: '/profile',
        icon: <CgProfile />
    },
]
function Sidebar() {
    const [activeTab,setActiveTab] = useState('Home')
  return (
    <section className="h-full w-84 shrink-0">
        <div className="w-full h-full p-8 shadow-xs shadow-secondary-foreground">

            <h1 className="text-3xl text-secondary-foreground">
                BABS-SPORT
            </h1>

            <ul className="flex flex-col gap-6 mt-8">
                {tabsList.map((tab)=>(
                    <div className={`px-4 rounded-md flex items-center text-xl ${activeTab === `${tab.name}`? 'bg-primary':'bg-transparent'}`} key={tab.name}   >
                        <span className='text-secondary-foreground'>{tab.icon}</span>
                        <Link href={tab.link}  onClick={()=>setActiveTab(`${tab.name}`)}
                    className={`px-4 py-2`}>
                        <li className={`text-lg ${activeTab === `${tab.name}`? 'text-secondary-foreground':'text-foreground'}`}>{tab.name}</li>
                    </Link>
                    </div>
                ))}
            </ul>
        </div>
    </section>
  )
}

export default Sidebar