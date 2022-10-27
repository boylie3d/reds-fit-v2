import { LibraryItem } from "@/types"
import {
  Button,
  ButtonGroup,
  Flex,
  Grid,
  GridItem,
  Image,
  Input,
  Spacer,
  Textarea,
} from "@chakra-ui/react"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { getYoutubeId, getYoutubeThumb, youtubeIdToLink } from "util/common"

interface Props {
  existing?: LibraryItem
  onSubmit: (form: FieldValues) => void
  onCancel: () => void
}

const LibraryForm = ({ existing, onSubmit, onCancel }: Props) => {
  const { register, handleSubmit } = useForm()
  const [yId, setYId] = useState<string | undefined>(
    existing ? existing.link : undefined,
  )

  const urlAdded = (url: any) => {
    const raw = url.target.value
    const id = getYoutubeId(raw)
    setYId(id)
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid
          templateRows="repeat(4, 1fr)"
          templateColumns="repeat(3, 1fr)"
          p={4}
          gap={4}
        >
          <GridItem rowSpan={3} colSpan={1}>
            <Image src={getYoutubeThumb(yId as string)} />
          </GridItem>
          <GridItem rowSpan={1} colSpan={2}>
            <Input
              {...register("url")}
              required
              placeholder="Youtube URL"
              onBlur={urlAdded}
              defaultValue={existing ? youtubeIdToLink(existing.link) : ""}
            />
          </GridItem>
          <GridItem rowSpan={1} colSpan={2}>
            <Input
              {...register("title")}
              required
              placeholder="Title"
              defaultValue={existing?.title}
            />
          </GridItem>
          <GridItem rowSpan={2} colSpan={2}>
            <Textarea
              resize="none"
              {...register("message")}
              placeholder="Description (optional)"
              defaultValue={existing?.description}
            />
          </GridItem>
        </Grid>
        <Flex w="100%">
          <Spacer />
          <ButtonGroup gap={2}>
            <Button type="submit">Save</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </ButtonGroup>
        </Flex>
      </form>
    </>
  )
}

export default LibraryForm
