import { ScoringType, Workout } from "@/types"
import { DeleteIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Spacer,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { useSWRConfig } from "swr"
import { toUntimedDate } from "util/time"

interface WorkoutProps {
  workout?: Workout
  date?: Date
  onSubmitted: (result: Workout | null) => void
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
      const newWorkout: Workout = {
        description: form.description,
        title: form.title,
        scoreType: form.scoreType,
        live: date ? toUntimedDate(date) : toUntimedDate(new Date()),
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

  const del = async () => {
    if (!existing) return
    const resp = await fetch(`/api/workout/${existing.id}`, {
      method: "DELETE",
    })
    const result = await resp.json()

    mutate("/api/workout")
    setSubmitting(false)
    onSubmitted(result)
  }

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack rowGap={2}>
          <Input
            required
            w="100%"
            defaultValue={existing ? existing.title : ""}
            placeholder="Title"
            {...register("title")}
          />
          <Textarea
            required
            defaultValue={existing ? existing.description : ""}
            w="100%"
            placeholder="Description"
            {...register("description")}
          />
          <Select
            required
            defaultValue={existing ? existing.scoreType.valueOf() : undefined}
            {...register("scoreType")}
            size="sm"
            placeholder="Select Type"
            onChange={thing => console.log(thing.target)}
          >
            {Object.values(ScoringType).map((t, i) => (
              <option
                key={t}
                id={Object.keys(ScoringType)[i]}
                value={Object.keys(ScoringType)[i]}
              >
                {t}
              </option>
            ))}
          </Select>
          <Flex gap={5} w="100%">
            <Button
              flex={1}
              bgColor="teamPrimary"
              type="submit"
              variant="outline"
              disabled={submitting}
              color="white"
            >
              {existing ? "Update Workout" : "Create Workout"}
            </Button>
            {existing && (
              <div>
                <Spacer />
                <Button onClick={() => onSubmitted(existing)}>Cancel</Button>
              </div>
            )}
          </Flex>
          {existing && (
            <Box w="100%" pt={4}>
              <Button
                colorScheme="red"
                variant="outline"
                float="right"
                onClick={del}
              >
                <DeleteIcon />
              </Button>
            </Box>
          )}
        </VStack>
      </form>
    </Box>
  )
}
