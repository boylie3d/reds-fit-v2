import {
  Button,
  Center,
  Divider,
  Flex,
  Heading,
  Icon,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import { signInWithRedirect } from "@firebase/auth"
import LoginBox from "components/auth/loginBox"
import LoadingPane from "components/misc/loading"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { FcGoogle } from "react-icons/fc"
import fb from "../util/firebase"

export default function LoginPage() {
  const [user, loading, error] = useAuthState(fb.auth)
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push("/")
    }
  }, [loading, user])

  if (loading) return <LoadingPane />
  if (user) return <div />

  const ssoSignIn = () => signInWithRedirect(fb.auth, fb.provider)

  return (
    <>
      <Center>
        <VStack>
          <Image src="reds-logo.png" pt="2em" pr="2em" pl="2em" maxW="25em" />
          <Heading size="3xl">REDS FIT</Heading>
          <LoginBox />
          <Flex p="1em" align="center">
            <Divider orientation="horizontal" />
            <Text padding="2">OR</Text>
            <Divider orientation="horizontal" />
          </Flex>
          <Button onClick={ssoSignIn}>
            <Icon h={6} w={6} as={FcGoogle} mr="0.5em" />
            Log In With Google
          </Button>
        </VStack>
      </Center>
    </>
  )
}
