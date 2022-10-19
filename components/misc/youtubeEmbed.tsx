import { AspectRatio } from "@chakra-ui/react"
import { getYoutubeLink } from "util/common"

interface Props {
  id: string
}

const YoutubeEmbed = ({ id }: Props) => (
  <AspectRatio ratio={16 / 9}>
    <iframe
      src={getYoutubeLink(id)}
      frameBorder="0"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
      title="Embedded youtube"
    />
  </AspectRatio>
)

export default YoutubeEmbed
