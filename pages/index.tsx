import { Announcement } from "@/types"
import {
  Box,
  Center,
  Divider,
  Heading,
  HStack,
  Icon,
  Text,
  VStack,
} from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import Card from "components/layout/card"
import CalendarBar from "components/misc/calendarBar"
import LoadingPane from "components/misc/loading"
import WorkoutCard from "components/workout/workoutCard"
import { useAnnouncements } from "hooks/announcement"
import { useWorkouts } from "hooks/workout"
import { useEffect, useState } from "react"
import { BsFillMegaphoneFill } from "react-icons/bs"
import { useSWRConfig } from "swr"
import { toUntimedDate } from "util/time"

export default function Home() {
  const [calDate, setCalDate] = useState<Date>(new Date())
  const { workouts, loading, error } = useWorkouts({
    live: toUntimedDate(calDate),
  })
  const { mutate } = useSWRConfig()

  useEffect(() => {
    fetch("/api/fistbump")
  }, [])

  return (
    <AppLayout>
      <VStack>
        <CalendarBar date={calDate} onChanged={setCalDate} />
        <AnnouncementsBar date={calDate} />
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

interface AnnouncementProps {
  date: Date
}

const AnnouncementsBar = ({ date }: AnnouncementProps) => {
  const { announcements, loading, error } = useAnnouncements({
    live: toUntimedDate(date),
  })
  const [currAnnouncement, setCurrAnnouncement] = useState<
    Announcement | undefined
  >(undefined)

  useEffect(() => {
    if (announcements && announcements.length > 0) {
      setCurrAnnouncement(announcements[0])
    } else {
      setCurrAnnouncement(undefined)
    }
  }, [announcements])

  if (loading) return <LoadingPane />

  if (!announcements || announcements.length === 0) return <div />

  return (
    <Card>
      <Center pb={3}>
        <HStack gap={2}>
          <Icon color="teamPrimary" as={BsFillMegaphoneFill} />
          <Heading size="xs">{"Today's Announcement:"}</Heading>
          <Icon color="teamPrimary" as={BsFillMegaphoneFill} />
        </HStack>
      </Center>
      <VStack align="left" gap={2}>
        {announcements.map(a => (
          <Text key={a.id} fontSize="xs" style={{ whiteSpace: "pre-wrap" }}>
            {a.message}
          </Text>
        ))}
      </VStack>
    </Card>
  )
}

const NoWorkouts = () => {
  return (
    <Center h="100%">
      <VStack color="gray.400">
        <Text fontSize="4xl">{":("}</Text>
        <Box w="250px">
          <Text justifyContent="center" align="center">
            {"No workouts assigned for today, why not make one of your own?"}
          </Text>
        </Box>
      </VStack>
    </Center>
  )
}
