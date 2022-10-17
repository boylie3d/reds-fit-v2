import { Profile, Result } from "@/types"
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  LinkOverlay,
  Text,
  VStack,
} from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import Card from "components/layout/card"
import ResultList from "components/result/resultList"
import { useLocalProfile } from "hooks/profile"
import { useResults } from "hooks/result"
import { GetServerSideProps, NextPage } from "next"
import { get } from "pages/api/profile/[id]"
import { useEffect, useState } from "react"
import { BsPencilSquare } from "react-icons/bs"
import { Bars, Chart } from "rumble-charts"

interface Props {
  profile: Profile
}

const Profile: NextPage<Props> = ({ profile }: Props) => {
  const {
    profile: localProfile,
    loading: pLoading,
    error: pError,
  } = useLocalProfile()
  const { results, loading, error } = useResults({ userId: profile.uid })
  const [isLocal, setIsLocal] = useState(false)

  useEffect(() => {
    if (!localProfile) return
    setIsLocal(profile.uid === localProfile.uid)
  }, [profile, localProfile])

  return (
    <AppLayout>
      <VStack gap={3}>
        <Banner profile={profile} />
        <>{isLocal && <Toolbar />}</>
        <ActivityCard results={results} />
        <ParticipationCard />
        <ResultList results={results} />
      </VStack>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { id } = ctx.query
  const idStr = id ? id.toString() : ""
  const userProfile = await get(idStr)

  return {
    props: {
      profile: userProfile,
    },
  }
}

export default Profile

interface ActivityProps {
  results: Result[] | undefined
}

interface ChartItem {
  count: number
  date: string
}

const ActivityCard = ({ results }: ActivityProps) => {
  useEffect(() => {
    if (!results) return

    // let items: ChartItem[] = []
    // results.forEach(r => {
    //   const item = items.find(f => f.date === toUntimedDate(r.created))
    // })
  }, [results])

  const series = [
    {
      data: [1, 2, 3],
    },
    {
      data: [5, 7, 11],
    },
    {
      data: [13, 17, 19],
    },
  ]

  return (
    <Card>
      <Center>Active Days</Center>
      <Chart width={10} series={series}>
        <Bars innerPadding={5} groupPadding={10} />
      </Chart>
      <Text>bar graph here</Text>
    </Card>
  )
}

const ParticipationCard = () => {
  return (
    <Card>
      <Center>Participation Stats</Center>
      <Text>stats pane here</Text>
    </Card>
  )
}

const Banner = ({ profile }: Props) => {
  return (
    <Box w="100%" h="200px" bgColor="gray.800" bgImage="banner-tile.png">
      <Center h="100%" w="100%">
        <VStack>
          <Avatar size="xl" src={profile?.photoURL} />
          <Heading size="md" color="white" zIndex={0}>
            {profile?.displayName}
          </Heading>
        </VStack>
      </Center>
    </Box>
  )
}

const Toolbar = () => {
  return (
    <Box
      // borderWidth="2px"
      w="100%"
      p="10px"
    >
      <Flex alignItems="center" gap={5}>
        <Button variant="unstyled">
          <LinkOverlay href="/profile/update">
            <VStack>
              <Icon w={6} h={6} as={BsPencilSquare} />
              <Text fontSize="xs">Edit</Text>
            </VStack>
          </LinkOverlay>
        </Button>
        {/* <Button variant="unstyled">
          <VStack>
            <Icon w={6} h={6} as={BsPencilSquare} />
            <Text fontSize="xs">Edit</Text>
          </VStack>
        </Button> */}
      </Flex>
    </Box>
  )
}
