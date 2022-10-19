import { Profile, Result } from "@/types"
import {
  Avatar,
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Icon,
  Link,
  LinkOverlay,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import { signOut } from "@firebase/auth"
import AppLayout from "components/layout/appLayout"
import Card from "components/layout/card"
import Banner from "components/profile/banner"
import ResultList from "components/result/resultList"
import { useLocalProfile, useProfiles } from "hooks/profile"
import { useResults } from "hooks/result"
import { GetServerSideProps, NextPage } from "next"
import { get } from "pages/api/profile/[id]"
import { useEffect, useState } from "react"
import { AiOutlineLogout } from "react-icons/ai"
import { BiBook } from "react-icons/bi"
import { BsPencilSquare } from "react-icons/bs"
import { HiOutlineUserGroup } from "react-icons/hi"
import fb from "util/firebase"

interface Props {
  profile: Profile
}

const Profile: NextPage<Props> = ({ profile }) => {
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

//TODO: swr stuff? maybe?
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

  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
  ]
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [20, 10, 1, 2, 4, 12, 13, 11, 83, 32, 98, 24],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  }

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Bar Chart",
      },
    },
  }

  return (
    <Card>
      <Center>Active Days</Center>
      {/* <Bar width="100%" height="200px" options={options} data={data} /> */}
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

const Toolbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { profiles, loading, error } = useProfiles()

  return (
    <Box w="100%" p="10px">
      <Flex alignItems="center" gap={5}>
        <Box flex={1}>
          <Center>
            <Button variant="unstyled" onClick={onOpen}>
              <VStack>
                <Icon w={6} h={6} as={HiOutlineUserGroup} />
                <Text fontSize="xs">Team</Text>
              </VStack>
            </Button>
          </Center>
        </Box>
        <Box flex={1}>
          <Center>
            <Button variant="unstyled">
              <LinkOverlay href="/library">
                <VStack>
                  <Icon w={6} h={6} as={BiBook} />
                  <Text fontSize="xs">Library</Text>
                </VStack>
              </LinkOverlay>
            </Button>
          </Center>
        </Box>
        <Box flex={1}>
          <Center>
            <Button variant="unstyled">
              <LinkOverlay href="/profile/update">
                <VStack>
                  <Icon w={6} h={6} as={BsPencilSquare} />
                  <Text fontSize="xs">Edit</Text>
                </VStack>
              </LinkOverlay>
            </Button>
          </Center>
        </Box>
        <Box flex={1}>
          <Center>
            <Button variant="unstyled" onClick={() => signOut(fb.auth)}>
              <VStack>
                <Icon w={6} h={6} as={AiOutlineLogout} />
                <Text fontSize="xs">Log Out</Text>
              </VStack>
            </Button>
          </Center>
        </Box>
      </Flex>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>My Team</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={3} w="100%">
              <>
                {profiles &&
                  profiles.map(p => (
                    <Link key={p.uid} w="100%" href={`/profiles/${p.uid}`}>
                      <HStack w="100%" key={p.uid}>
                        <Avatar size="md" src={p.photoURL} />
                        <VStack>
                          <Text>{p.displayName}</Text>
                        </VStack>
                      </HStack>
                    </Link>
                  ))}
              </>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  )
}
