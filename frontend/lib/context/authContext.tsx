"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  userLoggedIn: boolean;
  userEmail: string | null
  role: RoleType
  RoleSet: (role: RoleType) => void
  customerlogin: () => void;
  adminlogin: () => void;
  logout: () => void;
};

type RoleType = 'admin' | 'customer' | null

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [userEmail,setUserEmail] = useState<string|null>(null)
  const [role, setRole] = useState<RoleType>(null)
  const router = useRouter();

  useEffect(() => {
    setUserLoggedIn(localStorage.getItem("userLoggedIn") === "true");
    setUserEmail(localStorage.getItem('email'))
    const storedRole = localStorage.getItem('role')

    storedRole === 'admin' || storedRole === 'customer' && setRole(storedRole)
  }, []);

  const RoleSet = (role: RoleType) =>{
    setRole(role)

    role ? localStorage.setItem('role', role) :
    localStorage.removeItem('role')
  }

  const customerlogin = () => {
    RoleSet('customer')
    localStorage.setItem("userLoggedIn", "true");
    setUserLoggedIn(true);
  };

  const adminlogin = () => {
    RoleSet('admin')
    localStorage.setItem("userLoggedIn", "true");
    setUserLoggedIn(true);
  };

  const logout = () => {
    RoleSet(null)
    localStorage.removeItem("userLoggedIn");
    setUserLoggedIn(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ userLoggedIn, adminlogin, customerlogin, logout, role, RoleSet , userEmail }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
