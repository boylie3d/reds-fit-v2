import { Fistbump } from "@/types"
import useSWR from "swr"
import { objToQueryString } from "util/query"
import fetcher from "./fetcher"

export function useFistbumps(id: string) {
  const { data, error } = useSWR<Fistbump[], Error>(
    `/api/result/${id}/fistbump`,
    fetcher,
  )

  return {
    fistbumps: data,
    loading: !error && !data,
    error: error,
  }
}

export function useAllFistbumps() {
  const { data, error } = useSWR<Fistbump[], Error>(`/api/fistbump`, fetcher)

  return {
    fistbumps: data,
    loading: !error && !data,
    error: error,
  }
}

// export function useFistbumpsQuery(query?: any) {
//   const formattedQuery = objToQueryString(query)
//   const { data, error } = useSWR<Workout[], Error>(
//     `/api/fistbump${formattedQuery}`,
//     fetcher,
//   )

//   return {
//     workouts: data,
//     loading: !error && !data,
//     error: error,
//   }
// }

export function useQueriedFistbumps(id: string, query?: any) {
  const formattedQuery = objToQueryString(query)
  const { data, error } = useSWR<Fistbump[], Error>(
    `/api/result/${id}/fistbump${formattedQuery}`,
    fetcher,
  )

  return {
    fistbumps: data,
    loading: !error && !data,
    error: error,
  }
}
