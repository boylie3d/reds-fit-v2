import { Result, ScoringType, Workout } from "@/types"
import { Button, VStack } from "@chakra-ui/react"
import WorkoutList from "components/workout/workoutList"

export default function WorkoutManagement() {
  const post = async () => {
    const workout: Workout = {
      title: "Test Workout",
      description: "Workout like your life depends on it",
      scoreType: ScoringType.Reps,
      live: new Date(),
    }

    const resp = await fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify(workout),
    })
    const posted = (await resp.json()) as Workout
    console.log(posted)
  }

  const postResult = async () => {
    const result: Result = {
      workoutId: "qLx6sB823VUr4jz2ENez",
      userId: "UpKYkVJKXzQww0HiE88q6nD65mP2",
      title: "did it",
      description: "did the shits",
      value: 100,
      created: new Date(),
      updated: new Date(),
    }

    const resp = await fetch("/api/result", {
      method: "POST",
      body: JSON.stringify(result),
    })
    const posted = (await resp.json()) as Result
    console.log(posted)
  }

  return (
    <>
      <VStack>
        <Button onClick={post}>Clicky plz</Button>
        <Button onClick={postResult}>Clicky result</Button>
        <WorkoutList date={new Date()} />
      </VStack>
    </>
  )
}
