import { LibraryItem } from "@/types"
import { VStack } from "@chakra-ui/react"
import AppLayout from "components/layout/appLayout"
import FilteredLibraryList from "components/library/filteredLibraryList"
import { GetServerSideProps, NextPage } from "next"
import { get } from "./api/library"

interface Props {
  library: LibraryItem[]
}

const Library: NextPage<Props> = ({ library }) => {
  return (
    <AppLayout>
      <VStack gap={3}>
        <FilteredLibraryList admin={false} library={library} />
      </VStack>
    </AppLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ctx => {
  const lib = await get()

  return {
    props: {
      library: lib,
    },
  }
}

export default Library
