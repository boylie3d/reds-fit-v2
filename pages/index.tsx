import { Box, Center, Divider, Heading, Text, VStack } from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import Card from "components/layout/card"
import CalendarBar from "components/misc/calendarBar"
import WorkoutCard from "components/workout/workoutCard"
import { useWorkouts } from "hooks/workout"
import { useState } from "react"
import { useSWRConfig } from "swr"
import { toUntimedDate } from "util/time"

export default function Home() {
  const [calDate, setCalDate] = useState<Date>(new Date())
  const { workouts, loading, error } = useWorkouts({
    live: toUntimedDate(calDate),
  })
  const { mutate } = useSWRConfig()

  return (
    <AppLayout>
      <VStack>
        <CalendarBar date={calDate} onChanged={setCalDate} />
        <AnnouncementsBar />
        {workouts && workouts.length > 0 ? (
          <Box w="100%">
            <Heading size="sm">Current Workouts</Heading>
            <Divider />
            {workouts.map(workout => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
          </Box>
        ) : (
          <NoWorkouts />
        )}
      </VStack>
    </AppLayout>
  )
}

const AnnouncementsBar = () => {
  return <Card />
}

const NoWorkouts = () => {
  return (
    <Center h="100%">
      <VStack color="gray.400">
        <Text fontSize="4xl">{":("}</Text>
        <Box w="200px">
          <Text justifyContent="center" align="center">
            {"No workouts assigned for today - create one up top!"}
          </Text>
        </Box>
      </VStack>
    </Center>
  )
}
