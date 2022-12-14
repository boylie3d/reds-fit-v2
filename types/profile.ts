export enum UserType {
  Player = "Player",
  Parent = "Parent",
  Coach = "Coach",
}

export enum AccessType {
  User = "User",
  Admin = "Admin",
  Blocked = "Blocked",
}

export type Profile = {
  uid?: string
  firstName: string
  lastName: string
  displayName: string
  email: string
  photoURL?: string
  userType: UserType
  accessType: AccessType
  ownedGear?: string
}
