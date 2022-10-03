import {
  AiFillBell,
  AiFillHome,
  AiFillTrophy,
  AiOutlineBell,
  AiOutlineHome,
  AiOutlineTrophy,
} from "react-icons/ai"
import { HiOutlineUserGroup, HiUserGroup } from "react-icons/hi"
import { IconType } from "react-icons/lib"

export interface NavItem {
  name: string
  icon: IconType
  iconSelected: IconType
  route: string
}

export const navItems: NavItem[] = [
  {
    name: "Home",
    icon: AiOutlineHome,
    iconSelected: AiFillHome,
    route: "/",
  },
  {
    name: "Team",
    icon: HiOutlineUserGroup,
    iconSelected: HiUserGroup,
    route: "/team",
  },
  {
    name: "Leaderboard",
    icon: AiOutlineTrophy,
    iconSelected: AiFillTrophy,
    route: "/leaderboard",
  },
  {
    name: "Updates",
    icon: AiOutlineBell,
    iconSelected: AiFillBell,
    route: "/updates",
  },
]

export const getNavItem = (path: string) => {
  const item = navItems.find(x => x.route === path)
  return item!
}
