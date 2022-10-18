import { Comment } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Comment[] | Comment>,
) {
  const { id } = req.query
  if (!id || Array.isArray(id))
    return res
      .status(400)
      .end("Bad request. ID parameter cannot be an array of IDs.")

  console.log(id)
  try {
    switch (req.method) {
      case "GET":
        const getReq = await get(id)
        res.status(200).json(getReq)
        break
      // case "DELETE":
      //   const delReq = await del(id, fbId)
      //   res.status(200).json(null)
      //   break
      case "POST":
        const comment = JSON.parse(req.body) as Comment
        const postedComment = await post(id, comment)
        res.status(200).json(postedComment)
        break
      default:
        res
          .status(500)
          .end(new Error("Valid methods on this endpoint are POST and DELETE"))
        break
    }
  } catch (e) {
    console.error(e)
    res.status(500).end(e)
  }
}

export async function get(id: string) {
  const ref = await fb.db.collection(`results/${id}/comments`)
  const collection = await ref.get()
  const results = collection.docs.map(item => item.data()) as Comment[]

  return results
}

async function post(id: string, comment: Comment) {
  console.log(comment)
  const res = await fb.db.collection(`results/${id}/comments`).add(comment)

  // comment.id = res.id
  // await res.set(comment)
  return comment
}
