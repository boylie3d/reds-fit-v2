import { Box } from "@chakra-ui/react"
import { getYoutubeLink } from "util/common"

interface Props {
  id: string
}

const YoutubeEmbed = ({ id }: Props) => (
  <Box
    style={{
      position: "relative",
      height: "0",
      overflow: "hidden",
      paddingBottom: "56.25%",
    }}
    w="100%"
  >
    <iframe
      src={getYoutubeLink(id)}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </Box>
)

export default YoutubeEmbed
