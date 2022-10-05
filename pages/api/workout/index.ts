import { Workout } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Workout[] | Error>,
) {
  try {
    if (req.method === "GET") {
      const workout = await get()
      res.status(200).json(workout)
    } else {
      res.status(405).end(new Error("Method not allowed"))
    }
  } catch (error) {
    console.error(error)
    res.status(500).end(error)
  }
}

async function get() {
  const ref = fb.db.collection("workouts")
  const coll = await ref.get()
  const workouts = coll.docs.map(item => item.data()) as Workout[]
  return workouts
}
