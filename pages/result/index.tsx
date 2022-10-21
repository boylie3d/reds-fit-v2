import { Result } from "@/types"
import { Button, Input, Textarea, VStack } from "@chakra-ui/react"
import LoadingPane from "components/misc/loading"
import { useLocalProfile } from "hooks/profile"
import { useWorkout } from "hooks/workout"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { useForm } from "react-hook-form"

type ResultForm = {
  // title: string
  description: string
  value: any
}

const Index: NextPage = () => {
  const router = useRouter()
  const { workoutId } = router.query
  const {
    workout,
    loading: wLoading,
    error: wError,
  } = useWorkout(workoutId as string)

  const { profile, loading: pLoading, error: pError } = useLocalProfile()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResultForm>()

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
    console.log(json)
  }

  if (wLoading || pLoading) return <LoadingPane />

  return (
    <>
      <form onSubmit={handleSubmit(submit)}>
        <VStack gap={3}>
          <Input w="100%" placeholder="Your time" {...register("value")} />
          <Textarea w="100%" placeholder="Notes" {...register("description")} />
          <Button type="submit" w="100%">
            hi
          </Button>
        </VStack>
      </form>
    </>
  )
}

export default Index
