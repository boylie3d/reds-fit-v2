export enum UserType {
  Player = "Player",
  Parent = "Parent",
  Coach = "Coach",
}

export enum AccessType {
  Unverified = "Unverified",
  Verified = "Verified",
  Admin = "Admin",
  Archived = "Archived",
}

export type Profile = {
  firstName: string
  lastName: string
  displayName: string
  email: string
  photoURL?: string
  userType?: UserType
  accessType: AccessType
}
