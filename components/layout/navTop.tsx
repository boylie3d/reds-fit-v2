import { AccessType, Profile } from "@/types"
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Box,
  Center,
  Grid,
  GridItem,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
} from "@chakra-ui/react"
import { signOut } from "@firebase/auth"
import Router from "next/router"
import { useState } from "react"
import fb from "util/firebase"

interface NavProps {
  profile?: Profile
  title?: string
}

export default function NavTop({ profile, title }: NavProps) {
  return (
    <>
      <Grid templateColumns="repeat(4, 1fr)" h="100%" w="100%">
        <GridItem colSpan={1}>
          <Box
            h="100%"
            pl="5px"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Heading size="sm" color="teamPrimary">
              REDS FIT
            </Heading>
          </Box>
        </GridItem>
        <GridItem colSpan={2}>
          <Center h="100%">
            <Heading size="sm">{title}</Heading>
          </Center>
        </GridItem>
        <GridItem colSpan={1}>
          <Box
            pr="5px"
            h="100%"
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <UserBadge profile={profile} />
          </Box>
        </GridItem>
      </Grid>
    </>
  )
}

const UserBadge = ({ profile }: NavProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const logout = () => {
    signOut(fb.auth)
  }

  const goToAdmin = () => {
    Router.push("/admin")
  }

  return (
    <Menu onOpen={() => setMenuOpen(true)} onClose={() => setMenuOpen(false)}>
      <MenuButton float="right">
        <Box alignItems="center" display="inline-flex">
          {/* <Text pr="0.5em">{profile?.firstName}</Text> */}
          <Avatar size="sm" src={profile?.photoURL}></Avatar>
          {menuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Box>
      </MenuButton>
      <MenuList>
        {profile?.accessType === AccessType.Admin && (
          <MenuItem onClick={goToAdmin}>Admin</MenuItem>
        )}
        <MenuItem onClick={logout}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  )
}
