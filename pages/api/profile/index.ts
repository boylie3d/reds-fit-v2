import { Profile } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile | any>,
) {
  try {
    if (req.method === "GET") {
      const profile = await get()
      res.status(200).json(profile)
    } else {
      res.status(405).end(new Error("Method not allowed"))
    }
  } catch (error) {
    console.error(error)
    res.status(500).end(error)
  }
}

async function get() {
  const ref = fb.db.collection("profiles")
  const coll = await ref.get()
  const profiles = coll.docs.map(item => item.data())
  return profiles as Profile[]
}
