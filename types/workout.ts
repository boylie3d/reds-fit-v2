export type Workout = {
  id: string
  title: string
  description: string
  date: Date
}

export type WorkoutResult = {
  id: string
  title: string
  description: string
  workoutId: string
  created: Date
  updated: Date
}
