import { LibraryItem } from "@/types"
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import Card from "components/layout/card"
import { FieldValues } from "react-hook-form"
import { useSWRConfig } from "swr"
import { getYoutubeId, getYoutubeThumb } from "util/common"
import LibraryForm from "./libraryForm"

interface Props {
  item: LibraryItem
}

const AdminLibraryCard = ({ item }: Props) => {
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
    const resp = await fetch(`/api/library/${item.id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    })

    mutate("/api/library")
    onClose()
  }

  return (
    <>
      <Card>
        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(5, 1fr)"
          columnGap={4}
          minH="120px"
        >
          <GridItem rowSpan={3} colSpan={2}>
            <Center h="100%">
              <Image w="100%" src={getYoutubeThumb(item.link)} />
            </Center>
          </GridItem>
          <GridItem rowSpan={1} colSpan={3}>
            <Text noOfLines={1}>{item.title}</Text>
          </GridItem>
          <GridItem rowSpan={1} colSpan={3}>
            <Text color="gray.500" fontSize="xs" noOfLines={2}>
              {item.description}
            </Text>
          </GridItem>
          <GridItem rowSpan={1} colSpan={3}>
            <Box w="100%" h="100%" pos="relative">
              <Button
                onClick={onOpen}
                variant="teamOutline"
                w="100%"
                pos="absolute"
                bottom={0}
              >
                Edit
              </Button>
            </Box>
          </GridItem>
        </Grid>
      </Card>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new library item</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <LibraryForm existing={item} onSubmit={submit} onCancel={onClose} />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AdminLibraryCard
