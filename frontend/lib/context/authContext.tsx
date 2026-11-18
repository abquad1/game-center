"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { removeAuthToken } from "../utils/cookie";

type AuthContextType = {
  // userLoggedIn: boolean;
  // userEmail: string | null;
  // role: RoleType;
  // RoleSet: (role: RoleType) => void;
  // customerlogin: () => void;
  // adminlogin: (email: string) => void;
  logout: () => void;
};

type RoleType = "admin" | "customer" | null;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  // const [userLoggedIn, setUserLoggedIn] = useState(false);
  // const [userEmail, setUserEmail] = useState<string | null>(null);
  // const [role, setRole] = useState<RoleType>(null);
  const router = useRouter();

  // useEffect(() => {
  //   // setUserLoggedIn(localStorage.getItem("userLoggedIn") === "true");
  //   setUserEmail(localStorage.getItem("email"));
  //   const storedRole = localStorage.getItem("role");

  //   if (storedRole === "admin" || storedRole === "customer") {
  //     setRole(storedRole);
  //   }
  // }, []);

  // const RoleSet = (role: RoleType) => {
  //   setRole(role);

  //   if (role) {
  //     localStorage.setItem("role", role);
  //   } else {
  //     localStorage.removeItem("role");
  //   }
  // };

  // const customerlogin = () => {
  //   RoleSet("customer");
  //   localStorage.setItem("userLoggedIn", "true");
  //   // setUserLoggedIn(true);
  // };

  // const adminlogin = (email: string) => {
  //   RoleSet("admin");
  //   setUserEmail(email);
  //   localStorage.setItem("email", email);
  //   localStorage.setItem("userLoggedIn", "true");
  //   setUserLoggedIn(true);
  // };

  const logout = () => {
    removeAuthToken();
    router.push("/");
  };

  return (
    <Provider store={store}>
      <AuthContext.Provider
        value={{
          // userLoggedIn,
          // adminlogin,
          // customerlogin,
          logout,
          // role,
          // RoleSet,
          // userEmail,
        }}
      >
        {children}
      </AuthContext.Provider>
    </Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
