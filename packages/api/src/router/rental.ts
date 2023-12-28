import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const postCreateRentalSchema = z.object({
  name: z.string().min(3),
  unitTypeUuid: z.string().uuid(),
})
export const postUpdateRentalSchema = z.object({
  name: z.string().min(3),
  unitTypeUuid: z.string().uuid(),
  rentalTypeUuid: z.string().uuid(),
})

export const rentalRouter = createTRPCRouter({
  createRental: publicProcedure.input(postCreateRentalSchema).mutation(async ({ ctx, input }) => {
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
  updateRental: publicProcedure.input(postUpdateRentalSchema).mutation(async ({ ctx, input }) => {
    const unitType = await ctx.prisma.unitType.findUnique({
      where: { uuid: input.unitTypeUuid },
    })
    if (!unitType) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid unit type uuid" })
    }
    const rentalData = await ctx.prisma.rental.findUnique({
      where: { uuid: input.rentalTypeUuid },
    })
    if (!rentalData) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid rental type uuid" })
    }

    const rental = await ctx.prisma.rental.update({
      where: {
        uuid: input.rentalTypeUuid,
      },
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
