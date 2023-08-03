import { NextRequest, NextResponse } from "next/server";
import { v4 as uuid } from 'uuid';
import cspBuilder from 'content-security-policy-builder';

// const isDevEnv = process.env.NODE_ENV !== 'production';

const cspString = (nonce: string): string => {
  return cspBuilder({
    directives: {
      // defaultSrc: ["'self'"],

      // baseUri: ["'self'"],
      // childSrc: ["'self'"],
      // connectSrc: ["'self'"],
      // fontSrc: ["'self'"],
      // formAction: ["'none'"],
      frameAncestors: ["'none'"], // use header instead
      // frameSrc: ["'self'"],
      // imgSrc: ["'self'"],
      // manifestSrc: ["'self'"],
      // mediaSrc: ["'self'"],
      // objectSrc: ["'none'"],
      // prefetchSrc: ["'self'"],
      // scriptSrc: ["'self'", nonce].concat(isDevEnv ? ["'unsafe-eval'", "'unsafe-inline'"] : []),
      // styleSrc: ["'self'", nonce/* , "'unsafe-inline'" */].concat(isDevEnv ? ["'unsafe-eval'"] : []),
      // styleSrcElem: ["'self'"].concat(isDevEnv ? ["'unsafe-inline'"] : []),
      // // upgradeInsecureRequests: !isDevEnv,
      // // workerSrc: ["'self'"],

      reportUri: 'https://example.report-uri.com/r/d/csp/enforce',
    },
  });
};


const csp = (res: NextResponse) => {
  const nonce = `nonce-${Buffer.from(uuid()).toString('base64')}`;

  res.headers.set('Content-Security-Policy', cspString(nonce));
  res.headers.set('x-hogehoge', 'test');
};


export const config = {
  matcher: ['/(.*)'],
};

export const middleware = (req: NextRequest) => {
  console.log('middleware', req.url);
  const res = NextResponse.next();
  csp(res);
  return res;
};
