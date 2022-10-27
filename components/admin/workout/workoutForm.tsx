import { LibraryItem, ScoringType, Workout } from "@/types"
import { CloseIcon, DeleteIcon, SearchIcon } from "@chakra-ui/icons"
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Select,
  Spacer,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react"
import { useLibrary } from "hooks/library"
import { ChangeEvent, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useSWRConfig } from "swr"
import { getYoutubeThumb } from "util/common"
import { toUntimedDate } from "util/time"

interface WorkoutProps {
  workout?: Workout
  date?: Date
  onSubmitted?: (result: Workout) => void
  onDelete?: () => void
  onCancel?: () => void
}

type WorkoutPartial = {
  title: string
  description: string
  scoreType: ScoringType
  libraryRefs?: string[]
}

export default function WorkoutForm({
  workout: existing,
  date,
  onSubmitted,
  onDelete,
  onCancel,
}: WorkoutProps) {
  const [currentWorkout, setCurrentWorkout] = useState<Workout | undefined>(
    existing,
  )
  const [submitting, setSubmitting] = useState<boolean>(false)
  const { mutate } = useSWRConfig()
  const [library, setLibrary] = useState<LibraryItem[]>([])
  const { library: fullLib, loading, error } = useLibrary()

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<WorkoutPartial>()

  const onSubmit = async (form: WorkoutPartial) => {
    if (submitting) return

    const lib = library ? (library.map(l => l.id) as string[]) : undefined

    setSubmitting(true)

    if (currentWorkout) {
      const updatedWorkout = currentWorkout
      updatedWorkout.description = form.description
      updatedWorkout.title = form.title
      updatedWorkout.scoreType = form.scoreType
      updatedWorkout.libraryRefs = lib

      const workout = await update(updatedWorkout)
      setCurrentWorkout(workout)
    } else {
      const newWorkout: Workout = {
        description: form.description,
        title: form.title,
        scoreType: form.scoreType,
        libraryRefs: lib,
        live: date ? toUntimedDate(date) : toUntimedDate(new Date()),
      }

      const workout = await create(newWorkout)
      setCurrentWorkout(workout)
    }

    if (onSubmitted) onSubmitted(currentWorkout!)
    setSubmitting(false)
  }

  const create = async (workout: Workout) => {
    const resp = await fetch("/api/workout", {
      method: "POST",
      body: JSON.stringify(workout),
    })

    const result = (await resp.json()) as Workout
    setCurrentWorkout(result)
    return result
  }

  const update = async (workout: Workout) => {
    const resp = await fetch(`/api/workout/${workout.id}`, {
      method: "PUT",
      body: JSON.stringify(workout),
    })

    const result = (await resp.json()) as Workout
    return result
  }

  const del = async () => {
    if (!existing) return
    setSubmitting(true)

    const resp = await fetch(`/api/workout/${existing.id}`, {
      method: "DELETE",
    })
    const result = await resp.json()
    mutate("/api/workout")
    if (onDelete) {
      onDelete()
    }
    setSubmitting(false)
  }

  return (
    <Box w="100%">
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack rowGap={2}>
          <Input
            required
            w="100%"
            defaultValue={existing ? existing.title : ""}
            placeholder="Title"
            {...register("title")}
          />
          <Textarea
            required
            defaultValue={existing ? existing.description : ""}
            w="100%"
            placeholder="Description"
            {...register("description")}
          />
          <Select
            required
            defaultValue={existing ? existing.scoreType.valueOf() : undefined}
            {...register("scoreType")}
            size="sm"
            placeholder="Select Type"
          >
            {Object.values(ScoringType).map((t, i) => (
              <option
                key={t}
                id={Object.keys(ScoringType)[i]}
                value={Object.keys(ScoringType)[i]}
              >
                {t}
              </option>
            ))}
          </Select>
          <>
            {fullLib && (
              <LibrarySelector
                workout={existing}
                library={fullLib}
                onChange={setLibrary}
              />
            )}
          </>
          <Flex gap={5} w="100%">
            <Button
              flex={1}
              type="submit"
              variant="teamOutline"
              disabled={submitting}
            >
              {existing ? "Update Workout" : "Create Workout"}
            </Button>
            {existing && (
              <div>
                <Spacer />
                <Button onClick={onCancel}>Cancel</Button>
              </div>
            )}
          </Flex>
          {existing && (
            <Box w="100%" pt={4}>
              <Button variant="teamOutline" float="right" onClick={del}>
                <DeleteIcon />
              </Button>
            </Box>
          )}
        </VStack>
      </form>
    </Box>
  )
}

