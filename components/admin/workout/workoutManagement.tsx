import { Workout } from "@/types"
import {
  Box,
  Button,
  Center,
  Divider,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import CalendarBar from "components/misc/calendarBar"
import { useWorkouts } from "hooks/workout"
import { useState } from "react"
import { toUntimedDate } from "util/time"
import AdminCard from "./adminCard"
import WorkoutForm from "./workoutForm"

export default function WorkoutManagement() {
  const [calDate, setCalDate] = useState<Date>(new Date())
  const [modalOpen, setModalOpen] = useState<boolean>(false)
  const { workouts, loading, error } = useWorkouts({
    live: toUntimedDate(calDate),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const workoutFormSubmitted = (workout: Workout | null) => {
    onClose()
  }

  return (
    <>
      <VStack>
        <CalendarBar
          date={calDate}
          onChanged={newDate => setCalDate(new Date(newDate))}
        />
        <Box p="10px" />
        <Button w="100%" bgColor="teamPrimary" color="white" onClick={onOpen}>
          Create New
        </Button>
        <Box p="10px" />
        {workouts && workouts.length > 0 ? (
          <WorkoutList workouts={workouts} />
        ) : (
          <NoWorkouts />
        )}
      </VStack>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WorkoutForm onSubmitted={workoutFormSubmitted} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

const NoWorkouts = () => {
  return (
    <Center h="100%">
      <VStack color="gray.400">
        <Text fontSize="4xl">{":("}</Text>
        <Box w="200px">
          <Text justifyContent="center" align="center">
            {"No workouts assigned for today - create on up top!"}
          </Text>
        </Box>
      </VStack>
    </Center>
  )
}

interface WorkoutProps {
  workouts: Workout[]
}

const WorkoutList = ({ workouts }: WorkoutProps) => {
  return (
    <>
      <Heading size="sm">Current Workouts</Heading>
      <Divider />
      {workouts.map(workout => (
        <AdminCard workout={workout} key={workout.id}></AdminCard>
      ))}
    </>
  )
}
