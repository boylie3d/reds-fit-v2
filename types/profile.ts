enum UserType {
  "Player",
  "Parent",
  "Admin",
}

export type Profile = {
  firstName: string
  lastName: string
  email: boolean
  profilePhoto: string
  userType: UserType
}
