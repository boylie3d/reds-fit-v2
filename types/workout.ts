export type Workout = {
  id?: string
  title: string
  description: string
  scoreType: ScoringType
  live: Date
  libraryRefs?: string[]
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
