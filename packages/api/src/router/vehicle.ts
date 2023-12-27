import { Vehicle } from "@boilerplate/database"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const createVehicleSchema = z.object({
  brand: z.string().min(2),
  model: z.string().min(2),
  year: z
    .number()
    .min(1900)
    .max(new Date().getFullYear() + 1),
  description: z.optional(z.string().min(3)),
  mileage: z.number().min(2),
  licensePlate: z.string().min(1).max(20),
  pricePerDay: z.number().min(1),
  name: z.string().min(3),
  fuelTypeUuid: z.string().uuid(),
  rentalUuid: z.string().uuid(),
})

const buildVehicleName = (vehicle: Vehicle): string => `${vehicle.brand} ${vehicle.model} ${vehicle.year}`

export const vehicleRouter = createTRPCRouter({
  findAllUnitTypes: publicProcedure.input(createVehicleSchema).mutation(async ({ ctx, input }) => {
    const rental = await ctx.prisma.rental.findUnique({
      where: { uuid: input.rentalUuid },
    })

    if (!rental) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid rental uuid" })
    }

    const fuelType = await ctx.prisma.fuelType.findUnique({
      where: { uuid: input.fuelTypeUuid },
    })
    if (!fuelType) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid fuel type uuid" })
    }

    const createdVehicle = await ctx.prisma.vehicle.create({
      data: {
        brand: input.brand,
        model: input.model,
        year: input.year,
        description: input.description,
        mileage: input.mileage,
        licensePlate: input.licensePlate,
        pricePerDay: input.pricePerDay,
        name: input.name,
        fuelType: {
          connect: { id: fuelType.id },
        },
        rental: {
          connect: { id: rental.id },
        },
      },
    })

    return {
      ...createdVehicle,
      name: buildVehicleName(createdVehicle),
    }
  }),
})
