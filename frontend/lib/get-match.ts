// lib/api/get-match.ts
import { cookies } from "next/headers";
import type { ApiResponse } from "@/lib/data/matches";
import type { MatchDetails } from "@/lib/data/matches";

export async function getMatch(id: string): Promise<MatchDetails | null> {
  const token = (await cookies()).get("auth_token")?.value;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/matches/${id}`, {
    cache: "no-store", // seat counts change, so don't cache
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`Failed to load match (${res.status})`);

  const json: ApiResponse<MatchDetails> = await res.json();
  return json.data;
}
