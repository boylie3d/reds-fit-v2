import { AccessType, Profile } from "@/types"
import { CloseIcon } from "@chakra-ui/icons"
import {
  Avatar,
  AvatarBadge,
  Box,
  Center,
  Checkbox,
  Grid,
  GridItem,
  HStack,
  Icon,
  Text,
  useToast,
  VStack,
} from "@chakra-ui/react"
import { GiWhistle } from "react-icons/gi"
import { useSWRConfig } from "swr"

interface ProfileProps {
  profile: Profile
  superUserId: string
}

export default function VerifiedProfileCard({
  profile,
  superUserId,
}: ProfileProps) {
  const { mutate } = useSWRConfig()
  const toast = useToast()

  const toggleAdmin = async () => {
    const access =
      profile.accessType === AccessType.User
        ? AccessType.Admin
        : AccessType.User
    profile.accessType = access
    const res = await fetch(`/api/profile/${profile.uid}`, {
      method: "POST",
      body: JSON.stringify(profile),
    })

    const message =
      access == AccessType.Admin
        ? `${profile.displayName} has been added as an Administrator`
        : `${profile.displayName} has been removed as an administrator`

    toast({
      title: "Record Updated",
      description: message,
      status: "success",
      duration: 3000,
      isClosable: true,
    })

    mutate("/api/profile")
  }

  const block = async () => {
    if (profile.uid === superUserId) return
    profile.accessType = AccessType.Blocked
    const res = await fetch(`/api/profile/${profile.uid}`, {
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
            <Avatar src={profile.photoURL}>
              {profile.userType === "Coach" && (
                <AvatarBadge
                  boxSize="1.25em"
                  borderColor="white"
                  border="2px"
                  bg="teamPrimary"
                >
                  <Icon as={GiWhistle} color="white" padding="1px" />
                </AvatarBadge>
              )}
            </Avatar>
            <VStack align="left">
              <Box>{profile.displayName}</Box>
              <Box>
                <Text fontSize="xs">{profile.email}</Text>
              </Box>
            </VStack>
          </HStack>
        </GridItem>
        <GridItem colSpan={1}>
          <Grid
            templateColumns="repeat(2, 1fr)"
            templateRows="repeat(2, 1fr)"
            h="100%"
            w="100%"
            columnGap={4}
          >
            <GridItem>
              <Text fontSize="xs">Admin</Text>
            </GridItem>
            <GridItem>
              <Text fontSize="xs">Remove</Text>
            </GridItem>
            <GridItem>
              <Center h="100%">
                <Checkbox
                  disabled={profile.uid === superUserId}
                  defaultChecked={profile.accessType === AccessType.Admin}
                  onChange={toggleAdmin}
                />
              </Center>
            </GridItem>
            <GridItem>
              <Center h="100%">
                <CloseIcon
                  w={5}
                  h={5}
                  color={profile.uid !== superUserId ? "red" : "gray"}
                  onClick={block}
                />
              </Center>
            </GridItem>
          </Grid>
        </GridItem>
      </Grid>
    </Box>
  )
}
