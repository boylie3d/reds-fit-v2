import { Fistbump, Profile, Result } from "@/types"
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
import { useFistbumps, useQueriedFistbumps } from "hooks/fistbump"
import { useLocalProfile, useProfile } from "hooks/profile"
import { useWorkout } from "hooks/workout"
import { useEffect, useState } from "react"
import { BiCommentDetail } from "react-icons/bi"
import { FaHandRock, FaRegHandRock } from "react-icons/fa"

interface ResultsProps {
  result: Result
}

export default function ResultsCard({ result }: ResultsProps) {
  const {
    profile: lProfile,
    loading: lLoading,
    error: lError,
  } = useLocalProfile()

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

  if (!lProfile || !workout) return <LoadingPane />

  //TODO hook fistbumps and comments up
  return (
    <Card>
      <HStack>
        <Avatar size="sm" src={lProfile.photoURL} />
        <VStack align="left">
          <Text fontSize="sm">{lProfile.displayName} logged a workout</Text>
          <Text fontSize="xs">{result.updated.toString()}</Text>
        </VStack>
      </HStack>
      <Box w="100%" h="50px" bgColor="gray.200">
        <Center h="100%">{result.value}</Center>
      </Box>
      <Text fontSize="sm">{result.description}</Text>
      <Flex pt={5}>
        <FistbumpCounter profile={lProfile} result={result} />
        <Spacer />
        <Text fontSize="xs">comments</Text>
      </Flex>
      <Divider />
      <Flex p={5}>
        <FistbumpToggle profile={lProfile} result={result} />
        <Spacer />
        <HStack h="100%" style={{ cursor: "pointer" }}>
          <Icon as={BiCommentDetail} />
          <Text fontSize="xs">Comment</Text>
        </HStack>
      </Flex>
    </Card>
  )
}

interface SocialProps {
  profile: Profile
  result: Result
}

const FistbumpToggle = ({ profile, result }: SocialProps) => {
  const { fistbumps, loading, error } = useQueriedFistbumps(result.id || "", {
    userId: profile.uid,
  })

  const [existing, setExisting] = useState<Fistbump | undefined | null>(null)

  useEffect(() => {
    if (!fistbumps) return

    const existing = fistbumps.find(fb => fb.userId === profile.uid)
    console.log(existing)
    setExisting(existing)
  }, [fistbumps])

  const addFistbump = async () => {
    const fb: Fistbump = {
      userId: profile.uid!,
      created: new Date(),
    }
    const resp = await fetch(`/api/result/${result.id}/fistbump`, {
      method: "POST",
      body: JSON.stringify(fb),
    })
    const json = await resp.json()
    setExisting(json)
  }

  const removeFistbump = async () => {
    const resp = await fetch(
      `/api/result/${result.id}/fistbump/${existing?.id}`,
      {
        method: "DELETE",
      },
    )

    setExisting(undefined)
  }

  if (existing === null) return <div />

  return (
    <>
      {existing !== undefined ? (
        <HStack h="100%" style={{ cursor: "pointer" }} onClick={removeFistbump}>
          <Icon as={FaHandRock} color="teamPrimary" />
          <Text fontSize="xs">Remove Fistbump</Text>
        </HStack>
      ) : (
        <HStack h="100%" style={{ cursor: "pointer" }} onClick={addFistbump}>
          <Icon as={FaRegHandRock} />
          <Text fontSize="xs">Give Fistbump</Text>
        </HStack>
      )}
    </>
  )
}

const FistbumpCounter = ({ profile, result }: SocialProps) => {
  const { fistbumps, loading, error } = useFistbumps(result.id || "")

  return (
    <Text fontSize="xs">
      {fistbumps?.length} Fistbump
      {fistbumps ? fistbumps.length !== 1 && "s" : "s"}
    </Text>
  )
}
