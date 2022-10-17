import { Fistbump } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"
import { objToFirestoreQuery } from "util/query"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Fistbump | Fistbump[] | null | Error>,
) {
  const { id } = req.query

  if (!id || Array.isArray(id))
    return res
      .status(400)
      .end("Bad request. ID parameter cannot be an array of IDs.")

  try {
    switch (req.method) {
      case "GET":
        delete req.query.id
        const getReq = await get(id, req.query)
        res.status(200).json(getReq)
        break
      case "POST":
        const postReq = JSON.parse(req.body) as Fistbump
        const resp = await post(id, postReq)
        res.status(200).json(resp)
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

async function get(id: string, query: Object) {
  const ref = await fb.db.collection(`results/${id}/fistbumps`)
  const formattedQuery = query ? objToFirestoreQuery(ref, query) : ref
  const collection = await formattedQuery.get()

  const results = collection.docs.map(item => item.data()) as Fistbump[]

  return results
}

async function post(id: string, fistbump: Fistbump) {
  const res = await fb.db.collection(`results/${id}/fistbumps`).add(fistbump)

  fistbump.id = res.id
  const update = await res.set(fistbump)
  return fistbump
}
