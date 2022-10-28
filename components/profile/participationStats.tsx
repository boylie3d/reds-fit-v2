import { Result } from "@/types"
import { Center, Grid, GridItem, Text } from "@chakra-ui/react"
import { useAllFistbumps } from "hooks/fistbump"
import { useLocalProfile } from "hooks/profile"
import { useEffect, useState } from "react"

interface Props {
  results: Result[]
}

const ParticipationStats = ({ results }: Props) => {
  const { fistbumps, loading: fbLoading, error: fbError } = useAllFistbumps()
  const { profile, loading: pLoading, error: pError } = useLocalProfile()
  const [comments, setComments] = useState<number>(0)
  const [fbGiven, setFbGiven] = useState<number>(0)
  const [fbReceived, setFbReceived] = useState<number>(0)

  useEffect(() => {
    if (!fistbumps || !profile) return
    const given = fistbumps.filter(fb => fb.userId === profile.uid)
    setFbGiven(given.length)

    const received = fistbumps.filter(fb => {
      const isMines =
        results.find(r => r.id === fb.resultId) === undefined ? false : true
      if (isMines) return fb
    })
    setFbReceived(received.length)
  }, [fistbumps, profile])

  return (
    <>
      <Grid
        templateColumns="repeat(3, 1fr)"
        templateRows="repeat(2, 1fr)"
        gap={2}
        textAlign="center"
        pt={3}
      >
        <GridItem>
          <Center h="100%">
            <Text fontSize="3xl">{comments}</Text>
          </Center>
        </GridItem>
        <GridItem>
          <Center h="100%">
            <Text fontSize="3xl">{fbReceived}</Text>
          </Center>
        </GridItem>
        <GridItem>
          <Center h="100%">
            <Text fontSize="3xl">{fbGiven}</Text>
          </Center>
        </GridItem>
        <GridItem>
          <Text fontSize="xs" color="gray.400">
            {"Comments Posted"}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="xs" color="gray.400">
            {"Fistbumps Received"}
          </Text>
        </GridItem>
        <GridItem>
          <Text fontSize="xs" color="gray.400">
            {"Fistbumps Given"}
          </Text>
        </GridItem>
      </Grid>
    </>
  )
}

export default ParticipationStats
