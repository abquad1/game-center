'use client'
import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { Button } from "@/components/ui/button"
import { CiLogout } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";


type PopoverListType =
  | { name: string; icon: React.ReactNode; link: string; onClick?: never }
  | { name: string; icon: React.ReactNode; link?: never; onClick: () => void }


import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import Link from 'next/link';
import ProfileContent from '@/components/customers/profile-content';
import { useAuth } from '@/lib/context/authContext';
import { LuBadgeInfo } from 'react-icons/lu';

function Profile() {
    const {logout,userLoggedIn} = useAuth()

    const popoverList: PopoverListType[] = [
        {
            name: 'Log Out',
            icon: <CiLogout/>,
            onClick: () => logout()
        },
        {
            name: 'Delete Account',
            icon: <MdDeleteOutline/>,
            link: '/'
        },
    ]

  return (
    <section className='relative w-full h-full'>

        {userLoggedIn? (
            <div className="w-full h-full">
            <div className="flex items-center justify-between">
                <h1 className="text-secondary-foreground">
                    My Profile
                </h1>

                <div className="">
                <Popover>
                    <PopoverTrigger render={<Button className='bg-secondary-foreground/20 rounded-lg cursor-pointer hover:bg-secondary-foreground/20'>
                        <BsThreeDotsVertical/>
                    </Button>} />
                    <PopoverContent className="w-36 py-4 bg-primary/80 backdrop-blur-md text-foreground mr-6">
                        <ul className="flex flex-col gap-8">
                            {popoverList.map((list)=>(
                                <li className="cursor-pointer" key={list.name}>
                                    {list.onClick? (
                                        <div onClick={list.onClick} className={`flex items-center gap-2  `}>
                                        <span>
                                            {list.icon}
                                        </span>
                                        <p >
                                            {list.name}
                                        </p>
                                    </div>
                                    ):(
                                        <Link href={list.link} className={`flex items-center gap-2 text-red-400 `}>
                                        <span>
                                            {list.icon}
                                        </span>
                                        <p >
                                            {list.name}
                                        </p>
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
                <ProfileContent/>
            </div>

        </div>
        ):(
             // inactive state
             <div className="flex items-center w-full">
             <div className="bg-primary border border-foreground/10 p-4 flex items-center gap-4 mt-24 max-w-full mx-auto rounded-lg">
             <LuBadgeInfo className='text-secondary-foreground text-xl shrink-0' />
             <div>
                 You're browsing as a guest.{' '}
                 <span className="text-secondary-foreground font-bold">Login or sign up</span>{' '}
                 to view your profile
             </div>
             </div>
         </div>
        )}
        
    </section>
  )
}

export default Profile