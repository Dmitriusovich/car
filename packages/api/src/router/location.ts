import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const createLocationSchema = z.object({
  city: z.string().min(2),
})

export const updateLocationSchema = createLocationSchema.merge(z.object({ locationUuid: z.string().uuid() }))

export const locationRouter = createTRPCRouter({
  createLocation: publicProcedure.input(createLocationSchema).mutation(async ({ ctx, input }) => {
    const createdLocation = await ctx.prisma.location.create({ data: input })
    return createdLocation
  }),
  updateLocationByUuid: publicProcedure.input(updateLocationSchema).mutation(async ({ ctx, input }) => {
    const locationData = await ctx.prisma.location.findUnique({
      where: { uuid: input.locationUuid },
    })

    if (!locationData) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid location type uuid" })
    }

    const location = await ctx.prisma.location.update({
      where: {
        uuid: input.locationUuid,
      },
      data: {
        city: input.city,
      },
    })

    return location
  }),
})
