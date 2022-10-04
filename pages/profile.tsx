import { Profile } from "@/types"
import { Avatar, Box, Center, Heading, VStack } from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import { tmpUser } from "test"

interface ProfileProps {
  profile: Profile
}

export function ProfilePage({ profile }: ProfileProps) {
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
            src={profile.profilePhoto}
            // style={{ boxShadow: "0px 0px 50px 30px #ffffff" }}
          />
          <Heading
            size="md"
            color="white"
            // color="teamPrimary"
            zIndex={0}
          >{`${profile.firstName} ${profile.lastName}`}</Heading>
        </VStack>
      </Center>
    </Box>
  )
}
