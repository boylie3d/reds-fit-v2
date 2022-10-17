import { defineStyleConfig, extendTheme } from "@chakra-ui/react"

export const colors = {
  teamPrimary: "#e22224",
}

const Button = defineStyleConfig({
  variants: {
    teamSolid: {
      bgColor: "teamPrimary",
      color: "white",
    },
    teamOutline: {
      border: "2px solid",
      boderColor: "teamPrimary",
      color: "teamPrimary",
    },
  },
  defaultProps: { variant: "teamSolid" },
})

const Box = defineStyleConfig({
  variants: {
    card: {
      boxShadow: "md",
      p: "20px",
      borderRadius: "md",
      borderWidth: "1px",
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
    Box,
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
