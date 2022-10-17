import { Result, ScoringType, Workout } from "@/types"
import { Box, Center, Divider, Heading } from "@chakra-ui/react"
import LoadingPane from "components/misc/loading"
import { useWorkout } from "hooks/workout"
import { TimedResult } from "./resultFormComponents"

interface ResultProps {
  result: Result
}

export default function ResultForm({ result }: ResultProps) {
  const { workout, loading, error } = useWorkout(result.workoutId)

  if (!workout) return <LoadingPane />

  return (
    <Box w="100%">
      <Box pb={3}>
        <Center w="100%">
          <Heading pb={3} size="sm">
            {workout.title}
          </Heading>
        </Center>
        {workout.description}
        <Divider />
      </Box>
      <Box>
        Results:
        <ResultFilter workout={workout} />
      </Box>
    </Box>
  )
}

interface WorkoutProps {
  workout: Workout
}

const ResultFilter = ({ workout }: WorkoutProps) => {
  switch (workout.scoreType) {
    case ScoringType.Time:
      return <TimedResult onSubmit={() => {}} workout={workout} />
    default:
      return <div>{"type not implemented"}</div>
  }
}
