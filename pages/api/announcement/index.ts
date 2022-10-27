import { Announcement } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"
import { objToFirestoreQuery } from "util/query"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Announcement | Announcement[] | null | Error>,
) {
  try {
    switch (req.method) {
      case "GET":
        delete req.query.id
        const fetchedAnnouncement = await get(req.query)
        res.status(200).json(fetchedAnnouncement)
        break
      case "POST":
        const announcement = JSON.parse(req.body) as Announcement
        const resp = await post(announcement)
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

async function get(query: Object) {
  const ref = await fb.db.collection("announcements")
  const formattedQuery = query ? objToFirestoreQuery(ref, query) : ref
  const collection = await formattedQuery.get()

  const results = collection.docs.map(item => item.data()) as Announcement[]
  return results
}

async function post(announcement: Announcement) {
  const res = await fb.db.collection("announcements").add(announcement)

  announcement.id = res.id
  const update = await res.set(announcement)
  return announcement
}
