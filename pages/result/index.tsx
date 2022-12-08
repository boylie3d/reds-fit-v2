import { Result, Workout } from "@/types"
import {
  Box,
  Button,
  Center,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import LoadingPane from "components/misc/loading"
import ResultForm from "components/result/resultForm"
import { useLocalProfile } from "hooks/profile"
import { GetServerSideProps, NextPage } from "next"
import Router from "next/router"
import { get } from "pages/api/result/[id]"
import { get as getWorkout } from "pages/api/workout/[id]"
import { useForm } from "react-hook-form"

type ResultForm = {
  // title: string
  description: string
  value: any
}

interface Props {
  workout: Workout
  result?: Result
}

const Index: NextPage<Props> = ({ workout, result }: Props) => {
  console.log(result)
  // const router = useRouter()
  // const { workoutId } = router.query
  // const {
  //   workout,
  //   loading: wLoading,
  //   error: wError,
  // } = useWorkout(workoutId as string)

  // console.log({ workout })
  const { profile, loading: pLoading, error: pError } = useLocalProfile()

  const submit = async (form: ResultForm) => {
    //TODO:if(result) PUT /api/result/result.id body=result

    if (!workout || !profile) return

    const now = new Date()

    const result: Result = {
      workoutId: workout.id!,
      userId: profile.uid!,
      value: form.value,
      description: form.description,
      created: now,
      updated: now,
    }

    const resp = await fetch("/api/result", {
      method: "POST",
      body: JSON.stringify(result),
    })
    const json = (await resp.json()) as Result
    // Router.push(`/result/${json.id}`)
    Router.push(`/`)
  }

  if (pLoading) return <LoadingPane />

  return (
    <AppLayout>
      <Box p="2em">
        <Center>
          <Text fontSize="lg">{workout.title}</Text>
        </Center>
        <Text fontSize="sm">{workout.description}</Text>
      </Box>
      <OtherForm onSubmit={submit} existing={result} />
    </AppLayout>
  )
}

interface FormProps {
  onSubmit: (form: ResultForm) => void
  existing?: Result
}

const OtherForm = (props: FormProps) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResultForm>()

  return (
    <form onSubmit={handleSubmit(props.onSubmit)}>
      <VStack gap={3}>
        <Input
          required
          defaultValue={props.existing?.value}
          w="100%"
          placeholder="Result"
          {...register("value")}
        />
        <Textarea
          defaultValue={props.existing?.description}
          w="100%"
          placeholder="Notes"
          {...register("description")}
        />
        <Button type="submit" w="100%">
          Submit
        </Button>
      </VStack>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { workoutId, existing } = ctx.query
  const workout = await getWorkout(workoutId as string)
  // let result: Result | undefined = undefined

  let response: any = {
    workout: workout,
  }
  if (existing) {
    const result = await get(existing as string)
    response.result = result
  }
  return {
    props: response,
  }
}

export default Index
