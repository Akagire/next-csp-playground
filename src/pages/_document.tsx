import Document, { Html, Main, type DocumentContext } from 'next/document'
import {
  getCspInitialProps, provideComponents,
} from "@next-safe/middleware/dist/document";

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await getCspInitialProps({ ctx });
    return initialProps;
  }

  render() {
    const { Head, NextScript } = provideComponents(this.props);
    return (
      <Html lang="ja">
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
