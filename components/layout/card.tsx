import { Box } from "@chakra-ui/react"

interface Props {
  children?: JSX.Element[] | JSX.Element | string
}

export default function Card(props: Props) {
  return (
    <Box boxShadow="md" w="100%" p="20px" borderRadius="md" borderWidth="1px">
      {props.children}
    </Box>
  )
}
