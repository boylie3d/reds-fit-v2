export type Comment = {
  id?: string
  userId: string
  message: string
  created?: Date
  updated: Date
  resultId: string
}

export type Fistbump = {
  id?: string
  userId: string
  created: Date
  resultId: string
}
