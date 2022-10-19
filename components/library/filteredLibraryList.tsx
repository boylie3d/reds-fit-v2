import { LibraryItem } from "@/types"
import { CloseIcon, SearchIcon } from "@chakra-ui/icons"
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  VStack,
} from "@chakra-ui/react"
import AdminLibraryCard from "components/admin/library/libraryCard"
import { ChangeEvent, useState } from "react"
import LibraryCard from "./libraryCard"

interface Props {
  admin: boolean
  library: LibraryItem[]
}

const FilteredLibraryList = ({ library, admin }: Props) => {
  const [filteredLibrary, setFilteredLibrary] = useState<LibraryItem[]>(library)
  const [searchVal, setSearchVal] = useState<string>("")

  const search = (input: ChangeEvent<HTMLInputElement>) => {
    const val = input.target.value
    setSearchVal(val)
    if (!library) return

    setFilteredLibrary(
      library.filter(i => i.title.toLowerCase().includes(val.toLowerCase())),
    )
  }

  const reset = () => {
    setSearchVal("")
    setFilteredLibrary(library)
  }

  return (
    <>
      <VStack gap={3} w="100%">
        <Box w="100%">
          <InputGroup w="100%">
            <InputLeftElement pointerEvents="none">
              <SearchIcon color="gray.300" />
            </InputLeftElement>
            {searchVal.length > 0 && (
              <InputRightElement>
                <CloseIcon onClick={reset} />
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
        <VStack gap={3}>
          {filteredLibrary?.map(item =>
            admin ? (
              <AdminLibraryCard key={item.id} item={item} />
            ) : (
              <LibraryCard key={item.id} item={item} />
            ),
          )}
        </VStack>
      </VStack>
    </>
  )
}

export default FilteredLibraryList
