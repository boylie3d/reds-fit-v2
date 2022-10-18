import { AccessType, Profile } from "@/types"
import { useAuthState } from "react-firebase-hooks/auth"
import useSWR from "swr"
import fb from "util/firebase"
import fetcher from "./fetcher"

export function useProfile(id: string) {
  const { data, error } = useSWR<Profile, Error>(`/api/profile/${id}`, fetcher)

  return {
    profile: data,
    loading: !error && !data,
    error: error,
  }
}

export function useLocalProfile() {
  const [user, userLoading, userErr] = useAuthState(fb.auth)

  const { data, error } = useSWR<Profile, Error>(
    `/api/profile/${user ? user.uid : ""}`,
    fetcher,
  )

  return {
    profile: data,
    loading: !error && !data,
    error: error,
  }
}
export function useProfiles() {
  const { data, error } = useSWR<Profile[], Error>(`/api/profile`, fetcher)

  const users = data?.filter(p => p.accessType != AccessType.Blocked)
  return {
    profiles: users,
    loading: !error && !data,
    error: error,
  }
}

export function useAllProfiles() {
  const { data, error } = useSWR<Profile[], Error>(`/api/profile`, fetcher)

  return {
    profiles: data,
    loading: !error && !data,
    error: error,
  }
}
