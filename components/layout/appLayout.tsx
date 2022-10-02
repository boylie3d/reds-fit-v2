import { Grid, GridItem } from "@chakra-ui/react"
import PageHead from "./head"
import NavBar from "./navBottom"
import NavTop from "./navTop"

interface LayoutProps {
  title: string
  children: JSX.Element[] | JSX.Element
}

export default function AppLayout(props: LayoutProps) {
  return (
    <>
      <PageHead title={props.title} />
      <Grid
        templateAreas={`"header"
                  "main"
                  "footer"`}
        gridTemplateRows={"40px 1fr 60px"}
        h="100vh"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"header"}>
          <NavTop />
        </GridItem>
        <GridItem overflowX="hidden" overflowY="scroll" pl="2" area={"main"}>
          {props.children}
        </GridItem>
        <GridItem pl="2" bg="teamPrimary" area={"footer"}>
          <NavBar />
        </GridItem>
      </Grid>
    </>
  )
}
