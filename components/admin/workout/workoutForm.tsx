import { ScoringType, Workout } from "@/types"
import {
  Box,
  Button,
  Input,
  Select,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSWRConfig } from "swr"

interface WorkoutProps {
  workout?: Workout
  date?: Date
  onSubmitted: (workout: Workout) => void
}

type WorkoutPartial = {
  title: string
  description: string
  scoreType: ScoringType
  libraryRefs?: string[]
}

export default function WorkoutForm({
  workout: existing,
  date,
  onSubmitted,
}: WorkoutProps) {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | undefined>(
    existing,
  )
  const [submitting, setSubmitting] = useState<boolean>(false)
  const { mutate } = useSWRConfig()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WorkoutPartial>()

  const onSubmit = async (form: WorkoutPartial) => {
    if (submitting) return

    setSubmitting(true)

    if (currentWorkout) {
      const updatedWorkout = currentWorkout
      updatedWorkout.description = form.description
      updatedWorkout.title = form.title
      updatedWorkout.scoreType = form.scoreType

      const workout = await update(updatedWorkout)
      setCurrentWorkout(workout)
      onSubmitted(workout)
    } else {
      if (!form) console.log("wtactualf")
      const newWorkout: Workout = {
        description: form.description,
        title: form.title,
        scoreType: form.scoreType,
        live: date ? date : new Date(),
      }

      const workout = await create(newWorkout)
      setCurrentWorkout(workout)
      onSubmitted(workout)
    }

    mutate("/api/workout")
    setSubmitting(false)
  }

  const create = async (workout: Workout) => {
    const resp = await fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify(workout),
    })

    const result = (await resp.json()) as Workout
    setCurrentWorkout(result)
    return result
  }

  const update = async (workout: Workout) => {
    const resp = await fetch(`/api/workout/${workout.id}`, {
      method: "PUT",
      body: JSON.stringify(workout),
    })

    const result = (await resp.json()) as Workout
    return result
  }

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack rowGap={2}>
          <Input required w="100%" placeholder="Title" {...register("title")} />
          <Textarea
            required
            w="100%"
            placeholder="Description"
            {...register("description")}
          />
          <Select
            required
            {...register("scoreType")}
            size="sm"
            placeholder="Select Type"
          >
            {Object.values(ScoringType).map(t => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          <Button
            bgColor="teamPrimary"
            type="submit"
            w="100%"
            variant="outline"
            disabled={submitting}
          >
            <Text color="white">
              {existing ? "Update Workout" : "Create Workout"}
            </Text>
          </Button>
        </VStack>
      </form>
    </Box>
  )
}
