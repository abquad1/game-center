"use client";
import { getAuthToken } from "./cookie";
import { useGetProfileQuery } from "../api/authApi";
import { useEffect, useState } from "react";

export const useProfile = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setToken(getAuthToken() ?? null);
    setIsReady(true);
  }, []);

  const { data, isLoading, error } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  return {
    profile: data?.data,
    isReady,
    isLoading,
    isError: !!error,
    isAuthenticated: !!token,
    isAdmin: data?.data?.role === "admin",
  };
};
