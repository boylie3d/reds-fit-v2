import { EmailIcon, LockIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
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
import { SubmitHandler, useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function LoginBox() {
  return (
    <Box borderWidth="2px" borderRadius="lg" h="18em" w="25em" pb="2em">
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

type FormInput = {
  email: string
  pass: string
}

const Login = () => {
  const [show, setShow] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>()

  const onSubmit: SubmitHandler<FormInput> = data => console.log(data)

  const PasswordShow = () => {
    if (show) return <AiOutlineEyeInvisible color="gray" />
    else return <AiOutlineEye color="gray" />
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <VStack spacing="1em">
        <InputGroup>
          <InputLeftElement>
            <EmailIcon color="gray.300" />
          </InputLeftElement>
          <Input placeholder="Email" {...register("email")} />
        </InputGroup>
        <InputGroup>
          <InputLeftElement>
            <LockIcon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder="Password"
            type={show ? "text" : "password"}
            {...register("pass")}
          />
          <InputRightElement>
            <Box onClick={() => setShow(!show)}>
              <Icon as={PasswordShow} />
            </Box>
          </InputRightElement>
        </InputGroup>
        <Button type="submit">Sign in</Button>
      </VStack>
    </form>
  )
}

const SignUp = () => {
  return (
    <VStack spacing="1em">
      <InputGroup>
        <InputLeftElement>
          <EmailIcon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Email" />
      </InputGroup>
    </VStack>
  )
}
