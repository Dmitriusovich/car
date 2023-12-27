import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const fuelTypeByUuidSchema = z.object({
  uuid: z.string().min(2),
})

export const fuelTypeRouter = createTRPCRouter({
  findAllFuelTypes: publicProcedure.query(async ({ ctx }) => {
    const fuelTypes = await ctx.prisma.fuelType.findMany()
    const fuelTypesWithoutId = fuelTypes.map(({ uuid, name }) => ({
      name,
      uuid,
    }))

    return fuelTypesWithoutId
  }),
  findFuelTypeByUuid: publicProcedure.input(fuelTypeByUuidSchema).query(async ({ ctx, input }) => {
    const fuelTypeId = await ctx.prisma.fuelType.findUnique({
      where: { uuid: input.uuid },
    })

    return fuelTypeId
  }),
})
