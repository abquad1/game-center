'use client'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import StaffAccountsSection from './staff-account-section'
import { useState } from "react";

function SettingRow({ label, hint, children }: { label: string; hint: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-foreground/10 last:border-none">
      <div>
        <p className="text-foreground font-medium">{label}</p>
        <p className="text-xs text-foreground/40 mt-1">{hint}</p>
      </div>
      {children}
    </div>
  )
}

function Toggle({ defaultChecked = false }: { defaultChecked?: boolean }) {
  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input type="checkbox" defaultChecked={defaultChecked} className="sr-only peer" />
      <div className="w-11 h-6 bg-foreground/10 rounded-full peer peer-checked:bg-green-600 transition-colors" />
      <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
    </label>
  )
}

export default function SettingsPage() {
    const [count, setCount] = useState(50)
    const increaseCount = () => {
          setCount((prev) => Math.min((prev + 1),50))
      }
    
      const decreaseCount = () => {
        if (count > 1) {
          setCount((prev) => Math.max((prev - 1),0))
        }
      }
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Settings</h2>
          <p className="text-sm text-foreground/40">Manage your business, staff and preferences</p>
        </div>
        <Button className="bg-secondary hover:bg-secondary/10 text-white font-semibold px-5 py-2 rounded-md">
          Save changes
        </Button>
      </div>

      {/* Business information */}
      <div>
        <p className="text-xs text-foreground/40 uppercase tracking-widest mb-3">Business information</p>
        <div className="bg-[#0f0f12] border border-foreground/10 rounded-lg px-4">
          <SettingRow label="Business name" hint="Shown on receipts and the website">
            <Input defaultValue="Babsport Viewing Center" className="w-64 bg-transparent border-green-600/40 text-right" />
          </SettingRow>
          <SettingRow label="Address" hint="Physical location of the center">
            <Input defaultValue="12 Babs Street, Lagos" className="w-64 bg-transparent border-foreground/10 text-right" />
          </SettingRow>
          <SettingRow label="WhatsApp number" hint="Customers contact you here">
            <Input defaultValue="08012345678" className="w-64 bg-transparent border-foreground/10 text-right" />
          </SettingRow>
          <SettingRow label="Email address" hint="For booking notifications">
            <Input defaultValue="admin@kolo.com" className="w-64 bg-transparent border-foreground/10 text-right" />
          </SettingRow>
        </div>
      </div>

      {/* Staff accounts — moved above Ticket & Seat Defaults */}
      <StaffAccountsSection />

      {/* Ticket & seat defaults */}
      <div>
        <p className="text-xs text-foreground/40 uppercase tracking-widest mb-3">Ticket &amp; seat defaults</p>
        <div className="bg-[#0f0f12] border border-foreground/10 rounded-lg px-4">
          <SettingRow label="Default ticket price" hint="Applied when creating a new match">
            <Input defaultValue="₦1,000" className="w-40 bg-transparent border-green-600/40 text-right" />
          </SettingRow>
          <SettingRow label="Default seat capacity" hint="Max seats per match unless overridden">
            <div className="flex items-center gap-3">
              <button onClick={decreaseCount} className="h-6 w-6 flex items-center justify-center rounded-md border border-foreground/20 text-foreground/60">−</button>
              <span className="text-foreground w-6 text-center">{count}</span>
              <button onClick={increaseCount} className="h-6 w-6 flex items-center justify-center rounded-md border border-foreground/20 text-foreground/60">+</button>
            </div>
          </SettingRow>
          <SettingRow label="Allow same-day booking" hint="Customers can book on match day">
            <Toggle defaultChecked />
          </SettingRow>
          <SettingRow label="Auto-close booking when full" hint="Disable booking when seats run out">
            <Toggle defaultChecked />
          </SettingRow>
        </div>
      </div>

      {/* Notifications */}
      <div>
        <p className="text-xs text-foreground/40 uppercase tracking-widest mb-3">Notifications</p>
        <div className="bg-[#0f0f12] border border-foreground/10 rounded-lg px-4">
          <SettingRow label="New booking alert" hint="Get notified when someone books">
            <Toggle defaultChecked />
          </SettingRow>
          <SettingRow label="Daily revenue summary" hint="Sent to your WhatsApp every evening">
            <Toggle defaultChecked />
          </SettingRow>
          <SettingRow label="Low seat warning" hint="Alert when less than 10 seats remain">
            <Toggle defaultChecked />
          </SettingRow>
          <SettingRow label="Match cancellation alert" hint="Notify customers when a match is cancelled">
            <Toggle />
          </SettingRow>
        </div>
      </div>

      {/* Danger zone */}
      <div>
        <p className="text-xs text-red-400 uppercase tracking-widest mb-3">Danger zone</p>
        <div className="bg-[#0f0f12] border border-red-500/20 rounded-lg px-4">
          <SettingRow label="Reset all bookings" hint="Permanently delete all booking records">
            <Button className="bg-red-950 hover:bg-red-900 text-red-400 border border-red-500/30">Reset</Button>
          </SettingRow>
          <SettingRow label="Delete admin account" hint="This action cannot be undone">
            <Button className="bg-red-950 hover:bg-red-900 text-red-400 border border-red-500/30">Delete</Button>
          </SettingRow>
        </div>
      </div>
    </div>
  )
}