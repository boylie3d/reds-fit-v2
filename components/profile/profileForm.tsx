import { GoogleUser } from "@/types/googleUser"
import { Button, Input } from "@chakra-ui/react"
import { useForm } from "react-hook-form"

interface FormProps {
  user?: GoogleUser
}

export default function ProfileForm({ user }: FormProps) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>()

  const onSubmit = (form: FormInput) => {
    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input placeholder="Email" {...register("email")} />
      <Input placeholder="First Name" {...register("firstName")} />
      <Input placeholder="Last Name" {...register("lastName")} />
      <Button type="submit">
        {user ? "Update Profile" : "Create Profile"}
      </Button>
    </form>
  )
}

type FormInput = {
  email: string
  firstName: string
  lastName: string
}
