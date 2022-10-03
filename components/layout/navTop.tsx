import { Profile, UserType } from "@/types"
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
import Router from "next/router"
import { useState } from "react"

interface NavProps {
  user?: Profile
  title?: string
}

export default function NavTop({ user, title }: NavProps) {
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
            <UserBadge user={user} />
          </Box>
        </GridItem>
      </Grid>
    </>
  )
}

const UserBadge = ({ user }: NavProps) => {
  const [menuOpen, setMenuOpen] = useState(false)

  const logout = () => {
    console.log("signing out")
  }

  const goToAdmin = () => {
    Router.push("/admin")
    console.log("admin panel")
  }

  return (
    <Menu onOpen={() => setMenuOpen(true)} onClose={() => setMenuOpen(false)}>
      <MenuButton float="right">
        <Box alignItems="center" display="inline-flex">
          {/* <Text pr="0.5em">{user?.firstName}</Text> */}
          <Avatar size="sm" src={user?.profilePhoto}></Avatar>
          {menuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Box>
      </MenuButton>
      <MenuList>
        {user?.userType === UserType.Admin && (
          <MenuItem onClick={goToAdmin}>Admin</MenuItem>
        )}
        <MenuItem onClick={logout}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  )
}
