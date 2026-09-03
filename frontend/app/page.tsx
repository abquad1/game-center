'use client'
import {useEffect, useState} from 'react'
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { upcomingMatches } from '@/lib/data/matches'
import Link from 'next/link'
import LoginSignupDialog from '@/components/login-signup-dialog'
import { useAuth } from '@/lib/context/authContext'
import { LuBadgeInfo, LuBadgeRussianRuble } from "react-icons/lu";

export type MatchType = {
  id: number;
  league: "EPL" | "UCL" | "AFCON";
  homeTeam: string;
  awayTeam: string;
  tag?: string;        
  time: string;
  date: string;
  seatsLeft: number | null; 
  price: number;
  soldOut?: boolean;
};


type userType = {
  name: string,
  totalMatches: number,
  totalSpent: string,
  upcomingTicket: number
}
export default function Home() {

  const userDetails:userType = {
    name: 'Chukwu',
    totalMatches: 14,
    totalSpent: '14,000',
    upcomingTicket: 3
  } 

  const [selectedMatch, setSelectedMatch] = useState<MatchType|null>(null)

  const {userLoggedIn, login} = useAuth()

  const handleBooking = (match:MatchType)=>{
      setSelectedMatch(match)
  }

  
  
  return (
    <section className="relative w-full h-full">
      <div className="  h-full">
        <div className="flex items-center justify-between ">
           {userLoggedIn ? (
             <p className="text-lg">
             Welcome, <span className="text-amber-400">{userDetails.name.toUpperCase()}</span>
           </p>
           ):(
            <div className="">
                <LoginSignupDialog onLoginSuccessAction={login} />
            </div>
           )}

            <Field className="w-1/2">
              <ButtonGroup className=" rounded-md">
                <Input id="input-button-group" className='border-none' placeholder="Type to search..." />
                <Button className='bg-[#1d1d1d] ' >Search</Button>
              </ButtonGroup>
            </Field>

        </div>

        <div className="h-px w-full bg-primary shrink-0 mt-4"></div>

        {/* details card */}

        {userLoggedIn? (
          <div className="w-full flex flex-row gap-8 mt-8">
          <div className="bg-primary border border-foreground/10 p-4 flex flex-col w-1/3 rounded-lg">
            <h3 className="text-foreground text-2xl">{userDetails.totalMatches}</h3>
            <p className="text-foreground/30 text-sm">Match Attended</p>
          </div>
          
          <div className="bg-primary border border-foreground/10 p-4 flex flex-col w-1/3 rounded-lg">
            <h3 className="text-secondary text-2xl">#{userDetails.totalSpent}</h3>
            <p className="text-foreground/30  text-sm">Total Spent</p>
          </div>

          <div className="bg-primary border border-foreground/10 p-4 flex flex-col w-1/3 rounded-lg">
            <h3 className="text-secondary-foreground text-2xl">{userDetails.upcomingTicket}</h3>
            <p className="text-foreground/30 text-sm">Upcoming Tickets</p>
          </div>
      </div>
        ):(
        <div className="bg-primary border border-foreground/10 p-4 flex items-center gap-4 w-full rounded-lg">
          <LuBadgeInfo className='text-secondary-foreground'/>
          <div className="">
              You're browsing as a guest. {' '}
              <span className="text-secondary-foreground font-bold">
                Login or sign up 
              </span> to book seats and view your tickets
            </div>            
        </div>
        )}


        <div className="w-full flex items-center text-sm justify-between mt-4">
            <p className="font-bold text-foreground/80">Upcoming matches</p>
            <span className="text-secondary-foreground hover:underline cursor-pointer">See all</span>
        </div>

        {/* list of upcoming matches */}
        <div className="flex flex-col gap-2 mt-4">
          {upcomingMatches.slice(0,4).map((match) => (
            <div key={match.id} className="bg-primary text-sm text-foreground/30 border border-foreground/10 px-6 py-4 flex flex-row items-center gap-12 w-full rounded-lg">
              <span className="">{match.league}</span>

              <div className="space-x-2 text-foreground/80">
                <span className="">{match.homeTeam}</span>
                <span>vs</span>
                <span className="">{match.awayTeam}</span>
              </div>

              {match.tag && <span className="text-xs text-secondary">{match.tag}</span>}
              <span>{match.time}</span>
              <span className="text-xs">{match.date}</span>
              <span className="text-xs flex items-center gap-1"><h6 className="text-secondary-foreground">{match.soldOut ? "Sold out" : `${match.seatsLeft} seats left`}</h6></span>
              
              <Dialog>
                  <form>
                    <DialogTrigger render={<Button onClick={()=>handleBooking(match)}
                    disabled={match.soldOut || !userLoggedIn} className="cursor-pointer text-foreground p-2 rounded-md disabled:bg-transparent">
                      {match.soldOut ? "Full" : `Book (₦${match.price.toLocaleString()})`}
                      </Button>} />
                    
                      {selectedMatch && (
                    <DialogContent className="sm:max-w-sm bg-primary">
                      <DialogHeader>
                        <DialogTitle className='text-center text-2xl text-secondary-foreground'>Match Details</DialogTitle>
                      </DialogHeader>
                    
                        <div className="flex flex-col gap-4 items-center justify-center w-full">
                          <span className='text-foreground  px-2 py-1 rounded-md w-fit border border-secondary-foreground text-sm'>
                          {selectedMatch.seatsLeft !== null
                            ? `${selectedMatch.seatsLeft} seat${selectedMatch.seatsLeft > 1 ? 's' : ''} left`
                            : 'Sold out'}
                          </span>
                          <p className="text-foreground text-xl">
                            {selectedMatch.homeTeam} vs {selectedMatch.awayTeam}
                          </p>
                          <span className='flex items-center text-foreground/80 text-md'>
                            {selectedMatch.league} - {selectedMatch.time.toUpperCase()}
                          </span>
                        </div>
                        
                      <DialogFooter>
                      <DialogClose render={<Button className='bg-red-600 hover:bg-red-600/50'>Cancel</Button>} />
                        <Button type="submit" >Book Now</Button>
                      </DialogFooter>
                    </DialogContent>
                )}
                </form>
              </Dialog>
          </div>
           ))}
        </div>
      </div>
    </section>
  );
}
