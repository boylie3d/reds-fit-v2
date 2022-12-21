import { HStack } from "@chakra-ui/react"
import { useEffect, useState } from "react"

const base64ToUint8Array = (base64: any) => {
  const padding = "=".repeat((4 - (base64.length % 4)) % 4)
  const b64 = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(b64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function PushSubscriber({}) {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(
    null,
  )
  const [registration, setRegistration] =
    useState<ServiceWorkerRegistration | null>(null)

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      "serviceWorker" in navigator
      // && window.workbox !== undefined
    ) {
      // run only in browser
      console.log("hi")
      navigator.serviceWorker.ready.then(reg => {
        console.log("made it")
        reg.pushManager.getSubscription().then(sub => {
          if (
            sub &&
            !(
              sub.expirationTime &&
              Date.now() > sub.expirationTime - 5 * 60 * 1000
            )
          ) {
            setSubscription(sub)
            setIsSubscribed(true)
          }
        })
        setRegistration(reg)

        self.addEventListener("push", function (event: any) {
          console.log(event)
          const data = JSON.parse(event.data.text())
          console.log(data)
          event.waitUntil(
            reg.showNotification(data.title, {
              body: data.message,
              icon: "/icon.png",
            }),
          )
        })
      })
    }
  }, [])

  const subscribeButtonOnClick = async (event: any) => {
    console.log(registration)
    if (!registration) return

    event.preventDefault()
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY,
      ),
    })
    console.log(sub)
    // TODO: you should call your API to save subscription data on server in order to send web push notification from server
    setSubscription(sub)
    setIsSubscribed(true)
    console.log("web push subscribed!")
    console.log(sub)
  }

  const sendNotificationButtonOnClick = async (event: any) => {
    event.preventDefault()
    if (subscription == null) {
      console.error("web push not subscribed")
      return
    }

    await fetch("/api/notification", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        subscription,
      }),
    })
  }

  return (
    <HStack spacing={10}>
      <button onClick={subscribeButtonOnClick} disabled={isSubscribed}>
        Subscribe
      </button>
      <button onClick={sendNotificationButtonOnClick} disabled={!isSubscribed}>
        Send Notification
      </button>
    </HStack>
  )
}
