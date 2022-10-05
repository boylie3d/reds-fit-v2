import { AccessType, Profile } from "@/types"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Text,
} from "@chakra-ui/react"
import { useProfiles } from "hooks/profile"
import { useSWRConfig } from "swr"
import BlockedProfileCard from "./blockedProfileCard"
import UnverifiedProfileCard from "./unverifiedProfileCard"
import VerifiedProfileCard from "./verifiedProfileCard"

const superUserId = "UpKYkVJKXzQww0HiE88q6nD65mP2"

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
          <BlockedProfiles
            profiles={profiles.filter(
              profile => profile.accessType === AccessType.Blocked,
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
    <>
      <Text>Verification Required</Text>
      {profiles.map(profile => (
        <UnverifiedProfileCard key={profile.uid} profile={profile} />
      ))}
      <Divider mt="10px" mb="10px" />
    </>
  )
}

const VerifiedProfiles = ({ profiles }: ProfilesProps) => {
  if (!profiles || profiles.length === 0) return <div />

  return (
    <>
      <Text>Users</Text>
      {profiles.map(profile => (
        <VerifiedProfileCard
          key={profile.uid}
          superUserId={superUserId}
          profile={profile}
        />
      ))}
      <Divider mt="10px" mb="10px" />
    </>
  )
}

const BlockedProfiles = ({ profiles }: ProfilesProps) => {
  if (!profiles || profiles.length === 0) return <div />

  return (
    <>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Text>Blocked Users</Text>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            {profiles.map(profile => (
              <BlockedProfileCard key={profile.uid} profile={profile} />
            ))}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}
