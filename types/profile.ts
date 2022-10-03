export enum UserType {
  Player = "Player",
  Parent = "Parent",
  Admin = "Admin",
}

export type Profile = {
  firstName: string
  lastName: string
  email: string
  profilePhoto?: string
  userType: UserType
}
