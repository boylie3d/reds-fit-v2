import { Result } from "@/types"
import { VStack } from "@chakra-ui/react"
import ResultCard from "./resultCard"

interface ResultProps {
  results: Result[] | undefined
}

export default function ResultList({ results }: ResultProps) {
  return (
    <VStack gap={3} w="100%">
      {results?.map(result => (
        <ResultCard key={result.id} result={result} />
      ))}
    </VStack>
  )
}
