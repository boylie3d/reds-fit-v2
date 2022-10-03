import {
  AiFillBell,
  AiFillHome,
  AiOutlineBell,
  AiOutlineHome,
} from "react-icons/ai"
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
