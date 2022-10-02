import { Button, Center, Image, VStack } from "@chakra-ui/react"

export default function Login() {
  return (
    <>
      <Center>
        <VStack>
          <Image src="reds-logo.png" p="2em" />
          <Button>Log In With Google</Button>
        </VStack>
      </Center>
    </>
  )
}
