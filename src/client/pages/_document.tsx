import React from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import {CssBaseline} from '@nextui-org/react';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      // eslint-disable-next-line react/jsx-no-useless-fragment
      styles: <>{initialProps.styles}</>,
    };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {CssBaseline.flush()}
          <title>Stripe Demo</title>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
