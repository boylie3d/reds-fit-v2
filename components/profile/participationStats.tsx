import { Result } from "@/types"
import { Center, Grid, GridItem, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface Props {
  results: Result[]
}

const ParticipationStats = ({ results }: Props) => {
  const [comments, setComments] = useState<number>(0)
  const [fbGiven, setFbGiven] = useState<number>(0)
  const [fbReceived, setFbReceived] = useState<number>(0)

  useEffect(() => {
    console.log(results)
  }, [results])

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
          <Text fontSize="xs" color="gray.400" pl={4} pr={4}>
            {"Fistbumps Given"}
          </Text>
        </GridItem>
      </Grid>
    </>
  )
}

export default ParticipationStats
