import { UseLocalProfile } from "hooks/profile"
import { useRouter } from "next/router"
import { useEffect } from "react"

export default function ProfilePage() {
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = UseLocalProfile()

  const router = useRouter()

  useEffect(() => {
    if (!profile) return

    router.push(`/profile/${profile.uid}`)
  }, [profile])

  return <div />
}
