import type { NextApiRequest, NextApiResponse } from "next"

interface Data {}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Comment | null | Error>,
) {
  try {
    switch (req.method) {
      case "GET":
        console.log("get")
        break
      default:
        console.log("hi")
        break
    }
  } catch (e) {
    console.error(e)
    res.status(500).end(e)
  }
}
