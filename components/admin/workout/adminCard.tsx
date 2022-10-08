import { Workout } from "@/types"
import {
  Box,
  Button,
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
import WorkoutForm from "./workoutForm"

interface WorkoutProps {
  workout: Workout
}

export default function AdminCard({ workout }: WorkoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const updateComplete = (result: Workout | null) => {
    onClose()
  }

  return (
    <Box boxShadow="md" w="100%" p="20px" borderRadius="md" borderWidth="1px">
      <VStack align="left" rowGap={4}>
        <Text fontSize="sm">{workout.title}</Text>
        <Text fontSize="xs">{workout.description}</Text>
        <Button onClick={onOpen} bgColor="teamPrimary" color="white">
          Edit
        </Button>
      </VStack>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WorkoutForm onSubmitted={updateComplete} workout={workout} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

const EditWorkout = ({ workout }: WorkoutProps) => {
  return <div>sup family</div>
}
