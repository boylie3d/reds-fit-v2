import { Profile, Result, Workout } from "@/types"
import { Box, Center, Divider, Text, VStack } from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import Banner from "components/profile/banner"
import { GetServerSideProps, NextPage } from "next"
import { get as profileGet } from "pages/api/profile/[id]"
import { get as resultGet } from "pages/api/result/[id]"
import { get as workoutGet } from "pages/api/workout/[id]"

interface Props {
  result: Result
  profile: Profile
  workout: Workout
}

const ResultPage: NextPage<Props> = ({ result, profile, workout }: Props) => {
  return (
    <AppLayout>
      <VStack gap={3}>
        <Banner profile={profile} />
        <Box w="100%">
          <ResultHeader result={result} />
        </Box>
        <Box w="100%">
          <Text>{result.description}</Text>
        </Box>
      </VStack>
      <Divider />
    </AppLayout>
  )
}

interface ResultProps {
  result: Result
}

const ResultHeader = ({ result }: ResultProps) => {
  return (
    <Box h="80px" w="100%" bgColor="gray.300">
      <Center h="100%">
        <Text fontSize="2xl">{result.value}</Text>
      </Center>
    </Box>
  )
}

//TODO: swr stuff? maybe?
export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.query
  const idStr = id ? id.toString() : ""
  const result = await resultGet(idStr)
  const profile = await profileGet(result.userId)
  const workout = await workoutGet(result.workoutId)

  return {
    props: {
      result: result,
      profile: profile,
      workout: workout,
    },
  }
}

export default ResultPage
