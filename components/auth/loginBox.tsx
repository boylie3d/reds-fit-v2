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
  Text,
  VStack,
} from "@chakra-ui/react"
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "@firebase/auth"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useForm } from "react-hook-form"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import fb from "util/firebase"

export default function LoginBox() {
  const [user, loading, error] = useAuthState(fb.auth)
  const router = useRouter()
  const [signUpErr, setSignUpErr] = useState<string | undefined>(undefined)
  const [signInErr, setSignInErr] = useState<string | undefined>(undefined)

  useEffect(() => {
    if (!loading && user) {
      router.push("/")
    }
  }, [loading, user])

  const signUp = async (form: FormInput) => {
    setSignUpErr(undefined)

    if (form.email === "") {
      setSignUpErr("Email address required")
      return
    }
    if (form.pass === "") {
      setSignUpErr("Password required")
      return
    }

    createUserWithEmailAndPassword(fb.auth, form.email, form.pass).catch(
      (e: any) => {
        setSignUpErr(e.message)
      },
    )
  }

  const signIn = async (form: FormInput) => {
    setSignInErr(undefined)

    if (form.email === "") {
      setSignInErr("Email address required")
      return
    }
    if (form.pass === "") {
      setSignInErr("Password required")
      return
    }

    signInWithEmailAndPassword(fb.auth, form.email, form.pass).catch(
      (e: any) => {
        setSignInErr(e.message)
      },
    )
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
            <EmailPassForm
              errorMsg={signInErr}
              submitLabel="Sign In"
              onSubmit={signIn}
            />
          </TabPanel>
          <TabPanel>
            <EmailPassForm
              errorMsg={signUpErr}
              submitLabel="Sign Up"
              onSubmit={signUp}
            />
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
  errorMsg: string | undefined
}

const EmailPassForm = ({ onSubmit, submitLabel, errorMsg }: FormProps) => {
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
          <Input
            required
            type="email"
            placeholder="Email"
            {...register("email")}
          />
        </InputGroup>
        <InputGroup>
          <InputLeftElement>
            <LockIcon color="gray.300" />
          </InputLeftElement>
          <Input
            required
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
        <Text color="teamPrimary" fontSize="sm">
          {errorMsg}
        </Text>
        <Button type="submit">{submitLabel}</Button>
      </VStack>
    </form>
  )
}
