import { Box } from "@chakra-ui/react"

interface Props {
  children?: JSX.Element[] | JSX.Element | string
}

export default function Card(props: Props) {
  return <Box>{props.children}</Box>
}
