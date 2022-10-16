import { AccessType, Profile } from "@/types"
import {
  Avatar,
  Box,
  Button,
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

export default function BlockedProfileCard({ profile }: ProfileProps) {
  const { mutate } = useSWRConfig()

  const unblock = async () => {
    profile.accessType = AccessType.User

    const res = await fetch(`/api/profile/${profile.id}`, {
      method: "PUT",
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
            <Button variant="outline" colorScheme="green" onClick={unblock}>
              <Text fontSize="xs">Unblock</Text>
            </Button>
          </Center>
        </GridItem>
      </Grid>
    </Box>
  )
}
