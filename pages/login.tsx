import {
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import LoginBox from "../components/loginBox"

export default function Login() {
  return (
    <>
      <Center>
        <VStack>
          <Image src="reds-logo.png" p="2em" />
          <LoginBox />
          <Flex align="center">
            <Divider orientation="horizontal" />
            <Text padding="2">OR</Text>
            <Divider orientation="horizontal" />
          </Flex>
          <Button>Log In With Google</Button>
        </VStack>
      </Center>
    </>
  )
}
