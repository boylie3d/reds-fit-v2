import { AccessType, Profile } from "@/types"
import { Box, Divider, Text } from "@chakra-ui/react"
import { useProfiles } from "hooks/profile"
import { useEffect } from "react"
import { useSWRConfig } from "swr"
import UnverifiedProfileCard from "./unverifiedProfileCard"
import VerifiedProfileCard from "./verifiedProfileCard"

export default function UserManagement() {
  const { profiles, loading, error } = useProfiles()
  // const [localProfiles, setLocalProfiles] = useState<Profile[]>()
  const { mutate } = useSWRConfig()

  useEffect(() => {
    console.log(profiles)
  }, [profiles])

  const updateProfiles = (profile: Profile) => {
    // mutate("/api/profiles")
  }

  if (!profiles) return <div />

  return (
    <>
      {profiles && (
        <>
          <UnverifiedProfiles
            profiles={profiles.filter(
              profile => profile.accessType === AccessType.Unverified,
            )}
            onUpdate={updateProfiles}
          />
          <VerifiedProfiles
            profiles={profiles.filter(
              profile =>
                profile.accessType !== AccessType.Blocked &&
                profile.accessType !== AccessType.Unverified,
            )}
            onUpdate={updateProfiles}
          />
        </>
      )}
    </>
  )
}

interface ProfilesProps {
  profiles: Profile[]
  onUpdate: (profile: Profile) => void
}

const UnverifiedProfiles = ({ profiles, onUpdate }: ProfilesProps) => {
  if (!profiles || profiles.length === 0) return <div />

  return (
    <Box>
      <Text>Verification Required</Text>
      {profiles.map(profile => (
        <UnverifiedProfileCard
          onUpdate={onUpdate}
          key={profile.uid}
          profile={profile}
        />
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
