import { Fistbump } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"
import { objToFirestoreQuery } from "util/query"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Fistbump | Fistbump[] | null | Error>,
) {
  const { id, fbId } = req.query

  if (!id || Array.isArray(id) || !fbId || Array.isArray(fbId))
    return res
      .status(400)
      .end("Bad request. ID parameter cannot be an array of IDs.")

  try {
    switch (req.method) {
      case "GET":
        const getReq = await queriedGet(id, fbId)
        res.status(200).json(getReq)
        break
      case "DELETE":
        const delReq = await del(id, fbId)
        res.status(200).json(null)
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

async function queriedGet(id: string, query: Object) {
  const ref = await fb.db.collection(`results/${id}/fistbumps`)
  const formattedQuery = query ? objToFirestoreQuery(ref, query) : ref
  const collection = await formattedQuery.get()
  const results = collection.docs.map(item => item.data()) as Fistbump[]

  return results
}

export async function get(id: string) {
  const ref = await fb.db.collection(`fistbumps`).where("resultId", "==", id)
  const collection = await ref.get()
  const results = collection.docs.map(item => item.data()) as Fistbump[]

  return results
}

async function del(id: string, fbId: string) {
  const ref = await fb.db.doc(`fistbumps/${fbId}`).delete()
  return null
}
