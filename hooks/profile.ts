import { Profile } from "@/types"
import useSWR from "swr"
import fetcher from "./fetcher"

export function UseProfile(userId: string) {
  const { data, error } = useSWR<Profile, Error>(
    `/api/profile/${userId}`,
    fetcher,
  )

  return {
    activities: data,
    loading: !error && !data,
    error: error,
  }
}
