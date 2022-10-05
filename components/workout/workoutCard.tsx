import { Workout } from "@/types"
import { Box, Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react"
import { useResults } from "hooks/result"

interface CardProps {
  workout: Workout
}

export default function WorkoutCard({ workout }: CardProps) {
  const { results, loading, error } = useResults()

  return (
    <Box boxShadow="md" w="90%" p="20px" borderRadius="md" borderWidth="1px">
      <VStack align="left" rowGap={4}>
        <Text fontSize="sm">{workout.title}</Text>
        <Text fontSize="xs">{workout.description}</Text>
        <Flex>
          <Text fontSize="sm">Prepare</Text>
          <Spacer />
          <Text fontSize="sm">
            {results ? results.length : 0} Result
            {results ? results.length !== 1 && "s" : "s"}
          </Text>
        </Flex>
        <Button bgColor="teamPrimary" color="white">
          Log Your Result
        </Button>
      </VStack>
    </Box>
  )
}
