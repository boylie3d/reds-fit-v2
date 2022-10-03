import { Profile } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile | any>,
) {
  console.log(req.query)
  const { id } = req.query

  res.status(200).json({})
}