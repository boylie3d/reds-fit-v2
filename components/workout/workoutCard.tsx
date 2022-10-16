import { Result, ScoringType, Workout } from "@/types"
import { Box, Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react"
import { useLocalProfile } from "hooks/profile"
import { useResults } from "hooks/result"
import { getFormattedTime } from "util/time"

interface CardProps {
  workout: Workout
}

export default function WorkoutCard({ workout }: CardProps) {
  const {
    profile,
    loading: profileLoading,
    error: profileErr,
  } = useLocalProfile()

  const {
    results: allResults,
    loading: allLoading,
    error: allErr,
  } = useResults({
    workoutId: workout.id,
  })

  const {
    results: yourResults,
    loading: yourLoading,
    error: yourErr,
  } = useResults({
    workoutId: workout.id,
    userId: profile?.id,
  })

  if (!allResults || !yourResults) return <div />

  return (
    <Box boxShadow="md" w="100%" p="20px" borderRadius="md" borderWidth="1px">
      {/* <Box w="100%" variant='card'> */}
      <VStack align="left" rowGap={4}>
        <Text fontSize="sm">{workout.title}</Text>
        <Text fontSize="xs">{workout.description}</Text>
        <Flex>
          <Text fontSize="sm">Prepare</Text>
          <Spacer />
          <Text fontSize="sm">
            {allResults ? allResults.length : 0} Result
            {allResults ? allResults.length !== 1 && "s" : "s"}
          </Text>
        </Flex>
        {yourResults && yourResults?.length === 0 ? (
          <Button>Log Your Result</Button>
        ) : (
          <Button variant="teamOutline">
            {buttonProps(workout, yourResults[0])}
          </Button>
        )}
      </VStack>
    </Box>
  )
}

const buttonProps = (workout: Workout, result: Result) => {
  switch (workout.scoreType) {
    case ScoringType.Reps:
      return <>what up fam</>
    case ScoringType.Time:
      return <>{getFormattedTime(result.value)}</>
    default:
      return <>Type not implemented</>
  }
}
