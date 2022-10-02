import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import {
  Box,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function LoginBox() {
  return (
    <Box borderWidth="2px" borderRadius="lg" h="20em" w="25em" pb="2em">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Login</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Login />
          </TabPanel>
          <TabPanel>
            <SignUp />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  )
}

const Login = () => {
  const [show, setShow] = useState(false)

  const PasswordShow = () => {
    if (show) return <AiOutlineEyeInvisible color="gray" />
    else return <AiOutlineEye color="gray" />
  }

  return (
    <VStack>
      <InputGroup>
        <InputLeftElement>
          <EmailIcon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Email" />
      </InputGroup>
      <InputGroup>
        <InputLeftElement>
          <LockIcon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Password" type={show ? "text" : "password"} />
        <InputRightElement>
          <Box onClick={() => setShow(!show)}>
            <Icon as={PasswordShow} />
          </Box>
        </InputRightElement>
      </InputGroup>
    </VStack>
  )
}

const SignUp = () => {
  return <>sign up</>
}
