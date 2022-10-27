export type Comment = {
  id?: string
  userId: string
  message: string
  created?: Date
  updated: Date
}

export type Fistbump = {
  id?: string
  userId: string
  created: Date
  resultId: string
}
