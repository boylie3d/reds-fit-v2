export type Workout = {
  id?: string
  title: string
  description: string
  scoreType: ScoringType
  live: Date
}

export type WorkoutResult = {
  id?: string
  title: string
  comment: string
  workoutId: string
  created: Date
  updated: Date
}

export enum ScoringType {
  Time = "Time",
  RoundsAndReps = "Rounds + Reps",
  Reps = "Reps",
  Load = "Load",
  Other = "Other / Text",
  Calories = "Calories",
  Points = "Points",
  Meters = "Meters",
  Centimeters = "Centimeters",
  Feet = "Feet",
  Inches = "Inches",
}
