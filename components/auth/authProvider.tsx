import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "util/firebase"

interface AuthProps {
  children: JSX.Element[] | JSX.Element
}

export default function AuthProvider(props: AuthProps) {
  const [user, userLoading, userError] = useAuthState(firebase.auth)
  const router = useRouter()

  useEffect(() => {
    if (!userLoading && !user) {
      router.push("/login")
    }
  }, [userLoading, user])

  return <div>{props.children}</div>
}
