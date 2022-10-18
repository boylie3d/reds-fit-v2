import { Profile } from "@/types"
import { Box, Center, Heading, Text, VStack } from "@chakra-ui/react"
import PageHead from "components/layout/head"
import LoadingPane from "components/misc/loading"
import ProfileForm from "components/profile/profileForm"
import { useLocalProfile } from "hooks/profile"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function ProfileCreate() {
  const router = useRouter()
  const { profile, loading, error } = useLocalProfile()

  const formSubmitted = (profile: Profile) => {
    console.log("submitted?")
    router.push("/")
  }

  useEffect(() => {
    if (profile !== undefined) router.push("/profile/update")
  }, [profile])

  if (loading) return <LoadingPane />
  if (profile) return <div />

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
