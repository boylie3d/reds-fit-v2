import { Result, ScoringType, Workout } from "@/types"
import { Box, Button, Flex, Spacer, Text, VStack } from "@chakra-ui/react"
import { useLocalProfile } from "hooks/profile"
import { useResults } from "hooks/result"
import Router from "next/router"
// import { Router } from "next/router"
import { getFormattedTime } from "util/time"

interface CardProps {
  workout: Workout
}

export default function WorkoutCard({ workout }: CardProps) {
  const {
    profile,
    loading: profileLoading,
    error: profileErr,
  } = useLocalProfile()

  const {
    results: allResults,
    loading: allLoading,
    error: allErr,
  } = useResults({
    workoutId: workout.id,
  })

  const {
    results: yourResults,
    loading: yourLoading,
    error: yourErr,
  } = useResults({
    workoutId: workout.id,
    userId: profile?.uid,
  })

  if (!allResults || !yourResults) return <div />

  return (
    <Box boxShadow="md" w="100%" p="20px" borderRadius="md" borderWidth="1px">
      <VStack align="left" rowGap={4}>
        <Text fontSize="sm">{workout.title}</Text>
        <Text fontSize="xs">{workout.description}</Text>
        <Flex>
          <Text fontSize="sm">Prepare</Text>
          <Spacer />
          <Text fontSize="sm">
            {allResults ? allResults.length : 0} Result
            {allResults ? allResults.length !== 1 && "s" : "s"}
          </Text>
        </Flex>
        {yourResults && yourResults?.length === 0 ? (
          <Button
            onClick={() =>
              Router.push({
                pathname: "/result",
                query: { workoutId: workout.id },
              })
            }
          >
            Log Your Result
          </Button>
        ) : (
          <Button variant="teamOutline">
            {buttonProps(workout, yourResults[0])}
          </Button>
        )}
      </VStack>
    </Box>
  )
}

// interface ModalProps {
//   isOpen: boolean
//   // onOpen: () => void
//   // onClose: () => void
//   onSubmit: (form: any) => void
//   onCancel: () => void
// }

// const WorkoutModal = ({
//   isOpen: openTrigger,
//   // onOpen: setOpen,
//   // onClose,
//   onSubmit,
//   onCancel,
// }: ModalProps) => {
//   const initialRef = useRef(null)
//   const { isOpen, onOpen, onClose } = useDisclosure()

//   useEffect(() => {
//     console.log(openTrigger)
//     if (openTrigger) onOpen()
//     else onClose()
//   }, [openTrigger])

//   return (
//     <Modal isOpen={isOpen} onClose={onClose}>
//       <ModalOverlay />
//       <ModalContent>
//         <ModalHeader>Modal Title</ModalHeader>
//         <ModalCloseButton />
//         <ModalBody>hi</ModalBody>

//         <ModalFooter>
//           <Button colorScheme="blue" mr={3} onClick={onClose}>
//             Close
//           </Button>
//           <Button variant="ghost">Secondary Action</Button>
//         </ModalFooter>
//       </ModalContent>
//     </Modal>
//   )
// }

const buttonProps = (workout: Workout, result: Result) => {
  switch (workout.scoreType) {
    case ScoringType.Reps:
      return <>what up fam</>
    case ScoringType.Time:
      return <>{getFormattedTime(result.value)}</>
    default:
      return <>Type not implemented</>
  }
}
