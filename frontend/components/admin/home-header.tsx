'use client'
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Field } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import LoginSignupDialog from '@/components/admin/login-signup-dialog'
import { useAuth } from '@/lib/context/authContext'
import { CiSearch } from "react-icons/ci";

type HomeHeaderProps = {
  userName: string
}

export default function HomeHeader({ userName }: HomeHeaderProps) {
  const { userLoggedIn, login } = useAuth()

  return (
    <div className="flex items-center justify-between">
      {userLoggedIn ? (
        <p className="text-lg">
          Welcome, <span className="text-amber-400">{userName.toUpperCase()}</span>
        </p>
      ) : (
        <LoginSignupDialog onLoginSuccessAction={login} />
      )}

      <Field className="w-1/3">
        <ButtonGroup className="rounded-md">
          <Input id="input-button-group" className="border-none" placeholder="Type to search..." />
          <Button className="bg-[#1d1d1d]">
          <CiSearch />
          </Button>
        </ButtonGroup>
      </Field>
    </div>
  )
}