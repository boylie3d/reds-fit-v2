import { Workout } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"
import { objToFirestoreQuery } from "util/query"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Workout[] | Workout | Error>,
) {
  try {
    if (req.method === "GET") {
      const workout = await get(req.query)
      res.status(200).json(workout)
    } else if (req.method === "POST") {
      const workout: Workout = JSON.parse(req.body)
      const result = await post(workout)
      res.status(200).json(result)
    } else {
      res.status(405).end(new Error("Method not allowed"))
    }
  } catch (error) {
    console.error(error)
    res.status(500).end(error)
  }
}

async function get(query: Object) {
  const ref = fb.db.collection("workouts")
  console.log("fetching")
  const formattedQuery = query ? objToFirestoreQuery(ref, query) : ref
  const coll = await formattedQuery.get()
  const workouts = coll.docs.map(item => item.data()) as Workout[]
  console.log(workouts)
  return workouts
}

async function post(workout: Workout) {
  const res = await fb.db.collection("workouts").add(workout)
  workout.id = res.id
  const update = await res.set(workout)
  return workout
}
