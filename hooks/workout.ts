import { Workout } from "@/types"
import useSWR from "swr"
import { objToQueryString } from "util/query"
import fetcher from "./fetcher"

export function useWorkout(id: string) {
  const { data, error } = useSWR<Workout, Error>(`/api/workout/${id}`, fetcher)

  return {
    workout: data,
    loading: !error && !data,
    error: error,
  }
}

export function useWorkoutsByDate(date: Date) {
  const { data, error } = useSWR<Workout[], Error>(`/api/workout`, fetcher)

  return {
    workouts: data,
    loading: !error && !data,
    error: error,
  }
}

export function useWorkouts(query?: any) {
  const formattedQuery = objToQueryString(query)
  const { data, error } = useSWR<Workout[], Error>(
    `/api/workout${formattedQuery}`,
    fetcher,
  )

  return {
    workouts: data,
    loading: !error && !data,
    error: error,
  }
}
