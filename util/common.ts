import { Result, ScoringType, Workout } from "@/types"

export const formatResult = (workout: Workout, result: Result) => {
  switch (workout.scoreType) {
    case ScoringType.Time:
      const raw = parseInt(result.value)
      const date = new Date(0)
      date.setSeconds(raw)
      const trimVal = raw > 3600 ? 11 : 14
      const str = date.toISOString().substring(trimVal, 19)
      return str

    default:
      return result.value
  }
}
