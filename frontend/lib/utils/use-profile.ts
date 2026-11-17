import { getAuthToken } from "./cookie";
import { useGetProfileQuery } from "../api/authApi";

export const useProfile = () => {
  const token = getAuthToken();

  const { data, isLoading, error } = useGetProfileQuery(undefined, {
    skip: !token,
  });

  return {
    profile: data?.data,
    isLoading,
    isError: !!error,
    isAuthenticated: !!token,
    isAdmin: data?.data?.role === "admin",
  };
};
