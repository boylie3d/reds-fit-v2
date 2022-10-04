import { Profile, UserType } from "@/types"
import { getNavItem, NavItem } from "@/types/navigation"
import { Grid, GridItem } from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import PageHead from "./head"
import NavBottom from "./navBottom"
import NavTop from "./navTop"

interface LayoutProps {
  userProfile?: Profile
  children: JSX.Element[] | JSX.Element
}

const tmpUser: Profile = {
  firstName: "Dave",
  lastName: "Boyle",
  displayName: "Dave Boyle",
  email: "dave@globacore.com",
  photoURL:
    "https://pbs.twimg.com/profile_images/422249828500779009/rv2DKary_400x400.jpeg",
  userType: UserType.Admin,
}

export default function AppLayout(props: LayoutProps) {
  const [nav, setNav] = useState<NavItem>()
  const router = useRouter()

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
          <NavTop user={tmpUser} title={nav.name} />
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
          pl="2"
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
