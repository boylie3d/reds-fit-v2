import { Result, Workout } from "@/types"
import { Button, Input, Textarea, VStack } from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import LoadingPane from "components/misc/loading"
import ResultForm from "components/result/resultForm"
import { useLocalProfile } from "hooks/profile"
import { GetServerSideProps, NextPage } from "next"
import Router from "next/router"
import { get } from "pages/api/workout/[id]"
import { useForm } from "react-hook-form"

type ResultForm = {
  // title: string
  description: string
  value: any
}

interface Props {
  workout: Workout
}

const Index: NextPage<Props> = ({ workout }: Props) => {
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
      <OtherForm onSubmit={submit} />
    </AppLayout>
  )
}

interface FormProps {
  onSubmit: (form: ResultForm) => void
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
        <Input required w="100%" placeholder="Result" {...register("value")} />
        <Textarea w="100%" placeholder="Notes" {...register("description")} />
        <Button type="submit" w="100%">
          Submit
        </Button>
      </VStack>
    </form>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const { workoutId } = ctx.query
  const workout = await get(workoutId as string)

  return {
    props: {
      workout: workout,
    },
  }
}

export default Index
