import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import fb from "util/firebase"

interface AuthProps {
  children: JSX.Element[] | JSX.Element
}

export default function AuthProvider(props: AuthProps) {
  const [user, userLoading, userError] = useAuthState(fb.auth)
  const router = useRouter()

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login")
    }
  }, [userLoading, user])

  if (userLoading) return <div />
  return <div>{props.children}</div>
}
