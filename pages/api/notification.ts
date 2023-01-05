import type { NextApiRequest, NextApiResponse } from "next"
const webPush = require("web-push")

webPush.setVapidDetails(
  `mailto:${process.env.WEB_PUSH_EMAIL}`,
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY,
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method == "POST") {
    const { subscription } = req.body
    console.log(subscription)
    const push = await webPush.sendNotification(
      subscription,
      JSON.stringify({
        title: "Hello Web Push",
        message: "Your web push notification is here!",
      }),
    )
    console.log(push)
    res.writeHead(push.statusCode, push.headers).end(push.body)
    // .then((response: any) => {
    //   res.writeHead(response.statusCode, response.headers).end(response.body)
    // })
    // .catch((err: any) => {
    //   if ("statusCode" in err) {
    //     res.writeHead(err.statusCode, err.headers).end(err.body)
    //   } else {
    //     console.error(err)
    //     res.statusCode = 500
    //     res.end()
    //   }
    // })
  } else {
    res.statusCode = 405
    res.end()
  }
}
