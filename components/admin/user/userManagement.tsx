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
import { useAllProfiles } from "hooks/profile"
import BlockedProfileCard from "./blockedProfileCard"
import UserProfileCard from "./userProfileCard"

const superUserId = "UpKYkVJKXzQww0HiE88q6nD65mP2"

export default function UserManagement() {
  const { profiles, loading, error } = useAllProfiles()

  if (!profiles) return <div />

  return (
    <>
      {profiles && (
        <>
          <UserProfiles
            profiles={profiles.filter(
              profile => profile.accessType !== AccessType.Blocked,
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

const UserProfiles = ({ profiles }: ProfilesProps) => {
  if (!profiles || profiles.length === 0) return <div />

  return (
    <>
      <Text>Users</Text>
      {profiles.map(profile => (
        <UserProfileCard
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
