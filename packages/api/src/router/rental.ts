import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const postCreateRentalSchema = z.object({
  name: z.string().min(3),
  unitTypeUuid: z.string().uuid(),
})

export const rentalRouter = createTRPCRouter({
  createRental: publicProcedure.input(postCreateRentalSchema).mutation(async ({ ctx, input }) => {
    const rentalCount = await ctx.prisma.rental.count()

    if (rentalCount >= 1) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "It is not possible to create more than one rental" })
    }

    const unitType = await ctx.prisma.unitType.findUnique({
      where: { uuid: input.unitTypeUuid },
    })
    if (!unitType) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid unit type uuid" })
    }

    const rental = await ctx.prisma.rental.create({
      data: {
        name: input.name,
        unitType: {
          connect: { id: unitType.id },
        },
      },
    })

    return rental
  }),
  allRentals: publicProcedure.query(async ({ ctx }) => {
    const rentals = await ctx.prisma.rental.findMany()

    return rentals
  }),
})
