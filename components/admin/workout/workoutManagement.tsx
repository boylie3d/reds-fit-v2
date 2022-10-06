import { VStack } from "@chakra-ui/react"
import CalendarBar from "components/misc/calendarBar"
import WorkoutList from "components/workout/workoutList"

export default function WorkoutManagement() {
  return (
    <>
      <VStack>
        <CalendarBar />
        {/* <Button onClick={post}>Clicky plz</Button>
        <Button onClick={postResult}>Clicky result</Button> */}
        <WorkoutList date={new Date()} />
      </VStack>
    </>
  )
}
