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

export const getYoutubeId = (url: string) => {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/
  const match = url.match(regExp)

  if (match === null) return ""
  else return match[2]
}

export const getYoutubeLink = (id: string) => {
  return `https://www.youtube.com/embed/${id}?autoplay=1&modestbranding=1`
}

export const getYoutubeThumb = (id: string) => {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}
