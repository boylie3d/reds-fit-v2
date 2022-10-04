import { Box } from "@chakra-ui/react"
import { User } from "@firebase/auth"
import ProfileForm from "components/profile/profileForm"

interface ProfileProps {
  user: User
}
export default function ProfileUpdate({ user }: ProfileProps) {
  //TODO: Remove
  const tmpGoogleId = "UpKYkVJKXzQww0HiE88q6nD65mP2"

  return (
    <Box>
      <ProfileForm id={user.uid} />
    </Box>
  )
}
