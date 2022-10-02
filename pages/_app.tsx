import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/graduate"
import type { AppProps } from "next/app"
import Router from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import firebase from "../firebase"
import "../styles/globals.css"
import theme from "../theme"

function MyApp({ Component, pageProps }: AppProps) {
  const [user, loading, error] = useAuthState(firebase.auth)

  useEffect(() => {
    if (!loading && !user) {
      Router.push("/login")
    }
  }, [loading, user])

  if (loading) return <div />

  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
