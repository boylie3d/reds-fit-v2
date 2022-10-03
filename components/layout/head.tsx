import Head from "next/head"

export interface HeadProps {
  title: string
}

export default function PageHead({ title }: HeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content="Making Scoro kinda ok! Ish!" />
      <link rel="icon" href="/favicon.png" />
    </Head>
  )
}
