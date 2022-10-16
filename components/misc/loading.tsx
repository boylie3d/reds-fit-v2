import { Box, Center, CircularProgress } from "@chakra-ui/react"

export default function LoadingPane() {
  return (
    <Box h="100%">
      <Center>
        <CircularProgress isIndeterminate color="teamPrimary" />
      </Center>
    </Box>
  )
}
