import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/graduate"
import AuthProvider from "components/auth/authProvider"
import { UseProfile } from "hooks/profile"
import type { AppProps } from "next/app"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import "../styles/globals.css"
import theme from "../theme"
import firebase from "../util/firebase"

function MyApp({ Component, pageProps }: AppProps) {
  const [user, userLoading, userError] = useAuthState(firebase.auth)
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = UseProfile(user ? user.uid : "")

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
