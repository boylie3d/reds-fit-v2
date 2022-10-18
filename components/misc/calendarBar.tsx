import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "@chakra-ui/icons"
import {
  Box,
  Center,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  Text,
} from "@chakra-ui/react"
import { useState } from "react"
import { Calendar } from "react-calendar"
import { addDays } from "util/time"

interface CalendarProps {
  date?: Date
  onChanged: (date: Date) => void
}

export default function CalendarBar({ date, onChanged }: CalendarProps) {
  const [currDate, setDate] = useState<Date>(date ? date : new Date())
  const [calOpen, setCalOpen] = useState<boolean>(false)

  const nextDay = () => {
    const newDate = addDays(currDate, 1)
    setDate(newDate)
    onChanged(new Date(currDate))
  }

  const previousDay = () => {
    const newDate = addDays(currDate, -1)
    setDate(newDate)
    onChanged(new Date(currDate))
  }

  const calUpdated = (date: Date) => {
    const newDate = new Date(date)
    setDate(newDate)
    onChanged(newDate)
  }

  return (
    <Flex w="100%">
      <ArrowLeftIcon
        style={{
          cursor: "pointer",
        }}
        onClick={previousDay}
      />
      <Spacer />
      <Box
        onClick={() => setCalOpen(true)}
        style={{
          cursor: "pointer",
        }}
      >
        <HStack gap={1}>
          <CalendarIcon />
          <Text>{currDate.toDateString()}</Text>
        </HStack>
      </Box>
      <Spacer />
      <ArrowRightIcon
        style={{
          cursor: "pointer",
        }}
        onClick={nextDay}
      />
      <CalendarModal
        open={calOpen}
        date={currDate}
        onClose={() => setCalOpen(false)}
        onChange={calUpdated}
      />
    </Flex>
  )
}

interface ModalProps {
  open: boolean
  onChange: (date: Date) => void
  onClose: () => void
  date: Date
}

const CalendarModal = ({ open, onChange, onClose, date }: ModalProps) => {
  return (
    <Modal isOpen={open} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select Date</ModalHeader>
        <ModalBody>
          <Center>
            <Calendar
              defaultValue={date}
              onChange={(date: Date) => onChange(new Date(date))}
            />
          </Center>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
