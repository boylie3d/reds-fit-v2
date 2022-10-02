import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import {
  Avatar,
  Box,
  Divider,
  Flex,
  LinkBox,
  LinkOverlay,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react"
import { useRouter } from "next/router"
import { useState } from "react"

const navItems = [
  {
    name: "Home",
    route: "/",
  },
  {
    name: "Planner",
    route: "/planner",
  },
]

export default function NavBottom() {
  const router = useRouter()
  return (
    <>
      <Box h="50px">
        <Flex p="10px">
          {navItems.map(item => (
            <LinkBox key={item.route}>
              <LinkOverlay href={item.route}>
                <Box w="100px" textAlign="center">
                  <Text
                    color={
                      router.pathname === item.route ? "blue.500" : "black"
                    }
                    fontWeight={
                      router.pathname === item.route ? "bold" : "normal"
                    }
                  >
                    {item.name}
                  </Text>
                </Box>
              </LinkOverlay>
            </LinkBox>
          ))}
          <Box flex={1}>{/* <UserBadge /> */}</Box>
        </Flex>
      </Box>
      <Divider />
    </>
  )
}

const UserBadge = () => {
  const { data } = useSession()
  const { user, loading, error } = UseUser(data?.user?.email || "")
  const [menuOpen, setMenuOpen] = useState(false)

  const logout = () => {
    signOut()
  }

  return (
    <Menu onOpen={() => setMenuOpen(true)} onClose={() => setMenuOpen(false)}>
      <MenuButton float="right">
        <Box alignItems="center" display="inline-flex">
          <Avatar size="sm" src={user?.user_picture}></Avatar>
          {menuOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
        </Box>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  )
}
