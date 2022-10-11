import { Result } from "@/types"
import { Box } from "@chakra-ui/react"
import ResultCard from "./resultCard"

interface ResultProps {
  results: Result[]
}

export default function ResultList({ results }: ResultProps) {
  return (
    <Box w="100%">
      {results.map(result => (
        <ResultCard key={result.id} result={result} />
      ))}
    </Box>
  )
}
