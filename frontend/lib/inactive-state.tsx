import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { LuBadgeInfo } from "react-icons/lu"
import { buildAuthUrl } from "./auth-redirect"

function InactiveState() {
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const query = searchParams.toString()
    const currentPath = query? `${pathname}?${query}` : pathname  

  return (
    <div className="relative flex flex-col items-center w-full">
                
    <div className="bg-primary border border-foreground/10 p-4 flex items-center gap-4 mt-24 max-w-full mx-auto rounded-lg">
        <LuBadgeInfo className='text-secondary-foreground text-xl shrink-0' />
        <div>
            You're browsing as a guest.{' '}
            <Link href={buildAuthUrl("/login", currentPath)} className="text-secondary-foreground font-bold">
            Login or sign up
          </Link>{" "}
            to view all your tickets history
        </div>
    </div>
</div>
  )
}

export default InactiveState