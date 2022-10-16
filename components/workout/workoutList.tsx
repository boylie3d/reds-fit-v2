import { useWorkoutsByDate } from "hooks/workout"
import WorkoutCard from "./workoutCard"

interface ListProps {
  date: Date
}
export default function WorkoutList({ date }: ListProps) {
  const { workouts, loading, error } = useWorkoutsByDate(date)

  return (
    <>
      {workouts &&
        workouts.map(workout => (
          <WorkoutCard key={workout.id} workout={workout} />
        ))}
    </>
  )
}
