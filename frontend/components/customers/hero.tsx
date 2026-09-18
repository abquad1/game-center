import React from 'react'
import { CiLocationOn } from "react-icons/ci";
import { Button } from '../ui/button';
import { IoTicketOutline } from "react-icons/io5";
import { TiArrowRight } from "react-icons/ti";

const characteristics = {
    amount: '1,000',
    totalSeats: 50,
    sideAttractions: '3+',
  }

function CharCard({ value, label, valueClassName = "text-foreground" }: {
    value: string | number
    label: string
    valueClassName?: string
  }) {
    return (
      <div className="bg-primary border border-foreground/10 flex flex-col p-4 w-35 h-35 items-center justify-center rounded-full">
        <h3 className={`${valueClassName} text-2xl`}>{value}</h3>
        <p className="text-foreground/30 text-sm">{label}</p>
      </div>
    )
  }

function Hero() {
  return (
    <section className='relative w-full pb-4'>
        <div className="w-full py-4 space-y-4 ">
            
           <div className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center w-full items-center">
                <div className="flex flex-col justify-center items-center md:items-start max-w-full md:max-w-1/2 gap-2">
                    <span className="flex text-secondary-foreground gap-2 w-fit rounded-full items-center border border-secondary-foreground px-4 py-1">
                        <CiLocationOn />
                        IBADAN, NIGERIA
                    </span>

                    <h1 className="text-center md:text-left leading-[120%] md:leading-[100%] text-4xl md:text-6xl font-semibold  text-foreground">
                        Watch <span className='text-secondary font-heading'>live football</span> the right way in Lagos
                    </h1>
                </div>

                <div className="flex flex-wrap items-center flex-1 justify-center gap-2">
                    <CharCard value={`#${characteristics.amount}`} label="Entry Per Person" valueClassName="text-secondary-foreground" />
                    <CharCard value={characteristics.totalSeats} label="Total Seats" valueClassName="text-secondary" />
                    <CharCard value={characteristics.sideAttractions} label="Side Attractions" />
                </div>
           </div>

            <p className="text-lg md:text-xl text-foreground/40">
            Book your seat online, show your QR receipt, and enjoy every match on our <span className="text-foreground/80">giant HD screens</span>. Unwind between games with <span className="text-foreground/80">snooker tables, PS5 gaming,</span> and <span className="text-foreground/80">cold refreshments</span>.
            </p>

            <Button className='text-xl flex py-8'>
                <IoTicketOutline className='w-20 h-20'/>
                Book a ticket now
                <TiArrowRight className='w-20 h-20'/>
            </Button>
        </div>
    </section>
  )
}

export default Hero