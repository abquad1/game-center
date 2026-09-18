'use client'
import { usePaystackPayment } from "react-paystack"
import { Button } from "@/components/ui/button"

export type PaystackSuccessReference = { reference: string }

type PaystackButtonProps = {
  email: string
  amount: number
  matchId: number
  homeTeam: string
  awayTeam: string
  seats: number
  isProcessing: boolean
  onSuccessAction: (reference: PaystackSuccessReference) => void
  onCloseAction: () => void
}

export default function PaystackButton({
  email,
  amount,
  matchId,
  homeTeam,
  awayTeam,
  seats,
  isProcessing,
  onSuccessAction,
  onCloseAction,
}: PaystackButtonProps) {
  const config = {
    reference: `KLO-${crypto.randomUUID()}`,
    email,
    amount: amount * 100, 
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY as string,
    metadata: {
      matchId,
      homeTeam,
      awayTeam,
      seats,
      custom_fields: [],
    },
  }

  const initializePayment = usePaystackPayment(config)

  const handleClick = () => {
    if (!email || !email.includes('@')) {
      alert('Please log in with a valid email before paying.')
      return
    }
    initializePayment({ onSuccess: onSuccessAction, onClose: onCloseAction })
  }

  return (
    <Button
      disabled={isProcessing}
      onClick={handleClick}
      className="w-full bg-green-600 hover:bg-green-600/90 text-white py-3 rounded-lg mt-2 disabled:opacity-50"
    >
      {isProcessing ? 'Verifying...' : `Confirm & Pay ₦${amount.toLocaleString()}`}
    </Button>
  )
}