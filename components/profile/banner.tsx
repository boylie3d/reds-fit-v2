import { Profile } from "@/types"
import { Avatar, Box, Center, Heading, VStack } from "@chakra-ui/react"
import { NextPage } from "next"

interface Props {
  profile: Profile
}
const Banner: NextPage<Props> = ({ profile }) => {
  return (
    <Box w="100%" h="200px" bgColor="gray.800" bgImage="/banner-tile.png">
      <Center h="100%" w="100%">
        <VStack>
          <Avatar size="xl" src={profile?.photoURL} />
          <Heading size="md" color="white" zIndex={0}>
            {profile?.displayName}
          </Heading>
        </VStack>
      </Center>
    </Box>
  )
}

export default Banner
