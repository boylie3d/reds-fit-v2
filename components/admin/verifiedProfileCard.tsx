import { AccessType, Profile } from "@/types"
import { CloseIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Box,
  Center,
  Checkbox,
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

const superUserId = "UpKYkVJKXzQww0HiE88q6nD65mP2"

export default function VerifiedProfileCard({ profile }: ProfileProps) {
  const { mutate } = useSWRConfig()

  const toggleConfig = async () => {
    const access =
      profile.accessType === AccessType.Verified
        ? AccessType.Admin
        : AccessType.Verified
    profile.accessType = access
    const res = await fetch(`/api/profile/${profile.uid}`, {
      method: "POST",
      body: JSON.stringify(profile),
    })
    mutate("/api/profile")
  }

  const block = async () => {
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
          <Center>
            <HStack>
              <Center h="100%">
                <VStack>
                  <Text fontSize="xs">Admin</Text>
                  <HStack spacing={5}>
                    <Checkbox
                      disabled={profile.uid === superUserId}
                      defaultChecked={profile.accessType === AccessType.Admin}
                      onChange={toggleConfig}
                    />
                  </HStack>
                </VStack>
              </Center>
              <Center h="100%">
                <VStack>
                  <Text fontSize="xs">Remove?</Text>
                  <CloseIcon w={5} h={5} color="red" onClick={block} />
                </VStack>
              </Center>
            </HStack>
          </Center>
        </GridItem>
      </Grid>
    </Box>
  )
}
