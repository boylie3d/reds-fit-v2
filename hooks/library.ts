import { LibraryItem } from "@/types"
import useSWR from "swr"
import fetcher from "./fetcher"

export function useLibrary() {
  const { data, error } = useSWR<LibraryItem[], Error>("/api/library/", fetcher)

  return {
    library: data,
    loading: !error && !data,
    error: error,
  }
}
