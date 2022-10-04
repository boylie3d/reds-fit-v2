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
import { useProfiles } from "hooks/profile"

export default function UserManagement() {
  const { profiles, loading, error } = useProfiles()

  if (loading) return <div />

  return (
    <>
      {profiles && (
        <UnverifiedProfiles
          profiles={profiles?.filter(
            profile => profile.accessType === AccessType.Unverified,
          )}
        />
      )}
    </>
  )
}

interface ProfilesProps {
  profiles: Profile[]
}

const UnverifiedProfiles = ({ profiles }: ProfilesProps) => {
  if (!profiles || profiles.length === 0) return <div />

  return (
    <>
      <Text>Unverified Users:</Text>
      {profiles.map(profile => (
        <UnverifiedProfile profile={profile} />
      ))}
    </>
  )
}

interface ProfileProps {
  profile: Profile
}

const UnverifiedProfile = ({ profile }: ProfileProps) => {
  const approve = async () => {
    console.log("cheers")
  }
  const reject = async () => {
    console.log("piss off")
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
