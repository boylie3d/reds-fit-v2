import { ChakraProvider } from "@chakra-ui/react"
import "@fontsource/graduate"
import "@fontsource/roboto"
import AuthProvider from "components/auth/authProvider"
import type { AppProps } from "next/app"
import { useAuthState } from "react-firebase-hooks/auth"
import "../styles/calendar.css"
import "../styles/globals.css"
import theme from "../theme"
import fb from "../util/firebase"

function MyApp({ Component, pageProps }: AppProps) {
  const [user, userLoading, userError] = useAuthState(fb.auth)
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
