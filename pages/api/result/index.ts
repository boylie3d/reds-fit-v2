import { Result } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result[] | Result | Error>,
) {
  try {
    if (req.method === "GET") {
      const result = await get()
      res.status(200).json(result)
    } else if (req.method === "POST") {
      const result: Result = JSON.parse(req.body)
      const resp = await post(result)
      res.status(200).json(resp)
    } else {
      res.status(405).end(new Error("Method not allowed"))
    }
  } catch (error) {
    console.error(error)
    res.status(500).end(error)
  }
}

async function get() {
  const ref = fb.db.collection("results")
  const coll = await ref.get()
  const workouts = coll.docs.map(item => item.data()) as Result[]
  return workouts
}

async function post(result: Result) {
  const res = await fb.db.collection("results").add(result)
  result.id = res.id
  const update = await res.set(result)
  return result
}
