import { Workout } from "@/types"
import { VStack } from "@chakra-ui/react"
import CalendarBar from "components/misc/calendarBar"
import WorkoutList from "components/workout/workoutList"
import { useState } from "react"
import WorkoutForm from "./workoutForm"

export default function WorkoutManagement() {
  const [calDate, setCalDate] = useState<Date>(new Date())

  const workoutFormSubmitted = (workout: Workout) => {
    console.log("done?")
    console.log(workout)
  }

  return (
    <>
      <VStack>
        <CalendarBar date={calDate} onChanged={setCalDate} />
        <WorkoutForm onSubmitted={workoutFormSubmitted} />
        <WorkoutList date={new Date()} />
      </VStack>
    </>
  )
}
