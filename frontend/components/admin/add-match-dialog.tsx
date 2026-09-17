'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Field, FieldLabel } from "@/components/ui/field"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export type NewMatchInput = {
  homeTeam: string
  awayTeam: string
  competition: string
  date: string // yyyy-mm-dd from <input type="date">
  time: string // HH:mm from <input type="time">
  seatCapacity: string
  ticketPrice: string
}

const emptyForm: NewMatchInput = {
  homeTeam: '', awayTeam: '', competition: '', date: '', time: '', seatCapacity: '', ticketPrice: '',
}

export default function AddMatchDialog({ onCreateAction }: { onCreateAction: (match: NewMatchInput) => void }) {
  const [form, setForm] = useState<NewMatchInput>(emptyForm)
  const [open, setOpen] = useState(false)

  const handleChange = (field: keyof NewMatchInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const isValid = form.homeTeam && form.awayTeam && form.date && form.time && form.seatCapacity

  const handleSubmit = () => {
    if (!isValid) return
    onCreateAction(form)
    setForm(emptyForm)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger
          render={
            <Button className="bg-secondary-foreground text-black hover:bg-secondary-foreground/90 font-semibold px-5 py-2 rounded-md">
              Add new match
            </Button>
          }
        />

        <DialogContent className="sm:max-w-md bg-primary">
          <DialogHeader>
            <DialogTitle className="text-secondary-foreground text-sm tracking-widest uppercase">
              Add new match
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel className="text-xs text-foreground/40 uppercase tracking-widest">Home team</FieldLabel>
              <Input placeholder="e.g. Man City" value={form.homeTeam} onChange={handleChange('homeTeam')} className="bg-[#0f0f12] border-foreground/10" />
            </Field>

            <Field>
              <FieldLabel className="text-xs text-foreground/40 uppercase tracking-widest">Away team</FieldLabel>
              <Input placeholder="e.g. Arsenal" value={form.awayTeam} onChange={handleChange('awayTeam')} className="bg-[#0f0f12] border-foreground/10" />
            </Field>

            <Field>
              <FieldLabel className="text-xs text-foreground/40 uppercase tracking-widest">Competition</FieldLabel>
              <Input placeholder="EPL" value={form.competition} onChange={handleChange('competition')} className="bg-[#0f0f12] border-foreground/10" />
            </Field>

            <div className="flex gap-4">
              <Field className="flex-1">
                <FieldLabel className="text-xs text-foreground/40 uppercase tracking-widest">Date</FieldLabel>
                <Input type="date" value={form.date} onChange={handleChange('date')} className="bg-[#0f0f12] border-foreground/10" />
              </Field>
              <Field className="flex-1">
                <FieldLabel className="text-xs text-foreground/40 uppercase tracking-widest">Time</FieldLabel>
                <Input type="time" value={form.time} onChange={handleChange('time')} className="bg-[#0f0f12] border-foreground/10" />
              </Field>
            </div>

            <Field>
              <FieldLabel className="text-xs text-foreground/40 uppercase tracking-widest">Seat capacity</FieldLabel>
              <Input type="number" placeholder="50" value={form.seatCapacity} onChange={handleChange('seatCapacity')} className="bg-[#0f0f12] border-foreground/10" />
            </Field>

            <Field>
              <FieldLabel className="text-xs text-foreground/40 uppercase tracking-widest">Ticket price (₦)</FieldLabel>
              <Input type="number" placeholder="1000" value={form.ticketPrice} onChange={handleChange('ticketPrice')} className="bg-[#0f0f12] border-foreground/10" />
            </Field>
          </div>

          <DialogFooter className="mt-2">
            <DialogClose render={<Button className="bg-foreground/10 hover:bg-foreground/20">Cancel</Button>} />
            <Button type="submit" onClick={handleSubmit} disabled={!isValid} className="bg-secondary-foreground text-black hover:bg-secondary-foreground/90 font-semibold disabled:opacity-40">
              Create match
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}