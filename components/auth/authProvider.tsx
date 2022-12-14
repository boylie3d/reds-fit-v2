import { AccessType } from "@/types"
import { useLocalProfile } from "hooks/profile"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import fb from "util/firebase"
import UserBlock from "./userBlock"

interface AuthProps {
  children: JSX.Element[] | JSX.Element
}

export default function AuthProvider(props: AuthProps) {
  const [user, userLoading, userError] = useAuthState(fb.auth)
  const router = useRouter()
  const { profile, loading, error } = useLocalProfile()

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login")
    }
  }, [userLoading, user])

  useEffect(() => {
    if (!profile && !loading) {
      router.push("/profile/create")
    }
  }, [loading, profile])

  if (userLoading || loading) return <div />

  if (profile?.accessType === AccessType.Blocked) {
    return <UserBlock />
  }

  return <div>{props.children}</div>
}
