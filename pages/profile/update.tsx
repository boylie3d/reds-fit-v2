import { Profile } from "@/types"
import { useToast } from "@chakra-ui/react"
import PageHead from "components/layout/head"
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
      <PageHead title="Update Profile" />
      <ProfileForm create={false} onUpdate={formSubmitted} />
    </>
  )
}
