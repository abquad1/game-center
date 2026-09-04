'use client'
import { useState } from "react"
import { myTickets, TicketType } from '@/lib/data/ticket'
import { Button } from "@/components/ui/button"
import { FiShare2 } from "react-icons/fi"
import { BsQrCode } from "react-icons/bs"
import { useAuth } from "@/lib/context/authContext"
import { LuBadgeInfo } from "react-icons/lu"

type TabType = "all" | "upcoming" | "used"

export default function TicketsPage() {
  const [activeTab, setActiveTab] = useState<TabType>("all")
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(myTickets[0] ?? null)
const {userLoggedIn} = useAuth()
  const now = new Date()
  const upcomingTickets = myTickets.filter((t) => t.date > now)
  const usedTickets = myTickets.filter((t) => t.date <= now)

  const visibleTickets =
    activeTab === "all" ? myTickets : activeTab === "upcoming" ? upcomingTickets : usedTickets

  const tabs: { key: TabType; label: string; count: number }[] = [
    { key: "all", label: "All", count: myTickets.length },
    { key: "upcoming", label: "Upcoming", count: upcomingTickets.length },
    { key: "used", label: "Used", count: usedTickets.length },
  ]

  return (
    <div className="flex flex-row gap-6 w-full h-full ">
        
        {userLoggedIn? (
            <>
            {/* Left — ticket list */}
            <div className="flex flex-col gap-4 w-1/2">
                <div className="flex items-center justify-between">
                <h1 className="text-xl font-bold text-foreground">My tickets ({myTickets.length})</h1>
                </div>
                
                {/* Tabs */}
                <div className="flex gap-2 bg-primary p-1 rounded-md w-fit">
                {tabs.map((tab) => (
                    <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.key
                        ? "bg-secondary-foreground text-primary"
                        : "text-foreground/60 hover:text-foreground"
                    }`}
                    >
                    {tab.label} ({tab.count})
                    </button>
                ))}
                </div>

                {/* Ticket list */}
                <div className="flex flex-col gap-3">
                {visibleTickets.length === 0 && (
                    <p className="text-foreground/40 text-sm">No tickets in this category.</p>
                )}

                {visibleTickets.map((ticket) => {
                    const isUsed = ticket.date <= now

                    return (
                    <div
                        key={ticket.id}
                        onClick={() => setSelectedTicket(ticket)}
                        className={`bg-primary border rounded-lg px-6 py-4 cursor-pointer transition-colors ${
                        selectedTicket?.id === ticket.id
                            ? "border-secondary-foreground"
                            : "border-foreground/10 hover:border-foreground/30"
                        }` }
                    >
                        <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-amber-400 font-medium">{ticket.bookingId}</span>
                        {isUsed && (
                            <span className="text-[10px] text-foreground/40 border border-foreground/20 px-2 py-0.5 rounded-full">
                            Used
                            </span>
                        )}
                        </div>

                        <h3 className="text-lg text-foreground font-medium">
                        {ticket.homeTeam} vs {ticket.awayTeam}
                        </h3>

                        <p className="text-xs text-foreground/50 mt-1">
                        {ticket.date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                        {' · '}
                        {ticket.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        {' · '}
                        {ticket.seats} seat{ticket.seats > 1 ? 's' : ''}
                        </p>

                        <div className="flex gap-2 mt-3">
                        <Button
                            onClick={(e) => {
                            e.stopPropagation()
                            setSelectedTicket(ticket)
                            }}
                            className="flex items-center gap-2 bg-secondary-foreground text-primary text-sm px-3 py-2 rounded-md"
                        >
                            <BsQrCode /> View QR code
                        </Button>
                        <Button
                            onClick={(e) => e.stopPropagation()}
                            className="flex items-center gap-2 bg-transparent border border-foreground/20 text-foreground text-sm px-3 py-2 rounded-md"
                        >
                            <FiShare2 /> Share
                        </Button>
                        </div>
                    </div>
                    )
                })}
                </div>
            </div>

            {/* Right — quick view */}
            <div className="w-1/2">
                {selectedTicket ? (
                <div className="bg-primary border border-foreground/10 rounded-xl overflow-hidden sticky top-4">
                    <div className="text-xs text-foreground/40 px-6 pt-4">
                    QUICK VIEW - {selectedTicket.bookingId}
                    </div>

                    <div className="mt-4 bg-secondary-foreground/90 text-primary text-center py-2">
                    <p className="text-lg font-bold tracking-wide">KOLO</p>
                    <p className="text-xs">Football Viewing Center</p>
                    </div>

                    <div className="flex flex-col items-center py-6 gap-4">
                    <div className="text-center">
                        <p className="text-xs text-foreground/40">BOOKING ID</p>
                        <p className="text-foreground font-medium">{selectedTicket.bookingId}</p>
                    </div>

                    {/* QR code placeholder */}
                    <div className="w-40 h-40 bg-foreground/10 rounded-md flex items-center justify-center">
                        <BsQrCode className="text-5xl text-foreground/30" />
                    </div>
                    </div>

                    <div className="flex flex-col gap-3 px-6 pb-4 text-sm">
                    <div className="flex justify-between">
                        <span className="text-foreground/40">Match</span>
                        <span className="text-foreground font-medium">
                        {selectedTicket.homeTeam} vs {selectedTicket.awayTeam}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-foreground/40">Date</span>
                        <span className="text-foreground font-medium">
                        {selectedTicket.date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}
                        {' · '}
                        {selectedTicket.date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })}
                        </span>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-foreground/40">Seats</span>
                        <span className="text-foreground font-medium">{selectedTicket.seats}</span>
                    </div>
                    </div>

                    <div className="bg-secondary-foreground text-primary text-center text-sm font-medium py-3">
                    SHOW TO STAFF AT ENTRANCE
                    </div>
                </div>
                ) : (
                <p className="text-foreground/40 text-sm">Select a ticket to view details.</p>
                )}
            </div>
            </>
        ):(
            <div className="relative flex flex-col items-center w-full">
                
                <div className="bg-primary border border-foreground/10 p-4 flex items-center gap-4 mt-24 max-w-full mx-auto rounded-lg">
                    <LuBadgeInfo className='text-secondary-foreground text-xl shrink-0' />
                    <div>
                        You're browsing as a guest.{' '}
                        <span className="text-secondary-foreground font-bold">Login or sign up</span>{' '}
                        to view all your tickets history
                    </div>
                    </div>
                </div>
        )}
            
    </div>
  )
}