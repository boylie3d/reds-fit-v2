import { Workout } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Workout | Error>,
) {
  const { id } = req.query

  if (!id || Array.isArray(id))
    return res
      .status(400)
      .end("Bad request. ID parameter cannot be an array of IDs.")

  try {
    if (req.method === "GET") {
      const workout = await get(id)
      res.status(200).json(workout)
    } else if (req.method === "PUT") {
      const workout: Workout = JSON.parse(req.body)
      const result = await put(id, workout)
      res.status(200).json(workout)
    } else {
      res.status(405).end(new Error("Method not allowed"))
    }
  } catch (error) {
    console.error(error)
    res.status(500).end(error)
  }
}

async function get(id: string) {
  const ref = fb.db.collection("profiles").doc(id)
  const doc = await ref.get()
  return doc.data() as Workout
}

async function put(id: string, workout: Workout) {
  const ref = fb.db.collection("profiles").doc(id)
  const res = await ref.set(workout, { merge: true })
  return res
}
