import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head />
      <body className="max-w-screen max-h-screen bg-darkNeutral flex text-neutral">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}