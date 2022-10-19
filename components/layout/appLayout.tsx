import { Profile } from "@/types"
import { Box, Center, Grid, GridItem } from "@chakra-ui/react"
import { useLocalProfile } from "hooks/profile"
import { getNavItem, NavItem } from "navigation"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PageHead from "./head"
import NavBottom from "./navBottom"
import NavTop from "./navTop"

interface LayoutProps {
  userProfile?: Profile
  children: JSX.Element[] | JSX.Element
}

export default function AppLayout(props: LayoutProps) {
  const [nav, setNav] = useState<NavItem>()
  const router = useRouter()
  const [height, setHeight] = useState<number>(window.innerWidth)
  function handleWindowSizeChange() {
    setHeight(window.innerHeight)
  }

  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = useLocalProfile()

  useEffect(() => {
    setNav(getNavItem(router.pathname))
  }, [router])

  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange)
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange)
    }
  }, [])

  if (!nav) return <div />

  return (
    <>
      <PageHead title={nav.name} />
      <Grid
        templateAreas={`"header"
                  "main"
                  "footer"`}
        gridTemplateRows={"40px 1fr 60px"}
        h={height}
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem area={"header"}>
          <NavTop profile={profile} title={nav.name} />
        </GridItem>
        <GridItem
          sx={{
            "&::-webkit-scrollbar": {
              width: "10px",
              borderRadius: "8px",
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
            },
            "&::-webkit-scrollbar-thumb": {
              backgroundColor: `rgba(0, 0, 0, 0.05)`,
              borderRadius: "8px",
            },
          }}
          overflowX="hidden"
          overflowY="scroll"
          area={"main"}
        >
          <Box>
            <Center>
              <Box w="90%" maxW="800px">
                {props.children}
              </Box>
            </Center>
          </Box>
        </GridItem>
        <GridItem
          style={{ boxShadow: "0px 0px 20px 0px" }}
          bg="teamPrimary"
          area={"footer"}
        >
          <NavBottom />
        </GridItem>
      </Grid>
    </>
  )
}
