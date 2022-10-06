import { ArrowLeftIcon, ArrowRightIcon, CalendarIcon } from "@chakra-ui/icons"
import { Flex, HStack, Spacer, Text } from "@chakra-ui/react"
import { useState } from "react"
import { addDays } from "util/time"

interface CalendarProps {
  date?: Date
  onChanged?: (date: Date) => void
}

export default function CalendarBar({ date, onChanged }: CalendarProps) {
  const [currDate, setDate] = useState<Date>(date ? date : new Date())

  const nextDay = () => {
    const newDate = addDays(currDate, 1)
    setDate(newDate)
    if (onChanged) onChanged(currDate)
  }

  const previousDay = () => {
    const newDate = addDays(currDate, -1)
    setDate(newDate)
    if (onChanged) onChanged(currDate)
  }

  return (
    <Flex w="100%">
      <ArrowLeftIcon onClick={previousDay} />
      <Spacer />
      <HStack gap={1}>
        <CalendarIcon />
        <Text>{currDate.toDateString()}</Text>
      </HStack>
      <Spacer />
      <ArrowRightIcon onClick={nextDay} />
    </Flex>
  )
}
