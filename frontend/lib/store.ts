import { configureStore } from "@reduxjs/toolkit";
import { AuthApi } from "./api/authApi";
import { MatchesApi } from "./api/matches-api";

export const store = configureStore({
  reducer: {
    [AuthApi.reducerPath]: AuthApi.reducer,
    [MatchesApi.reducerPath]: MatchesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthApi.middleware, MatchesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
