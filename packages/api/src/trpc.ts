import { initTRPC, TRPCError, type inferAsyncReturnType } from "@trpc/server"
import type * as trpcFetch from "@trpc/server/adapters/fetch"
import superjson from "superjson"
import { ZodError } from "zod"

import { prisma, type RentalManager } from "@boilerplate/database"

import { decodeAuthToken } from "./lib/jwt"

export async function createContext({ req }: trpcFetch.FetchCreateContextFnOptions) {
  const headers = new Headers(req.headers)
  const authHeader = headers.get("authorization")
  const token = authHeader?.split("Bearer ")[1]
  let manager: RentalManager | null = null
  if (token) {
    const payload = decodeAuthToken(token)
    manager = await prisma.rentalManager.findUnique({ where: { uuid: payload.id } })
  }
  return { req, prisma, manager }
}
export type Context = inferAsyncReturnType<typeof createContext>

export const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    // TODO: sentry for internal server errors
    // if (error.cause instanceof ZodError) {
    //   console.log(error.cause.format().data.name)
    // }

    return {
      ...shape,
      data: {
        ...shape.data,
        formError: !(error.cause instanceof ZodError)
          ? error.code === "INTERNAL_SERVER_ERROR"
            ? "There was an error processing your request."
            : error.message
          : undefined,
        zodError: error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

export const createTRPCRouter = t.router

export const publicProcedure = t.procedure

const enforceUserIsAuthed = t.middleware(({ ctx, next }) => {
  if (!ctx.manager) throw new TRPCError({ code: "UNAUTHORIZED" })
  return next({ ctx: { manager: ctx.manager } })
})

export const protectedProcedure = t.procedure.use(enforceUserIsAuthed)
