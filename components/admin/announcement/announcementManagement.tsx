import { Announcement } from "@/types"
import { CloseIcon } from "@chakra-ui/icons"
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import Card from "components/layout/card"
import CalendarBar from "components/misc/calendarBar"
import { useAnnouncements } from "hooks/announcement"
import { NextPage } from "next"
import { useEffect, useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { BsFillMegaphoneFill } from "react-icons/bs"
import { useSWRConfig } from "swr"
import { toUntimedDate } from "util/time"

interface Props {}

const AnnouncementManagement: NextPage<Props> = ({}) => {
  const [calDate, setCalDate] = useState<Date>(new Date())
  const { announcements, loading, error } = useAnnouncements({
    live: toUntimedDate(calDate),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { mutate } = useSWRConfig()
  const [currAnnouncement, setCurrAnnouncement] = useState<
    Announcement | undefined
  >(undefined)

  useEffect(() => {
    setCurrAnnouncement(undefined)
  }, [calDate, announcements])

  //TODO: this isn't updating properly on create / delete - fixez
  const create = async (announcement: Announcement) => {
    const resp = await fetch("/api/announcement", {
      method: "POST",
      body: JSON.stringify(announcement),
    })
    await resp.json()

    const options = { optimisticData: announcement, rollbackOnError: true }
    mutate(`/api/announcement/${announcement.id}`, options)

    closeModal()
  }

  const del = async (announcement: Announcement) => {
    const resp = await fetch(`/api/announcement/${announcement.id}`, {
      method: "DELETE",
    })
    await resp.json()
    closeModal()
  }

  const openEditPanel = async (announcement: Announcement) => {
    setCurrAnnouncement(announcement)
    onOpen()
  }

  const update = async (announcement: Announcement) => {
    const resp = await fetch(`/api/announcement/${announcement.id}`, {
      method: "PUT",
      body: JSON.stringify(announcement),
    })
    await resp.json()

    const options = { optimisticData: announcement, rollbackOnError: true }
    mutate("/api/announcement", options)

    closeModal()
  }

  const closeModal = () => {
    mutate("/api/announcement/")
    setCalDate(new Date(calDate))
    setCurrAnnouncement(undefined)
    onClose()
  }

  return (
    <>
      <VStack gap={3}>
        <CalendarBar date={calDate} onChanged={setCalDate} />
        {announcements && announcements.length > 0 ? (
          <Box w="100%">
            {announcements.map(a => (
              <AnnouncementItem
                key={a.id}
                announcement={a}
                onDelete={() => del(a)}
                onEdit={() => openEditPanel(a)}
              />
            ))}
          </Box>
        ) : (
          <Button w="100%" onClick={onOpen}>
            Create New
          </Button>
        )}
      </VStack>
      <Modal isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {currAnnouncement ? "Edit Existing" : "Create New"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <AnnouncementForm
              onSubmit={create}
              onUpdate={update}
              currentDate={toUntimedDate(calDate)}
              existing={currAnnouncement}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
export default AnnouncementManagement

interface AnnouncementProps {
  announcement: Announcement
  onEdit: () => void
  onDelete: () => void
}

const AnnouncementItem = ({
  announcement,
  onEdit,
  onDelete,
}: AnnouncementProps) => {
  return (
    <Card>
      <VStack align="left" gap={3}>
        <Center>
          <HStack gap={2}>
            <Icon color="teamPrimary" as={BsFillMegaphoneFill} />
            <Heading size="xs">{"Today's Announcement:"}</Heading>
            <Icon color="teamPrimary" as={BsFillMegaphoneFill} />
          </HStack>
        </Center>
        <Text fontSize="xs">{announcement.message}</Text>
        <Flex w="100%" gap={3}>
          <Button onClick={onEdit} variant="teamOutline" flex={1}>
            Edit
          </Button>
          <Button onClick={onDelete} variant="unstyled">
            <CloseIcon color="teamPrimary" />
          </Button>
        </Flex>
      </VStack>
    </Card>
  )
}

interface FormProps {
  currentDate: string
  onSubmit: (announcement: Announcement) => void
  onUpdate: (announcement: Announcement) => void
  existing: Announcement | undefined
}

const AnnouncementForm = ({
  onSubmit,
  onUpdate,
  currentDate,
  existing,
}: FormProps) => {
  const { register, handleSubmit } = useForm()

  const submit = (form: FieldValues) => {
    if (existing === undefined) create(form.message)
    else update(form.message)
  }

  const create = (message: string) => {
    const now = new Date()
    const announcement: Announcement = {
      message: message,
      live: currentDate,
      created: now,
      updated: now,
    }
    onSubmit(announcement)
  }

  const update = (message: string) => {
    existing!.message = message
    existing!.updated = new Date()

    onUpdate(existing!)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <VStack gap={2}>
        <Textarea
          {...register("message")}
          placeholder="Your announcement"
          defaultValue={existing ? existing.message : ""}
        />
        <Button w="100%" type="submit">
          Submit
        </Button>
      </VStack>
    </form>
  )
}
