'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from "@/components/ui/button"
import { IoScanOutline } from "react-icons/io5"
import { Html5Qrcode } from 'html5-qrcode'
import { tickets } from '@/lib/data/ticket'

type TicketResult = {
  status: 'valid' | 'invalid'
  name?: string
  match?: string
  seats?: number
  paid?: string
  booked?: string
  message?: string
  id?: string
}

function lookupBooking(rawId: string): TicketResult {
  const trimmedId = rawId.trim().toUpperCase()
  const booking = tickets.find((b) => b.bookingId === trimmedId)

  if (booking) {
    return {
      status: 'valid',
      id: booking.bookingId,
      name: booking.fullName,
      match: booking.match,
      seats: booking.numberOfTickets,
      paid: booking.paid,
      booked: booking.bookedAt,
    }
  }

  return {
    status: 'invalid',
    message: 'Booking ID not found in the system. Ask customer to show receipt again.',
  }
}

function CameraScanner({
  onScan,
  active = true,
  resumeKey,
}: {
  onScan: (result: TicketResult) => void
  active?: boolean
  resumeKey: number
}) {
  const scannerRef = useRef<Html5Qrcode | null>(null)
  const hasScannedRef = useRef(false)
  const [cameraError, setCameraError] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)

  const stopScanner = async () => {
    const scanner = scannerRef.current
    if (scanner && scanner.isScanning) {
      try {
        await scanner.stop()
      } catch {
        // already stopped or in a bad state — safe to ignore
      }
    }
    setIsScanning(false)
  }

  const startScanner = async () => {
    if (!scannerRef.current) {
      scannerRef.current = new Html5Qrcode('qr-reader')
    }
    hasScannedRef.current = false
    try {
      await scannerRef.current.start(
        { facingMode: 'environment' },
        { fps: 10, qrbox: 220 },
        (decodedText) => {
          if (hasScannedRef.current) return // ignore repeat frames of the same code
          hasScannedRef.current = true
          onScan(lookupBooking(decodedText))
          stopScanner() // pause camera once we have a result
        },
        () => {
          // fires continuously while no QR is in frame — safe to ignore
        }
      )
      setIsScanning(true)
      setCameraError(null)
    } catch {
      setCameraError('Camera access denied or unavailable. Use manual entry instead.')
    }
  }

  // Start/stop based on `active`, and restart whenever `resumeKey` changes
  useEffect(() => {
    if (active) {
      startScanner()
    } else {
      stopScanner()
    }

    return () => {
      stopScanner()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, resumeKey])

  // Stop when the browser tab itself is hidden, resume when visible again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopScanner()
      } else if (active) {
        startScanner()
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active])

  return (
    <div className="flex flex-col gap-3 overflow-y-auto">
      <p className="text-sm text-foreground/60">Camera scanner</p>
      <div className="relative w-full aspect-square bg-[#0f0f12] rounded-lg flex items-center justify-center overflow-hidden">
        <div id="qr-reader" className="w-full h-full" />

        {!isScanning && !cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <IoScanOutline className="text-secondary h-24 w-24" />
            <span className="text-xs text-foreground/40">
              {active ? 'Starting camera...' : 'Camera paused'}
            </span>
          </div>
        )}

        {cameraError && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
            <IoScanOutline className="text-secondary h-24 w-24" />
            <span className="text-xs text-red-400">{cameraError}</span>
          </div>
        )}
      </div>
    </div>
  )
}

function ManualBookingCheck({ onResult }: { onResult: (result: TicketResult) => void }) {
  const [bookingId, setBookingId] = useState('')

  const handleCheck = () => {
    if (!bookingId.trim()) return
    onResult(lookupBooking(bookingId))
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-foreground/60">Or enter manually</p>
      <input
        value={bookingId}
        onChange={(e) => setBookingId(e.target.value.toUpperCase())}
        placeholder="KLO-______"
        className="w-full bg-[#0f0f12] border border-foreground/10 rounded-lg px-4 py-3 text-foreground placeholder:text-foreground/30 tracking-widest outline-none focus:border-secondary-foreground"
      />
      <Button
        onClick={handleCheck}
        className="w-full bg-green-600 hover:bg-green-600/90 text-white py-3 rounded-lg"
      >
        Check booking
      </Button>
    </div>
  )
}

export default function ScanAndVerifyColumns({ active = true }: { active?: boolean }) {
  const [result, setResult] = useState<TicketResult | null>(null)
  const [resumeKey, setResumeKey] = useState(0)

  const handleCheckIn = () => {
    if (!result?.id) return
    // TODO: call your real check-in mutation, e.g.
    // await fetch(`/api/bookings/${result.id}/check-in`, { method: 'POST' })
    console.log(`Checked in booking ${result.id}`)

    setResult(null)
    setResumeKey((k) => k + 1)
  }

  const handleScanAgain = () => {
    setResult(null)
    setResumeKey((k) => k + 1)
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full pt-8">
      <div className="flex-1">
        <CameraScanner onScan={setResult} active={active} resumeKey={resumeKey} />
      </div>
      <div className="flex-1 flex flex-col gap-4 mb-24 md:mb-auto">
        <ManualBookingCheck onResult={setResult} />

        {result && (
          <div className="border border-foreground/10 rounded-lg p-4 flex flex-col gap-3">
            {result.status === 'valid' ? (
              <>
                <span className="flex items-center gap-2 text-green-500 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Valid ticket
                </span>
                <div className="flex flex-col gap-2 text-sm">
                  <div className="flex justify-between"><span className="text-foreground/40">Name</span><span className="text-foreground">{result.name}</span></div>
                  <div className="flex justify-between"><span className="text-foreground/40">Match</span><span className="text-foreground">{result.match}</span></div>
                  <div className="flex justify-between"><span className="text-foreground/40">Seats</span><span className="text-foreground">{result.seats}</span></div>
                  <div className="flex justify-between"><span className="text-foreground/40">Paid</span><span className="text-secondary">₦{result.paid}</span></div>
                  <div className="flex justify-between"><span className="text-foreground/40">Booked</span><span className="text-foreground">{result.booked}</span></div>
                </div>
                <Button
                  onClick={handleCheckIn}
                  className="w-full bg-green-600 hover:bg-green-600/90 text-white py-3 rounded-lg mt-2"
                >
                  Mark as checked in
                </Button>
              </>
            ) : (
              <>
                <span className="flex items-center gap-2 text-red-500 text-sm font-medium">
                  <span className="h-2 w-2 rounded-full bg-red-500" />
                  Invalid ticket
                </span>
                <p className="text-sm text-foreground/60">{result.message}</p>
                <Button
                  onClick={handleScanAgain}
                  className="w-full bg-foreground/10 hover:bg-foreground/20 text-foreground py-3 rounded-lg mt-2"
                >
                  Scan again
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}