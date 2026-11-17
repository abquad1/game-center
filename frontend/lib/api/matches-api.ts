import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  Match,
  CreateMatchRequest,
  CreateMatchResponse,
} from "@/lib/data/matches";

export const MatchesApi = createApi({
  reducerPath: "matchesApi",
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_URL }),
  endpoints: (builder) => ({
    getMatches: builder.query<Match[], { page: number; limit: number }>({
      query: ({ page, limit }) =>
        `/matches?page=${page}&limit=${limit}&sort=createdAt:desc`,
    }),
    createMatch: builder.mutation<CreateMatchResponse, CreateMatchRequest>({
      query: (match) => ({
        url: "/matches",
        method: "POST",
        body: match,
      }),
    }),
    updateMatch: builder.mutation<Match, Match>({
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
