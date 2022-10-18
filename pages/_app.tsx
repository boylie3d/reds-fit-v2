import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/graduate"
import "@fontsource/roboto"
import AuthProvider from "components/auth/authProvider"
import { useProfile } from "hooks/profile"
import type { AppProps } from "next/app"
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

  //check if user has a profile, if not, bring them to mandatory profile creation
  useEffect(() => {
    if (user && !profileLoading && !profile) {
      console.log("no profile")
    }
  }, [profileLoading, profile])

  if (userLoading) return <div />

  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        <Component {...pageProps} user={user} />
      </AuthProvider>
    </ChakraProvider>
  )
}

export default MyApp
