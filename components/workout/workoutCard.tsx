import { LibraryItem, Result, ScoringType, Workout } from "@/types"
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import Card from "components/layout/card"
import LibraryCard from "components/library/libraryCard"
import { useLibrary } from "hooks/library"
import { useLocalProfile } from "hooks/profile"
import { useResults } from "hooks/result"
// import { Router } from "next/router"
import { useEffect, useState } from "react"
import { getFormattedTime } from "util/time"

interface CardProps {
  workout: Workout
}

export default function WorkoutCard({ workout }: CardProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { library: fullLib, loading: lLoading, error: lError } = useLibrary()
  const [filteredLib, setFilteredLib] = useState<LibraryItem[] | undefined>(
    undefined,
  )

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

  useEffect(() => {
    if (!workout || !fullLib) return

    const lib = fullLib?.filter(l => workout.libraryRefs?.includes(l.id!))
    setFilteredLib(lib)
  }, [workout, fullLib])

  if (!allResults || !yourResults) return <div />

  return (
    <>
      <Card>
        <VStack align="left" rowGap={4}>
          <Text fontSize="sm">{workout.title}</Text>
          <Text fontSize="xs">{workout.description}</Text>
          <Flex>
            {workout.libraryRefs ? (
              <Button
                variant="none"
                onClick={() => {
                  if (workout.libraryRefs) onOpen()
                }}
              >
                <Text fontSize="sm">
                  {`Prepare (${workout.libraryRefs.length})`}
                </Text>
              </Button>
            ) : (
              <Text fontSize="sm">Prepare</Text>
            )}
            <Spacer />
            <Text fontSize="sm">
              {allResults ? allResults.length : 0} Result
              {allResults ? allResults.length !== 1 && "s" : "s"}
            </Text>
          </Flex>
          {yourResults && yourResults?.length === 0 ? (
            <Button>Log Your Result</Button>
          ) : (
            <Button variant="teamOutline">
              {buttonProps(workout, yourResults[0])}
            </Button>
          )}
        </VStack>
      </Card>
      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reference Library</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={3}>
              {filteredLib?.map(item => (
                <LibraryCard key={item.id} item={item} />
              ))}
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
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
