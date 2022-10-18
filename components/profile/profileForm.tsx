import { AccessType, Profile, UserType } from "@/types"
import {
  Avatar,
  AvatarBadge,
  Box,
  Button,
  Center,
  Icon,
  Input,
  Select,
  VStack,
} from "@chakra-ui/react"
import { ref, uploadBytes } from "@firebase/storage"
import { useLocalProfile } from "hooks/profile"
import { useState } from "react"
import Dropzone from "react-dropzone"
import { useAuthState } from "react-firebase-hooks/auth"
import { useForm } from "react-hook-form"
import { AiOutlineCamera } from "react-icons/ai"
import fb from "util/firebase"

interface FormProps {
  onUpdate: (profile: Profile) => void
  create: boolean
}

type ProfilePartial = {
  email: string
  firstName: string
  lastName: string
  userType: UserType
}

export default function ProfileForm({ onUpdate, create }: FormProps) {
  const [submitting, setSubmitting] = useState<boolean>(false)
  const [user, uLoading, uErr] = useAuthState(fb.auth)
  const { profile: existingProfile, loading, error } = useLocalProfile()

  const [file, setFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProfilePartial>()

  const onSubmit = async (form: ProfilePartial) => {
    setSubmitting(true)

    let photo: string | undefined = (
      existingProfile
        ? existingProfile.photoURL
        : user
        ? user.photoURL
        : undefined
    )!

    if (file) {
      const image = await uploadImage()
      console.log(image)
      photo = image
    }

    const access = existingProfile
      ? existingProfile.accessType
      : AccessType.User

    const fullName = `${form.firstName} ${form.lastName}`
    const email = user ? user.email : ""

    const newProfile: Profile = {
      uid: user!.uid,
      firstName: form.firstName,
      lastName: form.lastName,
      accessType: access,
      photoURL: photo,
      displayName: fullName,
      email: email!,
      userType: form.userType,
    }

    const resp = await fetch(`/api/profile/${user?.uid}`, {
      method: "POST",
      body: JSON.stringify(newProfile),
    })

    const profileResp = (await resp.json()) as Profile

    onUpdate(profileResp)
    setSubmitting(false)
  }

  const uploadImage = async () => {
    const id = user!.uid
    const name = file!.name

    const uploadRef = ref(fb.storage, `${id}/${name}`)
    const upload = await uploadBytes(uploadRef, file!)
    const photoUrl = `https://firebasestorage.googleapis.com/v0/b/reds-fit-v2.appspot.com/o/${id}%2F${name}?alt=media`
    return photoUrl
  }

  const getFirstName = () => {
    if (existingProfile) {
      return existingProfile.firstName
    }
    if (user && user.displayName) {
      return user.displayName!.split(" ")[0]
    }
    return ""
  }

  const getLastName = () => {
    if (existingProfile) {
      return existingProfile.lastName
    }
    if (user && user.displayName) {
      const split = user.displayName!.split(" ")
      split.splice(0, 1)
      const concat = split.join(" ")
      return concat
    }
    return ""
  }

  const getPhoto = () => {
    if (file) return URL.createObjectURL(file)
    else if (existingProfile) return existingProfile.photoURL
    else if (user) return user.photoURL ? user.photoURL : ""
    return ""
  }

  if (!user) return <div />

  return (
    <>
      {/* <Center> */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Center pb={4}>
          <Box cursor="pointer" pos="relative">
            <Dropzone onDrop={acceptedFiles => setFile(acceptedFiles[0])}>
              {({ getRootProps, getInputProps }) => (
                <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Avatar size="2xl" src={getPhoto()}>
                    <AvatarBadge
                      bg="gray.200"
                      borderWidth="3px"
                      borderColor="white"
                      h="40px"
                      w="40px"
                    >
                      <Icon w={7} h={7} as={AiOutlineCamera} />
                    </AvatarBadge>
                  </Avatar>
                </div>
              )}
            </Dropzone>
          </Box>
        </Center>
        <VStack rowGap={2} w="90vw" maxW="800px">
          <Input
            w="100%"
            defaultValue={user.email!}
            disabled={true}
            placeholder="Email"
            {...register("email")}
          />
          <Input
            defaultValue={getFirstName()}
            placeholder="First Name"
            required
            {...register("firstName")}
          />
          <Input
            defaultValue={getLastName()}
            placeholder="Last Name"
            required
            {...register("lastName")}
          />
          <Select
            {...register("userType")}
            defaultValue={
              existingProfile ? existingProfile.userType.valueOf() : "Player"
            }
          >
            {Object.keys(UserType).map(t => (
              <option key={t}>{t}</option>
            ))}
          </Select>
          <Button
            variant="outline"
            colorScheme="green"
            type="submit"
            disabled={submitting}
            w="100%"
          >
            {create ? "Create Profile" : "Update Profile"}
          </Button>
        </VStack>
      </form>
      {/* </Center> */}
    </>
  )
}
