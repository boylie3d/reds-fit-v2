import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  VStack,
} from "@chakra-ui/react"

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
  return (
    <VStack>
      <InputGroup>
        <InputLeftElement children={<EmailIcon color="gray.300" />} />
        <Input placeholder="Email" />
      </InputGroup>
      <InputGroup>
        <InputLeftElement children={<LockIcon color="gray.300" />} />
        <Input placeholder="Password" />
      </InputGroup>
    </VStack>
  )
}

const SignUp = () => {
  return <>sign up</>
}
