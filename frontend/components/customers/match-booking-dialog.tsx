'use client'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type { MatchType } from "@/lib/data/matches"

type MatchBookingDialogProps = {
  match: MatchType
  userLoggedIn: boolean
}

export default function MatchBookingDialog({ match, userLoggedIn }: MatchBookingDialogProps) {
  return (
    <Dialog>
      <form>
        <DialogTrigger
          render={
            <Button
              disabled={match.soldOut || !userLoggedIn}
              className="cursor-pointer text-foreground p-2 rounded-md disabled:bg-transparent"
            >
              {match.soldOut ? "Full" : `Book (₦${match.price.toLocaleString()})`}
            </Button>
          }
        />

        <DialogContent className="sm:max-w-sm bg-primary">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl text-secondary-foreground">
              Match Details
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4 items-center justify-center w-full">
            <span className="text-foreground px-2 py-1 rounded-md w-fit border border-secondary-foreground text-sm">
              {match.seatsLeft !== null
                ? `${match.seatsLeft} seat${match.seatsLeft > 1 ? 's' : ''} left`
                : 'Sold out'}
            </span>
            <p className="text-foreground text-xl">
              {match.homeTeam} vs {match.awayTeam}
            </p>
            <span className="flex items-center text-foreground/80 text-md">
              {match.league} - {match.time.toUpperCase()}
            </span>
          </div>

          <DialogFooter>
            <DialogClose render={<Button className="bg-red-600 hover:bg-red-600/50">Cancel</Button>} />
            <Button type="submit">Book Now</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}