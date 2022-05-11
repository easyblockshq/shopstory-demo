import Document, { DocumentContext, Html, Head, Main, NextScript } from 'next/document'
import React from 'react'

import { shopstoryGetStyleTag } from '@shopstory/core/dist/client/Shopstory'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return initialProps
  }

  render() {
    return (
      <Html>
        <Head>{shopstoryGetStyleTag()}</Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
