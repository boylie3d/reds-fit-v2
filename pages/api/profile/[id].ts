import type { NextApiRequest, NextApiResponse } from "next"
import { Profile } from "../../../types/profile"

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Profile | string>,
) {
  res.status(200).json("")
}
