import { Profile } from "@/types"
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  Heading,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import ResultList from "components/result/resultList"
import { useLocalProfile } from "hooks/profile"
import { useResults } from "hooks/result"
import { BsPencilSquare } from "react-icons/bs"
import { tmpUser } from "test"

export function ProfilePage() {
  const { profile, loading: pLoading, error: pError } = useLocalProfile()

  const {
    results,
    loading: rLoading,
    error: rError,
  } = useResults({ userId: profile ? profile.id : "" })

  return (
    <AppLayout>
      <Banner profile={profile} />
      <Toolbar />
      {results ? <ResultList results={results} /> : <div />}
    </AppLayout>
  )
}

export async function getServerSideProps() {
  return { props: { profile: tmpUser } }
}

export default ProfilePage

interface ProfileProps {
  profile?: Profile
}

const Banner = ({ profile }: ProfileProps) => {
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
    <Box borderWidth="2px" w="100%" p="10px">
      <Box>
        <Flex alignItems="center">
          <Box>
            <Center>
              <VStack>
                <Button
                  w="100%"
                  colorScheme="blue"
                  //  variant="unstyled"
                >
                  <Icon w={6} h={6} as={BsPencilSquare} />
                </Button>
                <Text fontSize="xs">Edit</Text>
              </VStack>
            </Center>
          </Box>
          <Box>
            <Button variant="unstyled">
              <VStack>
                <Icon w={6} h={6} as={BsPencilSquare} />
                <Text fontSize="xs">Edit</Text>
              </VStack>
            </Button>
          </Box>
        </Flex>
      </Box>
    </Box>
  )
}
