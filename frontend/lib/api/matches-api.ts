import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { getAuthToken } from "../utils/cookie";

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  competition: string;
  kickoffTime: string;
  pricePerSeat: number;
  availableSeats: number;
  totalSeats: number;
}

export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T;
  timestamp: string;
  path: string;
}

export interface CreateMatchPayload {
  homeTeam: string;
  awayTeam: string;
  competition: string;
  kickoffTime: string;
  pricePerSeat: number;
  totalSeats: number;
  publish: true;
}

export const MatchesApi = createApi({
  reducerPath: "matchesApi",
  tagTypes: ["Matches"],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getAuthToken();
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }

      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMatches: builder.query<ApiResponse<Match[]>, void>({
      query: () => "/matches",
      providesTags: ["Matches"],
    }),
    createMatch: builder.mutation<
      ApiResponse<Match>,
      CreateMatchPayload
    >({
      query: (match) => ({
        url: "/matches",
        method: "POST",
        body: match,
      }),
      invalidatesTags: ["Matches"],
    }),
  }),
});

export const { useGetMatchesQuery, useCreateMatchMutation } = MatchesApi;