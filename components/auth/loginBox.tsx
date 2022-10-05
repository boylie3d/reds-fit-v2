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
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"

export default function LoginBox() {
  const signUp = (form: FormInput) => {
    console.log("signing up")
    console.log(form)
  }

  const signIn = (form: FormInput) => {
    console.log("signing in")
    console.log(form)
  }

  return (
    <Box borderWidth="2px" borderRadius="lg" maxW="25em" minW="15em">
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Login</Tab>
          <Tab>Sign Up</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <EmailPassForm submitLabel="Sign In" onSubmit={signIn} />
          </TabPanel>
          <TabPanel>
            <EmailPassForm submitLabel="Sign Up" onSubmit={signUp} />
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

interface FormProps {
  submitLabel: string
  onSubmit: (form: FormInput) => void
}

const EmailPassForm = ({ onSubmit, submitLabel }: FormProps) => {
  const [show, setShow] = useState(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInput>()

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
        <Button type="submit">{submitLabel}</Button>
      </VStack>
    </form>
  )
}
