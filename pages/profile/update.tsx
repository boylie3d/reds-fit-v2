import { Profile } from "@/types"
import { Center, useToast } from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import ProfileForm from "components/profile/profileForm"

export default function ProfileUpdate() {
  const toast = useToast()

  const formSubmitted = (profile: Profile) => {
    showToast()
  }

  const showToast = (): Promise<boolean> => {
    return new Promise<boolean>((res, rej) => {
      toast({
        title: "Profile Updated.",
        description: "We've updated your profile for you.",
        status: "success",
        duration: 3000,
        isClosable: true,
        onCloseComplete: () => res(true),
      })
    })
  }

  return (
    <>
      <AppLayout>
        <Center h="100%">
          <ProfileForm create={false} onUpdate={formSubmitted} />
        </Center>
      </AppLayout>
    </>
  )
}
