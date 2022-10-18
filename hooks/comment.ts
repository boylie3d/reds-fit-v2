import { Comment } from "@/types"
import useSWR from "swr"
import fetcher from "./fetcher"

export function useComments(id: string) {
  const { data, error } = useSWR<Comment[], Error>(
    `/api/result/${id}/comment`,
    fetcher,
  )

  return {
    comments: data,
    loading: !error && !data,
    error: error,
  }
}
