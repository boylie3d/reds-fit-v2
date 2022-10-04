import { AccessType, Profile } from "@/types"
import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Box,
  Center,
  Grid,
  GridItem,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react"
import { useSWRConfig } from "swr"

interface ProfileProps {
  profile: Profile
}

export default function UnverifiedProfileCard({ profile }: ProfileProps) {
  const { mutate } = useSWRConfig()

  const approve = async () => {
    profile.accessType = AccessType.Verified

    const res = await fetch(`/api/profile/${profile.uid}`, {
      method: "POST",
      body: JSON.stringify(profile),
    })
    mutate("/api/profile")
  }

  const reject = async () => {
    profile.accessType = AccessType.Blocked
    const res = await fetch(`/api/profile/${profile.uid}`, {
      method: "POST",
      body: JSON.stringify(profile),
    })
    mutate("/api/profile")
  }

  return (
    <Box borderWidth="1px" borderRadius={5} p="10px">
      <Grid templateColumns="repeat(5, 1fr)" h="100%" w="100%">
        <GridItem colSpan={4}>
          <HStack>
            <Avatar src={profile.photoURL} />
            <VStack align="left">
              <Box>{profile.displayName}</Box>
              <Box>
                <Text fontSize="xs">{profile.email}</Text>
              </Box>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem colSpan={1}>
          <Center h="100%">
            <VStack>
              <Text fontSize="xs">Approve?</Text>
              <HStack spacing={5}>
                <CloseIcon w={5} h={5} color="red" onClick={reject} />
                <CheckIcon w={5} h={5} color="green" onClick={approve} />
              </HStack>
            </VStack>
          </Center>
        </GridItem>
      </Grid>
    </Box>
  )
}
