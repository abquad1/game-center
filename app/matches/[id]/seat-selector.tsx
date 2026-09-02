'use client'
import { useState } from "react"
import type { MatchType } from "@/app/page" 
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
  import { Button } from "@/components/ui/button"
  import { ButtonGroup } from "@/components/ui/button-group"
  import { Field } from "@/components/ui/field"
  import { Input } from "@/components/ui/input"
  
export default function SeatSelector({ match }: { match: MatchType }) {
  const [count, setCount] = useState(1)

  const increaseCount = () => {
    if (match.seatsLeft !== null && count < match.seatsLeft) {
      setCount((prev) => prev + 1)
    }
  }

  const decreaseCount = () => {
    if (count > 1) {
      setCount((prev) => prev - 1)
    }
  }

  const total = match.price * count

  return (
    <div className="bg-primary text-sm text-foreground border border-foreground/10 px-6 py-4 flex flex-col gap-2 justify-between w-full rounded-lg">
      <h1 className="text-secondary-foreground">SELECT SEATS</h1>

      <div className="flex flex-row items-center justify-between">
        <div>
          <h3 className="text-2xl">Number of Seats</h3>
          <p className="text-lg">#{match.price.toLocaleString()} per seat</p>
        </div>
        <div className="flex text-foreground font-bold">
          <Button onClick={decreaseCount} disabled={count <= 1} className='border border-foreground/50 rounded-r-none rounded-l-md text-lg disabled:opacity-40'>-</Button>
          <Input readOnly value={count} className="border border-foreground/50 text-foreground rounded-none w-10 text-center" />
          <Button onClick={increaseCount} disabled={match.seatsLeft !== null && count >= match.seatsLeft} className='border border-foreground/50 rounded-l-none rounded-r-md text-lg disabled:opacity-40'>+</Button>
        </div>
      </div>

      <div className="flex items-center justify-center gap-4">
        <p className="text-right text-secondary-foreground font-bold">Order Total:</p>
        <h3 className="text-2xl">₦{total.toLocaleString()}</h3>
      </div>

      <Dialog>
        <form>
          <DialogTrigger render={
            <Button disabled={match.soldOut} className="cursor-pointer text-foreground p-2 rounded-md disabled:bg-transparent">
              Pay with Paystack
            </Button>
          } />

          <DialogContent className="sm:max-w-sm bg-primary">
            <DialogHeader>
              <DialogTitle className='text-center text-2xl text-secondary-foreground'>Order Summary</DialogTitle>
            </DialogHeader>

            <div className="flex flex-col gap-4 w-full">
             
              <p className="text-foreground">
                Match: {match.homeTeam} vs {match.awayTeam}
              </p>
              <p className='flex items-center text-foreground/80 text-md'>
                Date: {match.date}
              </p>
              <p className='flex items-center text-foreground/80 text-md'>
                Time: {match.time.toUpperCase()}
              </p>
              <p className='flex items-center text-foreground/80 text-md'>
                Seats: {count}
              </p>

              <h4 className="text-secondary-foreground text-xl">Total: #{total.toLocaleString()}</h4>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </div>
  )
}