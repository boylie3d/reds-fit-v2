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
  onDelete?: () => void
  onComplete?: (workout: Workout) => void
}

export default function AdminCard({
  workout,
  onComplete,
  onDelete,
}: WorkoutProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Box boxShadow="md" w="100%" p="20px" borderRadius="md" borderWidth="1px">
      <VStack align="left" rowGap={4}>
        <Text fontSize="sm">{workout.title}</Text>
        <Text fontSize="xs" style={{ whiteSpace: "pre-wrap" }}>
          {workout.description}
        </Text>
        <Button onClick={onOpen} variant="teamOutline">
          Edit
        </Button>
      </VStack>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <WorkoutForm
              onDelete={() => {
                if (onDelete) onDelete()
                onClose()
              }}
              onSubmitted={result => {
                if (onComplete) onComplete(result)
                onClose()
              }}
              onCancel={onClose}
              workout={workout}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}
