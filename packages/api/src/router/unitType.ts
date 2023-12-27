import { createTRPCRouter, publicProcedure } from "../trpc"

export const unitTypeRouter = createTRPCRouter({
  findAllUnitTypes: publicProcedure.query(async ({ ctx }) => {
    const allUnitTypes = await ctx.prisma.unitType.findMany()

    return allUnitTypes
  }),
})
