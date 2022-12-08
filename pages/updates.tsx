import { Comment, Fistbump, Result } from "@/types"
import {
  Avatar,
  Box,
  Center,
  HStack,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import LoadingPane from "components/misc/loading"
import { useLocalProfile, useProfile } from "hooks/profile"
import { useResults } from "hooks/result"
import { useWorkout } from "hooks/workout"

import { NextPage } from "next"
import { useEffect, useState } from "react"

interface UpdateItem {
  item: Fistbump | Comment
  result: Result
}

const Updates: NextPage = () => {
  const { profile, loading: pLoading, error: pError } = useLocalProfile()
  const {
    results,
    loading: rLoading,
    error: rError,
  } = useResults({
    userId: profile ? profile.uid : "",
  })

  useEffect(() => {
    fetchAndSort()
  }, [results])

  const [socialData, setSocialData] = useState<any[]>([])

  const fetchAndSort = async () => {
    if (!results) return

    const promises = results.map(r => {
      return new Promise<any>((res, rej) => {
        fetch(`/api/result/${r.id}/fistbump`).then(resp =>
          resp.json().then(json => {
            res(
              Object.values(json).map(i => {
                return {
                  item: i,
                  result: r,
                }
              }),
            )
          }),
        )
      })
    })
    const responses = await Promise.allSettled(promises)
    const fistbumps = (
      responses.filter(c => c.status === "fulfilled") as PromiseFulfilledResult<
        UpdateItem[]
      >[]
    )
      .map(c => c.value)
      .flat()
      .sort((a, b) => b.item.created!.valueOf() - a.item.created!.valueOf())
    //TODO: sorting isn't working, also no comments yet
    setSocialData(fistbumps)
  }

  if (rLoading || pLoading) return <LoadingPane />

  return (
    <AppLayout>
      <Center>
        <VStack gap={3}>
          {socialData && socialData.length > 0 ? (
            socialData.map(data => <UpdateItem key={data.id} data={data} />)
          ) : (
            <Center p={10}>
              <VStack gap={3} color="gray.400">
                <Text fontSize="4xl">{":("}</Text>
                <Text justifyContent="center" align="center">
                  {"No updates here - go do some workouts!"}
                </Text>
              </VStack>
            </Center>
          )}
        </VStack>
      </Center>
    </AppLayout>
  )
}

export default Updates

interface UpdateProps {
  data: UpdateItem
}

const UpdateItem = ({ data }: UpdateProps) => {
  const { profile, loading, error } = useProfile(data.item.userId)
  const { profile: local, loading: localLoading } = useLocalProfile()
  const [fistbump, setFistbump] = useState<Fistbump | undefined>()
  const [comment, setComment] = useState<Comment | undefined>()
  const {
    workout,
    loading: wLoading,
    error: wError,
  } = useWorkout(data.result.workoutId)

  useEffect(() => {
    if ((data.item as Comment).message === undefined) {
      setFistbump(data.item as Fistbump)
    } else {
      setComment(data.item as Comment)
    }
  }, [data])

  if (loading || wLoading || localLoading) return <LoadingPane />
  if (!profile) return <div />
  if (!local) return <div />

  return (
    <Box w="100%">
      <HStack>
        <Box>
          <Link href={`/profile/${profile.uid}`}>
            <Avatar size="sm" src={profile?.photoURL} />
          </Link>
        </Box>
        <Box>
          <Text fontSize="sm">
            <Link href={`/profile/${profile.uid}`}>
              {profile.uid === local.uid ? "You" : profile.displayName}
            </Link>
            {fistbump !== undefined
              ? ` gave ${
                  local.uid === profile.uid ? "yourself" : "you"
                } fistbumps on your "${workout?.title}" workout`
              : `commented on your "${workout?.title}" workout`}
          </Text>
          <Text color="gray.400" fontSize="xs">
            {new Date(data.item.created!).toDateString()}
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}
