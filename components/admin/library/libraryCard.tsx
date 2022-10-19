import { LibraryItem } from "@/types"
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Image,
  Text,
} from "@chakra-ui/react"
import Card from "components/layout/card"

interface Props {
  item: LibraryItem
}

const AdminLibraryCard = ({ item }: Props) => {
  return (
    <Card>
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
        <GridItem rowSpan={1} colSpan={3}>
          <Text color="gray.500" fontSize="xs" noOfLines={2}>
            {item.description}
          </Text>
        </GridItem>
        <GridItem rowSpan={1} colSpan={3}>
          <Box w="100%" h="100%" pos="relative">
            <Button variant="teamOutline" w="100%" pos="absolute" bottom={0}>
              Edit
            </Button>
          </Box>
        </GridItem>
      </Grid>
    </Card>
  )
}

export default AdminLibraryCard
