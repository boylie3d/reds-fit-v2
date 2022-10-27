import { Announcement } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Announcement | null>,
) {
  const { id } = req.query
  if (!id || Array.isArray(id))
    return res
      .status(400)
      .end("Bad request. ID parameter cannot be an array of IDs.")

  try {
    switch (req.method) {
      case "GET":
        const fetchedAnnouncement = await get(id)
        res.status(200).json(fetchedAnnouncement)
        break
      case "PUT":
        const announcement = JSON.parse(req.body) as Announcement
        const resp = await put(id, announcement)
        res.status(200).json(resp)
        break
      case "DELETE":
        const d = await del(id)
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

export async function get(id: string) {
  const ref = fb.db.collection("announcements").doc(id)
  const doc = await ref.get()
  return doc.data() as Announcement
}

async function put(id: string, announcement: Announcement) {
  const ref = fb.db.collection("announcements").doc(id)
  await ref.set(announcement, { merge: true })
  return announcement
}

async function del(id: string) {
  const ref = fb.db.collection("announcements").doc(id)
  await ref.delete()
  return null
}
