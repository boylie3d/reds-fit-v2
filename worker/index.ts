declare var self: ServiceWorkerGlobalScope

self.addEventListener("push", function (event: any) {
  const data = JSON.parse(event.data.text())
  event.waitUntil(
    registration.showNotification(data.title, {
      body: data.message,
      icon: "/icons/android-chrome-192x192.png",
    }),
  )
})

export {}
