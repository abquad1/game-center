import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  ApiResponse,
  CreateMatchRequest,
  CreateMatchResponse,
  Match,
  MatchDetails,
  MatchResponse,
} from "@/lib/data/matches";

export const MatchesApi = createApi({
  reducerPath: "matchesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getMatches: builder.query<MatchDetails[], { date: string }>({
      query: ({ date }) => `/matches?date=${date}`,
      transformResponse: (res: MatchResponse) => res.data,
    }),
    getMatchesById: builder.query<MatchDetails, string>({
      query: (id) => `/matches/${id}`,
      transformResponse: (res: ApiResponse<MatchDetails>) => res.data,
    }),
    createMatch: builder.mutation<CreateMatchResponse, CreateMatchRequest>({
      query: (match) => ({
        url: "/matches",
        method: "POST",
        body: match,
      }),
    }),
    updateMatch: builder.mutation<
      MatchResponse,
      { id: string; pricePerSeat: number; totalSeats: number; status: string }
    >({
      query: (match) => ({
        url: `/matches`,
        method: "PUT",
        body: match,
      }),
    }),
    deleteMatch: builder.mutation<void, string>({
      query: (id) => ({
        url: `/matches/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetMatchesQuery,
  useCreateMatchMutation,
  useUpdateMatchMutation,
  useDeleteMatchMutation,
} = MatchesApi;
