import { Profile } from "@/types"
import { getNavItem, NavItem } from "@/types/navigation"
import { Grid, GridItem } from "@chakra-ui/react"
import { UseProfile } from "hooks/profile"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import fb from "util/firebase"
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
  const [user, loading, error] = useAuthState(fb.auth)
  const {
    profile,
    loading: profileLoading,
    error: profileError,
  } = UseProfile(user ? user.uid : "")

  useEffect(() => {
    console.log(profile)
  }, [profile])

  useEffect(() => {
    setNav(getNavItem(router.pathname))
  }, [router])

  if (!nav) return <div />

  return (
    <>
      <PageHead title={nav.name} />
      <Grid
        templateAreas={`"header"
                  "main"
                  "footer"`}
        gridTemplateRows={"40px 1fr 60px"}
        h="100vh"
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
          {props.children}
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
