import { redirect } from "@vercel/remix"

import { type Prisma } from "@boilerplate/database/types"

import { db } from "~/lib/db.server"
import type { Await } from "~/lib/helpers/types"

import { getUserSession } from "../session/session.server"

export async function requireUser(request: Request) {
  const { userId } = await getUserSession(request)
  const url = new URL(request.url)
  if (!userId) throw redirect(`/login${request.method === "GET" ? `?redirectTo=${url.pathname}` : ""}`)
  return userId
}

const userSelectFields = {
  id: true,
  uuid: true,
  email: true,
  name: true,
} satisfies Prisma.RentalManagerSelect

export async function getCurrentManager(request: Request) {
  const userId = await requireUser(request)
  const manager = await db.rentalManager.findFirst({
    where: { uuid: userId },
    select: userSelectFields,
  })
  if (!manager) throw redirect(`/login`)
  return manager
}
export type CurrentManager = Await<typeof getCurrentManager>

export async function getMaybeUser(request: Request) {
  const { userId } = await getUserSession(request)
  if (!userId) return null
  const manager = await db.rentalManager.findFirst({ where: { uuid: userId }, select: userSelectFields })
  if (!manager) return null
  return manager
}
export type MayubeUser = Await<typeof getMaybeUser>
