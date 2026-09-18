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

export type NewStaffInput = {
  name: string
  email: string
}

const emptyForm: NewStaffInput = { name: '', email: '' }

export default function AddStaffDialog({ onAddAction }: { onAddAction: (staff: NewStaffInput) => void }) {
  const [form, setForm] = useState<NewStaffInput>(emptyForm)
  const [open, setOpen] = useState(false)

  const handleChange = (field: keyof NewStaffInput) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
  }

  const isValid = form.name.trim() && form.email.trim().includes('@')

  const handleSubmit = () => {
    if (!isValid) return
    onAddAction(form)
    setForm(emptyForm)
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger
          render={
            <Button className="w-fit flex bg-secondary-foreground text-black hover:bg-secondary-foreground/90 font-semibold rounded-md">
              Add new staff
            </Button>
          }
        />

        <DialogContent className="sm:max-w-sm bg-primary">
          <DialogHeader>
            <DialogTitle className="text-secondary-foreground text-sm tracking-widest uppercase">
              Add new staff
            </DialogTitle>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <Field>
              <FieldLabel className="text-xs text-foreground/40 uppercase tracking-widest">Name</FieldLabel>
              <Input
                placeholder="e.g. Tunde Adewale"
                value={form.name}
                onChange={handleChange('name')}
                className="bg-[#0f0f12] border-foreground/10"
              />
            </Field>

            <Field>
              <FieldLabel className="text-xs text-foreground/40 uppercase tracking-widest">Email</FieldLabel>
              <Input
                type="email"
                placeholder="tunde@kolo.com"
                value={form.email}
                onChange={handleChange('email')}
                className="bg-[#0f0f12] border-foreground/10"
              />
            </Field>
          </div>

          <DialogFooter className="mt-2">
            <DialogClose render={<Button className="bg-foreground/10 hover:bg-foreground/20">Cancel</Button>} />
            <Button
              type="submit"
              onClick={handleSubmit}
              disabled={!isValid}
              className="bg-secondary-foreground text-black hover:bg-secondary-foreground/90 font-semibold disabled:opacity-40"
            >
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}