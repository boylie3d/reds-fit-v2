import { Comment, Fistbump, Result } from "@/types"
import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react"
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
      .sort((a, b) => b.item.created.valueOf() - a.item.created.valueOf())
    //TODO: sorting isn't working, also no comments yet
    setSocialData(fistbumps)
  }

  if (rLoading || pLoading) return <LoadingPane />

  return (
    <AppLayout>
      <VStack gap={3}>
        {socialData && socialData.map(data => <UpdateItem data={data} />)}
      </VStack>
    </AppLayout>
  )
}

export default Updates

interface UpdateProps {
  data: UpdateItem
}

const UpdateItem = ({ data }: UpdateProps) => {
  const { profile, loading, error } = useProfile(data.item.userId)
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

  if (loading || wLoading) return <LoadingPane />
  if (!profile) return <div />

  return (
    <Box w="100%">
      <HStack>
        <Avatar size="sm" src={profile?.photoURL} />
        <Box>
          {fistbump !== undefined ? (
            <Text fontSize="sm">{`${profile.displayName} gave you fistbumps on your "${workout?.title}" workout`}</Text>
          ) : (
            <Text fontSize="sm">{`${profile.displayName} commented on your "${workout?.title}" workout`}</Text>
          )}
          <Text color="gray.400" fontSize="xs">
            {new Date(data.item.created).toDateString()}
          </Text>
        </Box>
      </HStack>
    </Box>
  )
}
