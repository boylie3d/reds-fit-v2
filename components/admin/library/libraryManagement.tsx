import { LibraryItem } from "@/types"
import { Button, Heading, VStack } from "@chakra-ui/react"
import FilteredLibraryList from "components/library/filteredLibraryList"
import LoadingPane from "components/misc/loading"
import { useLibrary } from "hooks/library"

const LibraryManagement = () => {
  const { library, loading, error } = useLibrary()

  const tmp = async () => {
    return
    const now = new Date()
    const item: LibraryItem = {
      created: now,
      updated: now,
      title: "test library item",
      link: "oflaURiziIQ",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec quis erat consequat, vulputate libero id, suscipit lacus. Vivamus non ornare purus. Morbi tempus dapibus luctus. Nunc dictum elementum metus, eget egestas massa gravida vitae. Phasellus mi ipsum, tincidunt et elementum non, molestie in justo. Curabitur tincidunt dolor at lectus gravida volutpat. Ut maximus justo fringilla risus facilisis aliquet. Quisque at ipsum facilisis, bibendum felis vitae, aliquet nunc. Morbi dictum laoreet urna, id molestie odio convallis sit amet. Etiam ullamcorper iaculis tellus non mollis. Nunc hendrerit bibendum ullamcorper. Vivamus ullamcorper lacinia nisl a elementum. Mauris tortor diam, commodo at purus sit amet, blandit vestibulum risus. Aliquam sed velit augue. Nam vel urna ac nisi convallis viverra. Vivamus at dignissim turpis.",
    }
    const post = await fetch("/api/library", {
      method: "POST",
      body: JSON.stringify(item),
    })
    const json = await post.json()

    console.log(json)
  }

  if (loading) return <LoadingPane />

  return (
    <>
      <VStack gap={2}>
        <>
          {library && (
            <>
              <Heading size="xs">Library</Heading>
              <FilteredLibraryList library={library} admin={true} />
            </>
          )}
        </>
      </VStack>
      <Button onClick={tmp}>click</Button>
    </>
  )
}

export default LibraryManagement
