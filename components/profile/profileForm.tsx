import { AccessType, Profile, UserType } from "@/types"
import { Button, Input } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

interface FormProps {
  id: string
  existingProfile?: Profile
}

export default function ProfileForm({ existingProfile, id }: FormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>()

  const onSubmit = (form: FormInput) => {
    const access = existingProfile
      ? existingProfile.accessType
      : AccessType.Unverified

    const fullName = `${form.firstName} ${form.lastName}`
    const newProfile: Profile = {
      firstName: form.firstName,
      lastName: form.lastName,
      accessType: access,
      displayName: fullName,
      email: form.email,
    }

    console.log(newProfile)

    fetch(`/api/profile/${id}`, {
      method: "POST",
      body: JSON.stringify(newProfile),
    })
    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Email" {...register("email")} />
      <Input placeholder="First Name" {...register("firstName")} />
      <Input placeholder="Last Name" {...register("lastName")} />
      <Button type="submit">
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
