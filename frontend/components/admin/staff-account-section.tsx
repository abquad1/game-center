'use client'
import { useState } from 'react'
import AddStaffDialog, { NewStaffInput } from './add-staff-dialog'

type Staff = {
  id: string
  name: string
  email: string
  status: 'Online' | 'Offline'
}

const initialStaff: Staff[] = [
  { id: '1', name: 'Tunde Staff', email: 'tunde@kolo.com', status: 'Online' },
  { id: '2', name: 'Amaka Staff', email: 'amaka@kolo.com', status: 'Offline' },
]

function getInitials(name: string) {
  return name.trim().split(/\s+/).map((p) => p[0]).slice(0, 2).join('').toUpperCase()
}

export default function StaffAccountsSection() {
  const [staff, setStaff] = useState<Staff[]>(initialStaff)

  const handleAddStaff = (input: NewStaffInput) => {
    setStaff((prev) => [
      ...prev,
      { id: crypto.randomUUID(), name: input.name, email: input.email, status: 'Offline' },
    ])
  }

  return (
    <div>
      <p className="text-xs text-foreground/40 uppercase tracking-widest mb-3">Staff accounts</p>

      <div className="bg-[#0f0f12] border border-foreground/10 rounded-lg p-4 flex flex-col gap-3">
        {staff.map((member) => (
          <div key={member.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-foreground/10 text-xs font-semibold text-foreground">
                {getInitials(member.name)}
              </span>
              <div className="flex flex-col">
                <span className="text-sm text-foreground font-medium">{member.name}</span>
                <span className="text-xs text-foreground/40">{member.email}</span>
              </div>
            </div>
            <span
              className={`text-xs px-2 py-1 rounded-md ${
                member.status === 'Online'
                  ? 'bg-green-500/10 text-green-400'
                  : 'bg-foreground/10 text-foreground/40'
              }`}
            >
              {member.status}
            </span>
          </div>
        ))}

        <div className="pt-2">
          <AddStaffDialog onAddAction={handleAddStaff} />
        </div>
      </div>
    </div>
  )
}