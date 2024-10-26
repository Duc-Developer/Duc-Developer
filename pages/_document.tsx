import { Html, Head, Main, NextScript } from 'next/document'
 
export default function Document() {
  return (
    <Html>
      <Head />
      <body className="max-w-screen max-h-screen bg-black100 flex text-white100">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}