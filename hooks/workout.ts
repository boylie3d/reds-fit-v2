import { Workout } from "@/types"
import useSWR from "swr"
import fetcher from "./fetcher"

export function UseWorkout(id: string) {
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

export function useWorkouts() {
  const { data, error } = useSWR<Workout[], Error>(`/api/workout`, fetcher)

  return {
    workouts: data,
    loading: !error && !data,
    error: error,
  }
}
