import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const createVehicleEquipmentSchema = z.object({
  key: z.string().min(2),
  value: z.string().min(2),
  vehicleUuid: z.string().uuid(),
  rentalUuid: z.string().uuid(),
})
export const updateVehicleEquipmentSchema = z.object({
  rentalUuid: z.string().uuid(),
  vehicleUuid: z.string().uuid(),
  equipmentUuid: z.string().uuid(),
  key: z.string().min(2),
  value: z.string().min(2),
})
export const deleteVehicleEquipmentSchema = z.object({
  rentalUuid: z.string().uuid(),
  vehicleUuid: z.string().uuid(),
  equipmentUuid: z.string().uuid(),
})

export const vehicleEquipmentRouter = createTRPCRouter({
  createVehicleEquipment: publicProcedure.input(createVehicleEquipmentSchema).mutation(async ({ ctx, input }) => {
    const vehicle = await ctx.prisma.vehicle.findUnique({
      where: {
        uuid: input.vehicleUuid,
      },
      include: {
        rental: true,
      },
    })
    if (!vehicle) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid vehicle uuid" })
    }
    if (vehicle.rental.uuid !== input.rentalUuid) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Not authorized to maintain this vehicle" })
    }

    const vehicleEquipment = await ctx.prisma.vehicleEquipment.create({
      data: {
        key: input.key,
        value: input.value,
        vehicle: {
          connect: {
            id: vehicle.id,
          },
        },
      },
    })

    return vehicleEquipment
  }),

  updateVehicleEquipmentName: publicProcedure.input(updateVehicleEquipmentSchema).mutation(async ({ ctx, input }) => {
    const equipment = await ctx.prisma.vehicleEquipment.findUnique({
      where: {
        uuid: input.equipmentUuid,
      },
      include: {
        vehicle: {
          include: {
            rental: true,
          },
        },
      },
    })

    if (!equipment) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid equipment uuid" })
    }
    if (equipment.vehicle.uuid !== input.vehicleUuid) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid vehicle uuid" })
    }
    if (equipment.vehicle.rental.uuid !== input.rentalUuid) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Not authorized to maintain this vehicle" })
    }

    const vehicleEquipment = await ctx.prisma.vehicleEquipment.update({
      where: {
        uuid: input.equipmentUuid,
      },
      data: {
        key: input.key,
        value: input.value,
      },
    })

    return vehicleEquipment
  }),

  deleteVehicleEquipment: publicProcedure.input(deleteVehicleEquipmentSchema).mutation(async ({ ctx, input }) => {
    const equipment = await ctx.prisma.vehicleEquipment.findUnique({
      where: {
        uuid: input.equipmentUuid,
      },
      include: {
        vehicle: {
          include: {
            rental: true,
          },
        },
      },
    })
    if (!equipment) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid equipment uuid" })
    }
    if (equipment.vehicle.uuid !== input.vehicleUuid) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid vehicle uuid" })
    }
    if (equipment.vehicle.rental.uuid !== input.rentalUuid) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Not authorized to maintain this vehicle" })
    }

    const deleteOperation = await ctx.prisma.vehicleEquipment.delete({
      where: {
        uuid: input.equipmentUuid,
      },
    })

    return deleteOperation
  }),
})
