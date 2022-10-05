import { ScoringType, Workout } from "@/types"
import { Button } from "@chakra-ui/react"

export default function RoutineManagement() {
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

  return <Button onClick={post}>Clicky plz</Button>
}
