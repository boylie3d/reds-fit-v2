import {
  AiFillBell,
  AiFillTrophy,
  AiOutlineBell,
  AiOutlineTrophy,
} from "react-icons/ai"
import {
  HiOutlineUser,
  HiOutlineUserGroup,
  HiUser,
  HiUserGroup,
} from "react-icons/hi"

import { IoBarbellSharp } from "react-icons/io5"
import { IconType } from "react-icons/lib"
import { TbBarbell } from "react-icons/tb"

export interface NavItem {
  name: string
  showInNav: boolean
  icon?: IconType
  iconSelected?: IconType
  route: string
}

export const navItems: NavItem[] = [
  {
    name: "Workouts",
    showInNav: true,
    icon: TbBarbell,
    iconSelected: IoBarbellSharp,
    route: "/",
  },
  {
    name: "Feed",
    showInNav: true,
    icon: HiOutlineUserGroup,
    iconSelected: HiUserGroup,
    route: "/feed",
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
  {
    name: "Update Profile",
    showInNav: false,
    route: "/profile/update",
  },
]

export const getNavItem = (path: string) => {
  const item = navItems.find(x => x.route === path)
  return item!
}

export const getNavBarElements = () => {
  return navItems.filter(x => x.showInNav)
}