interface LibraryProps {
  onChange: (items: LibraryItem[]) => void
  library: LibraryItem[] | undefined
  workout: Workout | undefined
}

const LibrarySelector = ({ onChange, workout, library }: LibraryProps) => {
  const [filteredLibrary, setFilteredLibrary] = useState<
    LibraryItem[] | undefined
  >(library)
  const [searchVal, setSearchVal] = useState<string>("")
  const [selectedLibrary, setSelectedLibrary] = useState<LibraryItem[]>([])

  useEffect(() => {
    if (!library || !workout) return

    const lib = library.filter(l => {
      if (workout.libraryRefs?.includes(l.id!)) {
        return l
      }
    })

    if (lib) setSelectedLibrary(lib)
  }, [library])

  const search = (input: ChangeEvent<HTMLInputElement>) => {
    const val = input.target.value
    setSearchVal(val)
    if (!library) return

    setFilteredLibrary(
      library.filter(i => i.title.toLowerCase().includes(val.toLowerCase())),
    )
  }

  const reset = () => {
    if (!library) return

    setSearchVal("")
    setFilteredLibrary(library)
  }

  const select = (item: LibraryItem) => {
    const tmpLib: LibraryItem[] = [...selectedLibrary]
    tmpLib.push(item)

    setSelectedLibrary(tmpLib)
    onChange(tmpLib)
  }

  const deselect = (item: LibraryItem) => {
    const tmpLib: LibraryItem[] = selectedLibrary.filter(i => i !== item)

    setSelectedLibrary(tmpLib)
    onChange(tmpLib)
  }

  if (!library) return <div />

  return (
    <>
      <Accordion w="100%" allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              {"Library Resources (Optional)"}
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Box w="100%">
              <InputGroup w="100%">
                <InputLeftElement pointerEvents="none">
                  <SearchIcon color="gray.300" />
                </InputLeftElement>
                {searchVal.length > 0 && (
                  <InputRightElement>
                    <CloseIcon cursor="pointer" onClick={reset} />
                  </InputRightElement>
                )}
                <Input
                  w="100%"
                  value={searchVal}
                  placeholder="Search..."
                  onChange={search}
                />
              </InputGroup>
            </Box>
            <VStack pt={3}>
              {filteredLibrary?.map(item => (
                <LibraryElement
                  key={item.id}
                  isSelected={selectedLibrary.includes(item)}
                  item={item}
                  onSelect={select}
                  onDeselect={deselect}
                />
              ))}
            </VStack>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  )
}

interface BtnProps {
  item: LibraryItem
  isSelected: boolean
  onSelect: (item: LibraryItem) => void
  onDeselect: (item: LibraryItem) => void
}

const LibraryElement = ({
  item,
  isSelected,
  onSelect,
  onDeselect,
}: BtnProps) => {
  return (
    <Box
      w="100%"
      borderWidth={1}
      borderColor={isSelected ? "teamPrimary" : ""}
      bg={isSelected ? "teamPrimary" : ""}
      color={isSelected ? "white" : "black"}
      onClick={() => (isSelected ? onDeselect(item) : onSelect(item))}
    >
      <HStack w="100%" gap={3}>
        <Image w="80px" src={getYoutubeThumb(item.link)} />
        <Text noOfLines={1}>{item.title}</Text>
      </HStack>
    </Box>
  )
}
