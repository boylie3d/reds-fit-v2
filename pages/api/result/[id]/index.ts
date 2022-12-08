import { Result } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result | { error: any } | { status: any }>,
) {
  // if (!["GET", "DELETE", "PUT"].includes(req.method as string)) {
  //   return res
  //     .status(405)
  //     .json({ error: `Method '${req.method}' not allowed.` })
  // }

  const { id } = req.query
  switch (req.method) {
    case "DELETE":
      try {
        await del(id as string)
        res.status(200).json({ status: "entry deleted" })
      } catch (err) {
        res.status(500).json({ error: err })
      }
      break
    case "PUT":
      const result = JSON.parse(req.body) as Result
      const resp = await put(id as string, result)
      res.status(200).json(resp)
      break
    default:
      return res
        .status(405)
        .json({ error: `Method '${req.method}' not allowed.` })
      break
  }
}

async function put(id: string, result: Result) {
  const ref = await fb.db.doc(`/results/${id}`)
  const res = await ref.update(result)
  return result
}

async function del(id: string) {
  const ref = await fb.db.doc(`/results/${id}`)
  await ref.delete()
}

export async function get(id: string) {
  const ref = await fb.db.doc(`results/${id}`)
  const result = await ref.get()
  const rData = result.data() as Result
  return rData
}
