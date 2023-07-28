import {
  chainMatch,
  isPageRequest,
  csp,
  strictDynamic,
  strictInlineStyles,
} from "@next-safe/middleware";

const securityMiddleware = [
  csp({
    // your CSP base configuration with IntelliSense
    // single quotes for values like 'self' are automatic
    directives: {
      // "img-src": ["self", "data:", "https://images.unsplash.com"],
      // "font-src": ["self", "https://fonts.gstatic.com"],
      "style-src": ["self", "unsafe-inline"],
    },
  }),
  strictDynamic(),
  strictInlineStyles(),
];

export default chainMatch(isPageRequest)(...securityMiddleware);
