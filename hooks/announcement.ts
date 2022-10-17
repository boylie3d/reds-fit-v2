import { Announcement } from "@/types"
import useSWR from "swr"
import { objToQueryString } from "util/query"
import fetcher from "./fetcher"

export function useAnnouncements(query?: any) {
  const formattedQuery = objToQueryString(query)
  const { data, error } = useSWR<Announcement[], Error>(
    `/api/announcement${formattedQuery}`,
    fetcher,
  )

  return {
    announcements: data,
    loading: !error && !data,
    error: error,
  }
}
