import { Profile } from "@/types"
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react"
import PageHead from "components/layout/head"
import ProfileForm from "components/profile/profileForm"
import { useRouter } from "next/router"

export default function ProfileCreate() {
  const router = useRouter()

  const formSubmitted = (profile: Profile) => {
    router.push("/")
  }

  return (
    <Box padding="20px" pt="40px">
      <PageHead title="Create Profile" />
      <Center h="100%">
        <VStack gap={5}>
          <Center>
            <VStack>
              <Heading color="teamPrimary">Almost There...</Heading>
              <Text>Make sure the information below is correct</Text>
            </VStack>
          </Center>
          <ProfileForm create={true} onUpdate={formSubmitted} />
        </VStack>
      </Center>
    </Box>
  )
}
