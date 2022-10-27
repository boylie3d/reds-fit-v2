import { Fistbump } from "@/types"
import type { NextApiRequest, NextApiResponse } from "next"
import firebaseAdmin from "util/firebaseAdmin"

const fb = firebaseAdmin

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Fistbump[] | Error>,
) {
  switch (req.method) {
    case "GET":
      const result = await get()
      res.status(200).json(result)
      break
    default:
      res.status(405).end(new Error("Method not allowed"))
  }
}

export async function get() {
  const ref = fb.db.collectionGroup("results")
  const response = await ref.get()

  const promises: Promise<Fistbump[]>[] = []

  response.docs.forEach(d => {
    const nRef = fb.db.collection(`results/${d.id}/fistbumps`)
    const promise: Promise<Fistbump[]> = new Promise(
      (resolve: any, reject: any) => {
        nRef.get().then(resp => {
          const fistbumps = resp.docs.map(fb => fb.data() as Fistbump)
          resolve(fistbumps)
        })
      },
    )
    promises.push(promise)
  })

  const result = await Promise.allSettled(promises)
  const allValues = (
    result.filter(c => c.status === "fulfilled") as PromiseFulfilledResult<
      Fistbump[]
    >[]
  )
    .map(c => c.value)
    .flat()

  // console.log({ allValues })
  // const results = response.docs.map(item => item.data()) as Fistbump[]
  return allValues
}
