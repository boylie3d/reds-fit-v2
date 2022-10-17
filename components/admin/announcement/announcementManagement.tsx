import { Announcement } from "@/types"
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Textarea,
  useDisclosure,
  VStack,
} from "@chakra-ui/react"
import CalendarBar from "components/misc/calendarBar"
import { useAnnouncements } from "hooks/announcement"
import { NextPage } from "next"
import { useState } from "react"
import { FieldValues, useForm } from "react-hook-form"
import { toUntimedDate } from "util/time"

interface Props {}

const AnnouncementManagement: NextPage<Props> = ({}) => {
  const [calDate, setCalDate] = useState<Date>(new Date())
  const { announcements, loading, error } = useAnnouncements({
    live: toUntimedDate(calDate),
  })
  const { isOpen, onOpen, onClose } = useDisclosure()

  const create = (announcement: Announcement) => {}

  return (
    <>
      <VStack gap={3}>
        <CalendarBar date={calDate} onChanged={setCalDate} />
        {announcements && announcements.length > 0 ? (
          <div>there's stuff</div>
        ) : (
          <>
            <Button w="100%" onClick={onOpen}>
              Create New
            </Button>
            <Modal isOpen={isOpen} onClose={onClose}>
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Create New</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <AnnouncementForm onSubmit={create} />
                </ModalBody>
              </ModalContent>
            </Modal>
          </>
        )}
      </VStack>
    </>
  )
}

export default AnnouncementManagement

interface FormProps {
  onSubmit: (announcement: Announcement) => void
}

const AnnouncementForm = ({ onSubmit }: FormProps) => {
  const { register, handleSubmit } = useForm()

  const submit = (form: FieldValues) => {
    console.log(form)
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <VStack gap={2}>
        <Textarea {...register("message")} placeholder="Your announcement" />
        <Button w="100%" type="submit">
          Submit
        </Button>
      </VStack>
    </form>
  )
}
