import { Result } from "@/types"
import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react"
import Card from "components/layout/card"
import LoadingPane from "components/misc/loading"
import { useProfile } from "hooks/profile"
import { useWorkout } from "hooks/workout"
import { BiCommentDetail } from "react-icons/bi"
import { FaRegHandRock } from "react-icons/fa"

interface ResultsProps {
  result: Result
}

export default function ResultsCard({ result }: ResultsProps) {
  const {
    workout,
    loading: wLoading,
    error: wError,
  } = useWorkout(result.workoutId)
  const {
    profile,
    loading: pLoading,
    error: pError,
  } = useProfile(result.userId)

  if (!profile || !workout) return <LoadingPane />

  //TODO hook fistbumps and comments up
  return (
    <Card>
      <HStack>
        <Avatar size="sm" src={profile.photoURL} />
        <VStack align="left">
          <Text fontSize="sm">{profile.displayName} logged a workout</Text>
          <Text fontSize="xs">{result.updated.toString()}</Text>
        </VStack>
      </HStack>
      <Box w="100%" h="50px" bgColor="gray.200">
        <Center h="100%">{result.value}</Center>
      </Box>
      <Text fontSize="sm">{result.description}</Text>
      <Flex pt={5}>
        <Text fontSize="xs">fistbumps</Text>
        <Spacer />
        <Text fontSize="xs">comments</Text>
      </Flex>
      <Divider />
      <Flex p={5}>
        <HStack h="100%">
          <Icon as={FaRegHandRock} />
          <Text fontSize="xs">Give Fistbump</Text>
        </HStack>{" "}
        <Spacer />
        <HStack h="100%">
          <Icon as={BiCommentDetail} />
          <Text fontSize="xs">Comment</Text>
        </HStack>
      </Flex>
    </Card>
  )
}
