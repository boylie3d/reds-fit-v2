import { AccessType, Profile, UserType } from "./types"

export const tmpUser: Profile = {
  firstName: "Dave",
  lastName: "Boyle",
  displayName: "Dave Boyle",
  email: "dave@globacore.com",
  photoURL:
    "https://pbs.twimg.com/profile_images/422249828500779009/rv2DKary_400x400.jpeg",
  userType: UserType.Player,
  accessType: AccessType.Admin,
}
