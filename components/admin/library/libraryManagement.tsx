import { LibraryItem } from "@/types"
import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import FilteredLibraryList from "components/library/filteredLibraryList"
import LoadingPane from "components/misc/loading"
import { useLibrary } from "hooks/library"
import { FieldValues } from "react-hook-form"
import { useSWRConfig } from "swr"
import { getYoutubeId } from "util/common"
import LibraryForm from "./libraryForm"

const LibraryManagement = () => {
  const { library, loading, error } = useLibrary()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutate } = useSWRConfig()

  const submit = async (form: FieldValues) => {
    const now = new Date()
    const data: LibraryItem = {
      created: now,
      updated: now,
      link: getYoutubeId(form.url),
      title: form.title,
      description: form.message,
    }
    const resp = await fetch("/api/library", {
      method: "POST",
      body: JSON.stringify(data),
    })

    mutate("/api/library")
    onClose()
  }

  if (loading) return <LoadingPane />

  return (
    <>
      <VStack gap={2}>
        <Heading size="xs">Library</Heading>
        <Button onClick={onOpen} w="100%">
          Create New
        </Button>
        <>{library && <FilteredLibraryList library={library} admin={true} />}</>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new library item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <LibraryForm onSubmit={submit} onCancel={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default LibraryManagement
