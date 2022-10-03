import {
  AiFillBell,
  AiFillHome,
  AiFillTrophy,
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineTrophy,
} from "react-icons/ai"
import {
  HiOutlineUser,
  HiOutlineUserGroup,
  HiUser,
  HiUserGroup,
} from "react-icons/hi"
import { IconType } from "react-icons/lib"

export interface NavItem {
  name: string
  showInNav: boolean
  icon?: IconType
  iconSelected?: IconType
  route: string
}

export const navItems: NavItem[] = [
  {
    name: "Home",
    showInNav: true,
    icon: AiOutlineHome,
    iconSelected: AiFillHome,
    route: "/",
  },
  {
    name: "Team",
    showInNav: true,
    icon: HiOutlineUserGroup,
    iconSelected: HiUserGroup,
    route: "/team",
  },
  {
    name: "Profile",
    showInNav: true,
    icon: HiOutlineUser,
    iconSelected: HiUser,
    route: "/profile",
  },
  {
    name: "Leaderboard",
    showInNav: true,
    icon: AiOutlineTrophy,
    iconSelected: AiFillTrophy,
    route: "/leaderboard",
  },
  {
    name: "Updates",
    showInNav: true,
    icon: AiOutlineBell,
    iconSelected: AiFillBell,
    route: "/updates",
  },
  {
    name: "Admin",
    showInNav: false,
    route: "/admin",
  },
]

export const getNavItem = (path: string) => {
  const item = navItems.find(x => x.route === path)
  return item!
}

export const getNavBarElements = () => {
  return navItems.filter(x => x.showInNav)
}
