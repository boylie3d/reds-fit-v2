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
import { FcGoogle } from "react-icons/fc"
import LoginBox from "../components/loginBox"

export default function Login() {
  return (
    <>
      <Center>
        <VStack>
          <Image src="reds-logo.png" pt="2em" pr="2em" pl="2em" />
          <Heading size="4xl">REDS FIT</Heading>
          <LoginBox />
          <Flex p="1em" align="center">
            <Divider orientation="horizontal" />
            <Text padding="2">OR</Text>
            <Divider orientation="horizontal" />
          </Flex>
          <Button>
            <Icon h={6} w={6} as={FcGoogle} mr="0.5em" />
            Log In With Google
          </Button>
        </VStack>
      </Center>
    </>
  )
}
