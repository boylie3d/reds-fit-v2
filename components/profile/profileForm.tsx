import { AccessType, Profile, UserType } from "@/types"
import { Button, Input, useToast } from "@chakra-ui/react"
import { useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useForm } from "react-hook-form"
import fb from "util/firebase"

interface FormProps {
  id: string
  existingProfile?: Profile
}

export default function ProfileForm({ existingProfile, id }: FormProps) {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const toast = useToast()
  const [user, loading, error] = useAuthState(fb.auth)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>()

  const onSubmit = async (form: FormInput) => {
    setSubmitting(true)

    const access = existingProfile
      ? existingProfile.accessType
      : AccessType.Unverified

    const photo: string | undefined = (
      existingProfile
        ? existingProfile.photoURL
        : user
        ? user.photoURL
        : undefined
    )!

    const fullName = `${form.firstName} ${form.lastName}`
    const newProfile: Profile = {
      firstName: form.firstName,
      lastName: form.lastName,
      accessType: access,
      photoURL: photo,
      displayName: fullName,
      email: form.email,
    }

    const resp = await fetch(`/api/profile/${id}`, {
      method: "POST",
      body: JSON.stringify(newProfile),
    })

    // if this is initial profile creation, we should just move straight to the next page
    if (existingProfile) {
      const toast = await showToast()
    } else {
      console.log("move to app")
    }

    setSubmitting(false)
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
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Email" {...register("email")} />
      <Input placeholder="First Name" {...register("firstName")} />
      <Input placeholder="Last Name" {...register("lastName")} />
      <Button type="submit" disabled={submitting}>
        {existingProfile ? "Update Profile" : "Create Profile"}
      </Button>
    </form>
  )
}

type FormInput = {
  email: string
  firstName: string
  lastName: string
  userType: UserType
}
