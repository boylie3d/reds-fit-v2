import { Result } from "@/types"
import useSWR from "swr"
import fetcher from "./fetcher"

export function UseResult(id: string) {
  const { data, error } = useSWR<Result, Error>(`/api/result/${id}`, fetcher)

  return {
    result: data,
    loading: !error && !data,
    error: error,
  }
}

export function useResults() {
  const { data, error } = useSWR<Result[], Error>(`/api/result`, fetcher)

  return {
    results: data,
    loading: !error && !data,
    error: error,
  }
}
