import React from 'react'
import { Button } from "@/components/ui/button"
import { FaRegEdit } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLogout } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


type PopoverListType = {
    name: string;
    icon: React.ReactNode
    link: string
}

const popoverList:PopoverListType[] = [
    {
        name: 'Edit Profile',
        icon: <FaRegEdit/>,
        link: '/edit-profile'
    },
    {
        name: 'Log Out',
        icon: <CiLogout/>,
        link: '/'
    },
    {
        name: 'Delete Account',
        icon: <MdDeleteOutline/>,
        link: '/'
    },
]

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link';
import ProfileContent from '@/components/profile-content';
import BookingHistoryTable from '@/components/booking-history';

function Profile() {
  return (
    <section className='relative w-full h-full'>
        <div className="w-full">
            <div className="flex items-center justify-between">
                <h1 className="text-secondary-foreground">
                        My Profile
                </h1>

                <div className="">
                <Popover>
                    <PopoverTrigger render={<Button className='bg-secondary-foreground/20 rounded-lg cursor-pointer hover:bg-secondary-foreground/20'>
                        <IoSettingsOutline/>
                    </Button>} />
                    <PopoverContent className="w-36 py-4 bg-primary/80 backdrop-blur-md text-foreground mr-6">
                        <ul className="flex flex-col gap-8">
                            {popoverList.map((list)=>(
                                <li className="" key={list.name}>
                                    <Link href='/' className={`flex items-center gap-2 ${list.name === 'Delete Account'? 'text-red-400' : ''} `}>
                                        <span>
                                            {list.icon}
                                        </span>
                                        <p >
                                            {list.name}
                                        </p>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="mt-8">
                <ProfileContent/>
            </div>

            
        </div>
    </section>
  )
}

export default Profile