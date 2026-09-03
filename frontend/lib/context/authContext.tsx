'use client'
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react"

type AuthContextType = {
    userLoggedIn: boolean;
    login: () => void
    logout: ()=> void
}

const AuthContext = createContext<AuthContextType|undefined>(undefined)

export function AuthProvider({children}:{children:React.ReactNode}) {
    const [userLoggedIn,setUserLoggedIn] = useState(false)
    const router =useRouter()
    
    useEffect(()=>{
        setUserLoggedIn(localStorage.getItem('userLoggedIn') === 'true')
    },[])

    const login = ()=>{
        localStorage.setItem('userLoggedIn', 'true')
        setUserLoggedIn(true)
    }

    const logout = ()=>{
        localStorage.removeItem('userLoggedIn')
        setUserLoggedIn(false)
        router.push('/')
    }

  return (
    <AuthContext.Provider value={{userLoggedIn,login,logout}}>
            {children}
    </AuthContext.Provider>
  )
}

export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context) throw new Error ('useAuth must be used within AuthProvider')
        return context
}