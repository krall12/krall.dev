import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body className="bg-gray-900 h-full relative text-white font-mono text-sm">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
