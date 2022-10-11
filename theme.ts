import { defineStyleConfig, extendTheme } from "@chakra-ui/react"

const colors = {
  teamPrimary: "#e22224",
}

const Button = defineStyleConfig({
  variants: {
    teamOutline: {
      border: "2px solid",
      boderColor: "teamPrimary",
      color: "teamPrimary",
    },
  },
})

const theme = extendTheme({
  fonts: {
    heading: `'Graduate', sans-serif`,
    body: `'Roboto', sans-serif`,
    text: `'Roboto', sans-serif`,
  },
  colors: {
    teamPrimary: colors.teamPrimary,
  },
  components: {
    Button,
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
