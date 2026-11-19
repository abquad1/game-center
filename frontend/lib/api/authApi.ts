// lib/api/authApi.ts
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ApiResponse } from "@/lib/data/matches";
import { getAuthToken, setAuthToken, removeAuthToken } from "../utils/cookie";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupPayload extends LoginPayload {
  fullName: string;
}

export type AuthTokenData = { accessToken: string };

export type UserProfile = {
  _id: string;
  id: string;
  email: string;
  fullName: string;
  role: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
};

export type LoginResponse = ApiResponse<AuthTokenData>;
export type SignupResponse = ApiResponse<AuthTokenData>;
export type UserProfileResponse = ApiResponse<UserProfile>;
export type LogoutResponse = ApiResponse<null>;

// One helper instead of repeating the same block three times
const saveTokenFrom = async (
  queryFulfilled: Promise<{ data: ApiResponse<AuthTokenData> }>,
) => {
  try {
    const { data } = await queryFulfilled;
    if (data.data.accessToken) setAuthToken(data.data.accessToken);
  } catch (error) {
    console.error(error);
  }
};

export const AuthApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) headers.set("authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
      onQueryStarted: (_, { queryFulfilled }) => saveTokenFrom(queryFulfilled),
    }),

    adminLogin: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({ url: "/auth/admin/login", method: "POST", body }),
      onQueryStarted: (_, { queryFulfilled }) => saveTokenFrom(queryFulfilled),
    }),

    signup: builder.mutation<SignupResponse, SignupPayload>({
      query: (body) => ({ url: "/auth/signup", method: "POST", body }),
      onQueryStarted: (_, { queryFulfilled }) => saveTokenFrom(queryFulfilled),
    }),

    getProfile: builder.query<UserProfileResponse, void>({
      query: () => "/users/me",
      providesTags: ["Profile"],
    }),

    logout: builder.mutation<LogoutResponse, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error(error); // still log out locally
        } finally {
          removeAuthToken();
          dispatch(AuthApi.util.resetApiState()); // clear cached profile
        }
      },
    }),
  }),
});

export const {
  useLoginMutation,
  useAdminLoginMutation,
  useSignupMutation,
  useGetProfileQuery,
  useLogoutMutation,
} = AuthApi;
