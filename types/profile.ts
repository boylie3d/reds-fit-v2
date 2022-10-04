export enum UserType {
  Player = "Player",
  Parent = "Parent",
  Admin = "Admin",
}

export type Profile = {
  firstName: string
  lastName: string
  displayName: string
  email: string
  photoURL?: string
  userType: UserType
}
