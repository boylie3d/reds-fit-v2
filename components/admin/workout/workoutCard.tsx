import { Workout } from "@/types"
import { Box, Button, Text, VStack } from "@chakra-ui/react"

interface WorkoutProps {
  workout: Workout
}

export default function AdminCard({ workout }: WorkoutProps) {
  return (
    <Box boxShadow="md" w="100%" p="20px" borderRadius="md" borderWidth="1px">
      <VStack align="left" rowGap={4}>
        <Text fontSize="sm">{workout.title}</Text>
        <Text fontSize="xs">{workout.description}</Text>
        <Button bgColor="teamPrimary" color="white">
          Edit
        </Button>
      </VStack>
    </Box>
  )
}
