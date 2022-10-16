import { Result } from "@/types"
import useSWR from "swr"
import { objToQueryString } from "util/query"
import fetcher from "./fetcher"

export function useResult(id: string) {
  const { data, error } = useSWR<Result, Error>(`/api/result/${id}`, fetcher)

  return {
    result: data,
    loading: !error && !data,
    error: error,
  }
}

export function useResults(query?: any) {
  const formattedQuery = objToQueryString(query)
  const { data, error } = useSWR<Result[], Error>(
    `/api/result${formattedQuery}`,
    fetcher,
  )

  return {
    results: data,
    loading: !error && !data,
    error: error,
  }
}
