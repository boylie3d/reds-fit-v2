import {
  Box,
  Button,
  Center,
  Heading,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react"
import { signOut } from "@firebase/auth"
import fb from "util/firebase"

const UserBlock = () => {
  const logout = () => {
    signOut(fb.auth)
  }

  return (
    <Center h="100vh">
      <VStack gap={4} color="gray.600">
        <Image w="300px" src="/reds-logo.png" />
        <Heading color="teamPrimary">{"Nuh uh."}</Heading>
        <Box w="300px">
          <Text align="center">
            {"You don't have access to this site. Contact your coach for help"}
          </Text>
        </Box>
        <Button onClick={logout}>Return to login</Button>
      </VStack>
    </Center>
  )
}

export default UserBlock
