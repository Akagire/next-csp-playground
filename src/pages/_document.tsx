import crypto from 'crypto';
import Document, { DocumentContext, Html, Head, NextScript, Main } from "next/document";
import cspBuilder from 'content-security-policy-builder';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    const res = ctx.res;
    if (!res) {
      // CSR
      return { ...initialProps };
    }

    const a = res.getHeaders()['content-security-policy'];
    console.log('[_document.tsx] content-security-policy', a);

    return { ...initialProps };
  }

  render() {
    const isDevEnv = process.env.NODE_ENV !== 'production';

    const hash = this.cspHashOf(NextScript.getInlineScriptSource(this.props));

    const csp = cspBuilder({
      directives: {
        defaultSrc: ["'self'"],

        // baseUri: ["'self'"],
        // childSrc: ["'self'"],
        // connectSrc: ["'self'"],
        // fontSrc: ["'self'"],
        formAction: ["'none'"],
        // frameAncestors: ["'none'"], // use header instead
        // frameSrc: ["'self'"],
        // imgSrc: ["'self'"],
        // manifestSrc: ["'self'"],
        // mediaSrc: ["'self'"],
        // objectSrc: ["'none'"],
        // prefetchSrc: ["'self'"],
        scriptSrc: ["'self'"].concat(isDevEnv ? ["'unsafe-eval'", "'unsafe-inline'"] : [hash]),
        styleSrc: ["'self'", "'unsafe-inline'"].concat(isDevEnv ? ["'unsafe-eval'"] : []),
        styleSrcElem: ["'self'"].concat(isDevEnv ? ["'unsafe-inline'"] : []),
        // upgradeInsecureRequests: !isDevEnv,
        // workerSrc: ["'self'"],

        // reportUri: 'https://example.report-uri.com/r/d/csp/enforce', use header instead
      },
    });

    console.log({ hash, csp});

    return (
      <Html>
        <Head>
          <link rel="icon" href="/favicon.ico" />
          <meta property="csp-nonce" content={hash} />
          <meta httpEquiv="Content-Security-Policy" content={csp} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }

  // https://github.com/vercel/next.js/tree/canary/examples/with-strict-csp
  private cspHashOf(text: string): string {
    const hash = crypto.createHash('sha256');
    hash.update(text);
    return `'sha256-${hash.digest('base64')}'`;
  }
}
