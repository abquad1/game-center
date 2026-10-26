import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken, setAuthToken } from "../utils/cookie";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface SignupResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
  };
  timestamp: string;
  path: string;
}

export interface LoginResponse {
  accessToken: string;
  success: boolean;
  statusCode: number;
  message: string;
  user: {
    id: string;
    email: string;
  };
}

export interface UserProfileResponse {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
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
  timestamp: string;
  path: string;
}

export const AuthApi = createApi({
  reducerPath: "authApi",
  tagTypes: ["Profile"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.accessToken) {
            setAuthToken(data.accessToken);
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    signup: builder.mutation<
      SignupResponse,
      { email: string; password: string; fullName: string }
    >({
      query: (credentials) => ({
        url: "/auth/signup",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(_, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;

          if (data.data.accessToken) {
            setAuthToken(data.data.accessToken);
          }
        } catch (error) {
          console.error(error);
        }
      },
    }),
    getProfile: builder.query<UserProfileResponse, void>({
      query: () => "/users/me",
      providesTags: ["Profile"],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetProfileQuery } =
  AuthApi;
