import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/graduate"
import { UseProfile } from "hooks/profile"
import type { AppProps } from "next/app"
import Router from "next/router"
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

  useEffect(() => {
    if (!userLoading && !user) {
      Router.push("/login")
    }
  }, [userLoading, user])

  useEffect(() => {
    if (user && !profileLoading && !profile) {
      console.log("no profile")
    }
    console.log(profile)
  }, [profileLoading, profile])

  if (userLoading) return <div />

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
