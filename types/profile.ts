export enum UserType {
  Player = "Player",
  Parent = "Parent",
  Coach = "Coach",
}

export enum AccessType {
  Unverified = "Unverified",
  Verified = "Verified",
  Admin = "Admin",
}

export type Profile = {
  firstName: string
  lastName: string
  email: string
  photoURL?: string
  userType?: UserType
  accessType: AccessType
  displayName: string
}
