const { flatRoutes } = require("remix-flat-routes")

/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  cacheDirectory: "./node_modules/.cache/remix",
  browserNodeBuiltinsPolyfill: { modules: { events: true } },
  ignoredRouteFiles: ["**/*"],
  serverDependenciesToBundle: [
    "@boilerplate/api",
    "@boilerplate/database",
    "@boilerplate/database/types",
    "@boilerplate/emails",
    "@boilerplate/shared",
    "@boilerplate/tailwind-config",
    "@boilerplate/ui",
    "axios",
    "decode-uri-component",
    "filter-obj",
    "query-string",
    "split-on-first",
    "superjson",
  ],
  serverModuleFormat: "cjs",
  watchPaths: ["../../packages/**/*"],
  routes: (defineRoutes) => {
    return flatRoutes("routes", defineRoutes)
  },
}
