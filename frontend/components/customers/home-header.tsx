'use client'
import LoginSignupDialog from '@/components/customers/login-signup-dialog'
import { useAuth } from '@/lib/context/authContext'
import { MdOutlineEmail } from "react-icons/md"
import { FiPhone } from "react-icons/fi"
import { FaWhatsapp } from "react-icons/fa"
import { Button } from '../ui/button'
import { CgProfile } from "react-icons/cg"
import { useRouter } from 'next/navigation'

type HomeHeaderProps = {
  userName: string
}

// Replace with your real details
const CONTACT = {
  email: "support@babsport@gmail.com",
  phone: "+2348143967609",      
  phoneDisplay: "+234 814 396 7609 ",
  whatsapp: "2348143967609",    
}

const contactLinks = [
  {
    label: "Email",
    text: CONTACT.email,
    href: `mailto:${CONTACT.email}`,
    icon: MdOutlineEmail,
  },
  {
    label: "Phone",
    text: CONTACT.phoneDisplay,
    href: `tel:${CONTACT.phone}`,
    icon: FiPhone,
  },
  {
    label: "WhatsApp",
    text: "WhatsApp",
    href: `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent("Hi, I need help with my booking")}`,
    icon: FaWhatsapp,
    external: true,
  },
]

export default function HomeHeader({ userName }: HomeHeaderProps) {
  const { userLoggedIn, login } = useAuth()
  const router = useRouter()

  return (
    <div className="flex items-center justify-between gap-4">
      {userLoggedIn ? (
        <p className="text-lg">
          Welcome, <span className="text-amber-400">{userName.toUpperCase()}</span>
        </p>
      ) : (
        <Button onClick={()=>router.push('/login')} className="flex items-center gap-2 cursor-pointer bg-transparent hover:bg-primary text-foreground">
          <CgProfile className="text-lg" />
          Login
        </Button>
      )}

      <div className="flex items-center text-sm">
        {contactLinks.map(({ label, text, href, icon: Icon, external }) => (
          <a
            key={label}
            href={href}
            aria-label={label}
             target= "_blank"
              rel= "noopener noreferrer" 
            className="flex items-center border gap-2 px-4 py-2 border-foreground/15 text-foreground transition-colors hover:text-secondary-foreground"
          >
            <Icon className="size-5 shrink-0" />
            <span className="hidden md:inline">{text}</span>
          </a>
        ))}
      </div>
    </div>
  )
}