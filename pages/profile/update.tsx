import { Profile } from "@/types"
import { Center, useToast } from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import ProfileForm from "components/profile/profileForm"
import { useRouter } from "next/router"

export default function ProfileUpdate() {
  const toast = useToast()
  const router = useRouter()

  const formSubmitted = async (profile: Profile) => {
    // const toast = await showToast()
    // console.log("done")
    router.push("/profile")
  }

  const showToast = (): Promise<boolean> => {
    return new Promise<boolean>((res, rej) => {
      toast({
        title: "Profile Updated.",
        description: "We've updated your profile for you.",
        status: "success",
        duration: 1000,
        // isClosable: true,
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
