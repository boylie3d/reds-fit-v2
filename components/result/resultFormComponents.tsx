import { Result, Workout } from "@/types"
import {
  Box,
  Button,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"

interface ResultProps {
  workout: Workout
  result?: Result
  onSubmit: (result: Result) => void
}
//TODO form validation and required fields, useForm hooks
export function TimedResult({ workout, result, onSubmit }: ResultProps) {
  return (
    <Box w="100%">
      <VStack gap={2}>
        {Array.from({ length: workout.parameters!.rounds }).map((_, i) => (
          <HStack key={i}>
            <InputGroup>
              <InputLeftElement
                h="100%"
                children={
                  <Text color="gray.300" fontSize="sm">{`#${i + 1}`}</Text>
                }
              />
              <Input type="number" size="lg" placeholder="min" />
            </InputGroup>
            <Text fontSize="xl">{":"}</Text>
            <Input type="number" size="lg" placeholder="sec" />
          </HStack>
        ))}
        <Box w="100%">
          Notes:
          <Textarea
            placeholder="Enter notes here"
            resize="none"
            defaultValue={result?.description}
          />
        </Box>
        <Button variant="teamOutline" w="100%">
          {result ? "Update" : "Log Result"}
        </Button>
      </VStack>
    </Box>
  )
}
