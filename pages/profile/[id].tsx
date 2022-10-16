import { Profile } from "@/types"
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
import { UseLocalProfile } from "hooks/profile"
import { GetServerSideProps, NextPage } from "next"
import { get } from "pages/api/profile/[id]"
import { useEffect, useState } from "react"
import { BsPencilSquare } from "react-icons/bs"

interface Props {
  profile: Profile
}

const Profile: NextPage<Props> = ({ profile }: Props) => {
  const { profile: localProfile, loading, error } = UseLocalProfile()
  const [isLocal, setIsLocal] = useState(false)

  useEffect(() => {
    if (!localProfile) return
    setIsLocal(profile.uid === localProfile.uid)
  }, [profile, localProfile])

  return (
    <AppLayout>
      <Banner profile={profile} />
      <>{isLocal && <Toolbar />}</>
      <ActivityCard />
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

const ActivityCard = () => {
  return <Card></Card>
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
        <Button variant="unstyled">
          <VStack>
            <Icon w={6} h={6} as={BsPencilSquare} />
            <Text fontSize="xs">Edit</Text>
          </VStack>
        </Button>
      </Flex>
    </Box>
  )
}
