import { Profile } from "@/types"
import { GoogleUser } from "@/types/googleUser"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile | any>,
) {
  const { id } = req.query

  if (!id || Array.isArray(id))
    return res
      .status(400)
      .end("Bad request. ID parameter cannot be an array of IDs.")

  try {
    if (req.method === "GET") {
      const profile = await get(id)
      res.status(200).json(profile)
    } else if (req.method === "POST") {
      const profile: Profile = req.body
      const result = await sync(id, profile)
      res.status(200).json(profile)
    }
  } catch (error) {
    console.error(error)
    res.status(500).end(error)
  }
}

async function get(id: string) {
  const ref = fb.db.collection("profiles").doc(id)
  const doc = await ref.get()
  return doc.data() as Profile
}

async function sync(id: string, user: Profile) {
  const ref = fb.db.collection("profiles").doc(id)
  const res = await ref.set(user, { merge: true })
  return res
}

async function post(id: string, user: GoogleUser) {}
