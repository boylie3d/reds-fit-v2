import { Profile } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile | Error>,
) {
  const { id } = req.query

  if (!id || Array.isArray(id))
    return res
      .status(400)
      .end("Bad request. ID parameter cannot be an array of IDs.")

  try {
    switch (req.method) {
      case "GET":
        const profile = await get(id)
        res.status(200).json(profile)
        break
      case "PUT":
        const update: Profile = JSON.parse(req.body)
        const result = await set(id, update)
        res.status(200).json(result)
        break
      case "POST":
        const create: Profile = JSON.parse(req.body)
        const created = await set(id, create)
        res.status(200).json(created)
        break
      default:
        res.status(405).end(new Error("Method not allowed"))
    }
  } catch (error) {
    console.error(error)
    res.status(500).end(error)
  }
}

export async function get(id: string) {
  const ref = fb.db.collection("profiles").doc(id)
  const doc = await ref.get()
  return doc.data() as Profile
}

export async function set(id: string, user: Profile) {
  const ref = fb.db.collection("profiles").doc(id)
  await ref.set(user, { merge: true })
  return user
}
