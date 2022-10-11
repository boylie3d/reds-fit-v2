export type Workout = {
  id?: string
  title: string
  description: string
  scoreType: ScoringType
  live: string
  parameters?: TimeParams
  libraryRefs?: string[]
}

export interface TimeParams {
  rounds: number
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
