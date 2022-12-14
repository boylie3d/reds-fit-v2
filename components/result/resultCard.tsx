import { Fistbump, Profile, Result } from "@/types"
import {
  Avatar,
  Box,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Link,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react"
import Card from "components/layout/card"
import LoadingPane from "components/misc/loading"
import { useFistbumps, useQueriedFistbumps } from "hooks/fistbump"
import { useLocalProfile, useProfile } from "hooks/profile"
import { useWorkout } from "hooks/workout"
import { DateTime } from "luxon"
import { useEffect, useState } from "react"
import { FaHandRock, FaRegHandRock } from "react-icons/fa"
import { useSWRConfig } from "swr"
import { formatResult } from "util/common"

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

  if (!lProfile || !workout || !profile) return <LoadingPane />

  //TODO hook fistbumps and comments up
  return (
    <Card>
      <HStack>
        <Box>
          <Link href={`/profile/${profile.uid}`}>
            <Avatar size="sm" src={profile.photoURL} />
          </Link>
        </Box>
        <VStack align="left">
          <HStack>
            <Text fontSize="sm">
              <Link href={`/profile/${profile.uid}`}>
                <b>{profile.displayName}</b>
              </Link>
              {" logged a workout"}
            </Text>
          </HStack>
          <Text fontSize="xs">
            {DateTime.fromISO(result.updated.toString()).toFormat("ff")}
          </Text>
        </VStack>
      </HStack>
      <Box pt="1em" pb="1em">
        <Box borderRadius={"5px"} bgColor="gray.200" w="100%" h="50px">
          <Center h="100%">{formatResult(workout, result)}</Center>
        </Box>
      </Box>
      <Text fontSize="sm">{result.description}</Text>
      <Flex pt={5}>
        <FistbumpCounter profile={lProfile} result={result} />
        <Spacer />
        {/* TODO:uncomment and hook up */}
        {/* <Text fontSize="xs">comments</Text> */}
      </Flex>
      <Divider />
      <Flex p={5}>
        <FistbumpToggle profile={lProfile} result={result} />
        <Spacer />
        {/* TODO:uncomment and hook up */}
        {/* <Link href={`/result/${result.id}`}>
          <HStack h="100%" style={{ cursor: "pointer" }}>
            <Icon as={BiCommentDetail} />
            <Text fontSize="xs">Comment</Text>
          </HStack>
        </Link> */}
      </Flex>
    </Card>
  )
}

interface SocialProps {
  profile: Profile
  result: Result
}

const FistbumpToggle = ({ profile, result }: SocialProps) => {
  const { mutate } = useSWRConfig()

  const { fistbumps, loading, error } = useQueriedFistbumps(result.id!, {
    userId: profile.uid,
  })

  const [existing, setExisting] = useState<Fistbump | undefined | null>(null)

  useEffect(() => {
    if (!fistbumps) return

    const existing = fistbumps.find(fb => fb.userId === profile.uid)
    setExisting(existing)
  }, [fistbumps])

  const addFistbump = async () => {
    const fb: Fistbump = {
      userId: profile.uid!,
      created: new Date(),
      resultId: result.id!,
    }
    const resp = await fetch(`/api/result/${result.id}/fistbump`, {
      method: "POST",
      body: JSON.stringify(fb),
    })

    const json = await resp.json()
    setExisting(json)
    mutate(`/api/result/${result.id}/fistbump`)
  }

  const removeFistbump = async () => {
    const resp = await fetch(
      `/api/result/${result.id}/fistbump/${existing?.id}`,
      {
        method: "DELETE",
      },
    )

    setExisting(undefined)
    mutate(`/api/result/${result.id}/fistbump`)
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

const FistbumpCounter = ({ result }: SocialProps) => {
  const { fistbumps, loading, error } = useFistbumps(result.id || "")

  return (
    <Text fontSize="xs">
      {fistbumps?.length} Fistbump
      {fistbumps ? fistbumps.length !== 1 && "s" : "s"}
    </Text>
  )
}
