import { LibraryItem } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LibraryItem[] | LibraryItem | Error>,
) {
  switch (req.method) {
    case "GET":
      const result = await get()
      res.status(200).json(result)
      break
    case "POST":
      const item = JSON.parse(req.body) as LibraryItem
      const postedItem = await post(item)
      res.status(200).json(postedItem)
      break
    default:
      res.status(405).end(new Error("Method not allowed"))
  }
}

export async function get() {
  const ref = fb.db.collection("library")
  const response = await ref.get()
  const results = response.docs.map(item => item.data()) as LibraryItem[]
  return results
}

async function post(item: LibraryItem) {
  const res = await fb.db.collection("library").add(item)
  item.id = res.id
  await res.set(item)
  return item
}
