import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/graduate"
import "@fontsource/roboto"
import AuthProvider from "components/auth/authProvider"
import { useProfile } from "hooks/profile"
import type { AppProps } from "next/app"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import "../styles/calendar.css"
import "../styles/globals.css"
import theme from "../theme"
import fb from "../util/firebase"

function MyApp({ Component, pageProps }: AppProps) {
  const [user, userLoading, userError] = useAuthState(fb.auth)
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useProfile(user ? user.uid : "")
  const router = useRouter()

  useEffect(() => {
    if (user && !profile && !profileLoading) {
      router.push("/profile/create")
    }
  }, [user, profileLoading, profile])

  if (userLoading || profileLoading) return <div />

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} user={user} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
