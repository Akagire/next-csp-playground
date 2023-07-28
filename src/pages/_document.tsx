import Document, {
  Html, Main,
  // Head, NextScript,
  type DocumentContext
} from 'next/document'
import {
  getCspInitialProps, provideComponents,
} from "@next-safe/middleware/dist/document";

export default class MyDocument extends Document {
  static getInitialProps(ctx: DocumentContext) {
    // const initialProps = await getCspInitialProps({ ctx });
    // return initialProps;
    return getCspInitialProps({ ctx }).then((initialProps) => initialProps);
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
