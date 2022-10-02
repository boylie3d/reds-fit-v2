import { extendTheme } from "@chakra-ui/react"

const colors = {
  teamPrimary: "#e22224",
}

const theme = extendTheme({
  fonts: {
    heading: `'Graduate', sans-serif`,
    // body: `'NBAAction', sans-serif`,
    // text: `'NBAAction', sans-serif`,
  },
  colors: {
    teamPrimary: colors.teamPrimary,
  },
  components: {
    Heading: {
      sizes: {
        "3xl": {
          color: colors.teamPrimary,
        },
      },
    },
  },
})

export default theme
