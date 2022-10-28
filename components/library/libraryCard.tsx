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
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import Card from "components/layout/card"
import YoutubeEmbed from "components/misc/youtubeEmbed"

interface Props {
  item: LibraryItem
}

const LibraryCard = ({ item }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <Card>
      <Box cursor="pointer" w="100%" onClick={onOpen}>
        <Grid
          templateRows="repeat(3, 1fr)"
          templateColumns="repeat(5, 1fr)"
          columnGap={4}
          minH="120px"
        >
          <GridItem rowSpan={3} colSpan={2}>
            <Center h="100%">
              <Image
                w="100%"
                src={`https://img.youtube.com/vi/${item.link}/hqdefault.jpg`}
              />
            </Center>
          </GridItem>
          <GridItem rowSpan={1} colSpan={3}>
            <Text noOfLines={1}>{item.title}</Text>
          </GridItem>
          <GridItem rowSpan={3} colSpan={3}>
            <Text color="gray.500" fontSize="xs" noOfLines={2}>
              {item.description}
            </Text>
          </GridItem>
        </Grid>
      </Box>

      <Modal onClose={onClose} isOpen={isOpen}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{item.title}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={3}>
              <Box w="100%">
                <YoutubeEmbed id={item.link} />
              </Box>
              <Text fontSize="xs">{item.description}</Text>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Card>
  )
}

export default LibraryCard
