import type { ActionFunctionArgs, LoaderFunctionArgs } from "@vercel/remix"
import * as trpcFetch from "@trpc/server/adapters/fetch"

import { appRouter, createContext } from "@boilerplate/api"

function handleRequest(args: LoaderFunctionArgs | ActionFunctionArgs) {
  return trpcFetch.fetchRequestHandler({
    endpoint: "/api/trpc",
    req: args.request,
    router: appRouter,
    createContext,
  })
}
export const loader = async (args: LoaderFunctionArgs) => handleRequest(args)
export const action = async (args: ActionFunctionArgs) => handleRequest(args)
