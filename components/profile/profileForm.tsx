import { AccessType, Profile, UserType } from "@/types"
import { Avatar, Button, Center, Input, Select, VStack } from "@chakra-ui/react"
import { useLocalProfile } from "hooks/profile"
import { useRouter } from "next/router"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useForm } from "react-hook-form"
import fb from "util/firebase"

interface FormProps {
  onUpdate: (profile: Profile) => void
  create: boolean
}

type ProfilePartial = {
  email: string
  firstName: string
  lastName: string
  userType: UserType
}

export default function ProfileForm({ onUpdate, create }: FormProps) {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [user, uLoading, uErr] = useAuthState(fb.auth)
  const { profile: existingProfile, loading, error } = useLocalProfile()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfilePartial>()

  const onSubmit = async (form: ProfilePartial) => {
    setSubmitting(true)

    const access = existingProfile
      ? existingProfile.accessType
      : AccessType.User

    const photo: string | undefined = (
      existingProfile
        ? existingProfile.photoURL
        : user
        ? user.photoURL
        : undefined
    )!

    const fullName = `${form.firstName} ${form.lastName}`
    const newProfile: Profile = {
      uid: user!.uid,
      firstName: form.firstName,
      lastName: form.lastName,
      accessType: access,
      photoURL: photo,
      displayName: fullName,
      email: form.email,
      userType: form.userType,
    }

    const resp = await fetch(`/api/profile/${user?.uid}`, {
      method: "POST",
      body: JSON.stringify(newProfile),
    })

    const profileResp = (await resp.json()) as Profile

    onUpdate(profileResp)
    setSubmitting(false)
  }

  const getFirstName = () => {
    if (!user) return
    return user.displayName!.split(" ")[0]
  }

  const getLastName = () => {
    if (!user) return
    const split = user.displayName!.split(" ")
    split.splice(0, 1)
    const concat = split.join(" ")
    return concat
  }

  if (!user) return <div />

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Center pb={2}>
        <Avatar size="2xl" src={user.photoURL!} />
      </Center>
      <VStack rowGap={2} w="90vw">
        <Input
          w="100%"
          defaultValue={user.email!}
          disabled={true}
          placeholder="Email"
          {...register("email")}
        />
        <Input
          defaultValue={getFirstName()}
          placeholder="First Name"
          {...register("firstName")}
        />
        <Input
          defaultValue={getLastName()}
          placeholder="Last Name"
          {...register("lastName")}
        />
        <Select
          {...register("userType")}
          defaultValue={
            existingProfile ? existingProfile.userType.valueOf() : "Player"
          }
        >
          {Object.keys(UserType).map(t => (
            <option key={t}>{t}</option>
          ))}
        </Select>
        <Button
          variant="outline"
          colorScheme="green"
          type="submit"
          disabled={submitting}
          w="100%"
        >
          {create ? "Create Profile" : "Update Profile"}
        </Button>
      </VStack>
    </form>
  )
}
