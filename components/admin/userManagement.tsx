import { AccessType, Profile } from "@/types"
import { Box, Divider, Text } from "@chakra-ui/react"
import { useProfiles } from "hooks/profile"
import { useSWRConfig } from "swr"
import UnverifiedProfileCard from "./unverifiedProfileCard"
import VerifiedProfileCard from "./verifiedProfileCard"

export default function UserManagement() {
  const { profiles, loading, error } = useProfiles()
  const { mutate } = useSWRConfig()

  if (!profiles) return <div />

  return (
    <>
      {profiles && (
        <>
          <UnverifiedProfiles
            profiles={profiles.filter(
              profile => profile.accessType === AccessType.Unverified,
            )}
          />
          <VerifiedProfiles
            profiles={profiles.filter(
              profile =>
                profile.accessType !== AccessType.Blocked &&
                profile.accessType !== AccessType.Unverified,
            )}
          />
        </>
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
    <Box>
      <Text>Verification Required</Text>
      {profiles.map(profile => (
        <UnverifiedProfileCard key={profile.uid} profile={profile} />
      ))}
      <Divider mt="10px" mb="10px" />
    </Box>
  )
}

const VerifiedProfiles = ({ profiles }: ProfilesProps) => {
  if (!profiles || profiles.length === 0) return <div />

  return (
    <>
      <Text>Users</Text>
      {profiles.map(profile => (
        <VerifiedProfileCard key={profile.uid} profile={profile} />
      ))}
    </>
  )
}
