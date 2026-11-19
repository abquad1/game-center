"use client";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { Provider } from "react-redux";
import { store } from "../store";
import { removeAuthToken } from "../utils/cookie";
import { useLogoutMutation } from "../api/authApi";
import { toast } from "@/components/ui/toast";
import { ApiErrorResponse } from "../utils/apiErrorResponse";

type AuthContextType = {
  // logout: () => void;
};

type RoleType = "admin" | "customer" | null;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  // const [logoutUser] = useLogoutMutation();

  // const logout = async () => {
  //   try {
  //     const result = await logoutUser().unwrap();
  //     router.push("/");
  //     toast.add({
  //       type: "success",
  //       description: result.message,
  //     });
  //   } catch (error) {
  //     console.error("Failed to signup", error);
  //     const errorData = error as ApiErrorResponse;
  //     toast.add({
  //       type: "error",
  //       description: errorData?.message ?? "Logout failed",
  //     });
  //   }
  // };

  return (
    <Provider store={store}>
      <AuthContext.Provider value={{}}>{children}</AuthContext.Provider>
    </Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
