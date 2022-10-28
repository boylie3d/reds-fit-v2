import { Result } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Result>,
) {
  const { id } = req.query
}

export async function get(id: string) {
  const ref = await fb.db.doc(`results/${id}`)
  const result = await ref.get()
  const rData = result.data() as Result
  return rData
}
