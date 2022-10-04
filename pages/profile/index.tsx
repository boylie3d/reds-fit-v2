import { Profile } from "@/types"
import { Avatar, Box, Center, Heading, VStack } from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import { UseProfile } from "hooks/profile"
import { useAuthState } from "react-firebase-hooks/auth"
import { tmpUser } from "test"
import fb from "util/firebase"

export function ProfilePage() {
  const [user, loading, error] = useAuthState(fb.auth)
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = UseProfile(user ? user.uid : "")

  return (
    <AppLayout>
      <VStack>
        <Banner profile={profile} />
      </VStack>
    </AppLayout>
  )
}

export async function getServerSideProps() {
  return { props: { profile: tmpUser } }
}

export default ProfilePage

interface ProfileProps {
  profile?: Profile
}

const Banner = ({ profile }: ProfileProps) => {
  return (
    <Box
      w="100%"
      h="200px"
      bgColor="gray.800"
      // bgImage="banner-tile.jpg"
    >
      <Center h="100%" w="100%">
        <VStack>
          <Avatar
            size="xl"
            src={profile?.photoURL}
            // style={{ boxShadow: "0px 0px 50px 30px #ffffff" }}
          />
          <Heading
            size="md"
            color="white"
            // color="teamPrimary"
            zIndex={0}
          >
            {profile?.displayName}
          </Heading>
        </VStack>
      </Center>
    </Box>
  )
}
