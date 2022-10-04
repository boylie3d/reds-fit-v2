namespace NodeJS {
  interface ProcessEnv extends NodeJS.ProcessEnv {
    NEXT_PUBLIC_FIREBASE_API_KEY: string
    FIREBASE_PRIVATE_KEY_ID: string
    FIREBASE_PRIVATE_KEY: string
    FIREBASE_CLIENT_EMAIL: string
    FIREBASE_CLIENT_ID: string
  }
}
