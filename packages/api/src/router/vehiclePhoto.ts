import { Prisma, Rental, Vehicle, VehiclePhoto } from "@boilerplate/database"
import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const updateVehiclePhotoPositionSchema = z.object({
  position: z.number().min(0),
  vehicleUuid: z.string().uuid(),
  rentalUuid: z.string().uuid(),
  photoUuid: z.string().uuid(),
})
export const deleteVehiclePhotoSchema = z.object({
  vehicleUuid: z.string().uuid(),
  rentalUuid: z.string().uuid(),
  photoUuid: z.string().uuid(),
})

export const POSITION_OFFSET = 65536
export const POSITION_GAP = 256

export const vehiclePhotoRouter = createTRPCRouter({
  updateVehiclePhotoPosition: publicProcedure.input(updateVehiclePhotoPositionSchema).mutation(async ({ ctx, input }) => {
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

    const vehiclePhotos = await ctx.prisma.vehiclePhoto.findMany({
      where: {
        vehicleId: vehicle.id,
      },
      orderBy: {
        position: "asc",
      },
    })

    const currentIndex = vehiclePhotos.findIndex((photo) => photo.uuid === input.photoUuid)
    if (currentIndex === -1) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid vehicle photo uuid" })
    }

    const targetPhoto = vehiclePhotos[currentIndex]
    const newIndex = input.position
    if (newIndex === currentIndex) {
      return targetPhoto
    }
    if (newIndex >= vehiclePhotos.length) {
      throw new TRPCError({ code: "BAD_REQUEST", message: `body/position must be <= ${vehiclePhotos.length - 1}` })
    }

    let position: number
    if (newIndex === 0) {
      const next = vehiclePhotos[newIndex]
      position = next.position - POSITION_GAP
    } else if (newIndex === vehiclePhotos.length - 1) {
      const prev = vehiclePhotos[newIndex]
      position = prev.position + POSITION_GAP
    } else if (newIndex > currentIndex) {
      const prev = vehiclePhotos[newIndex]
      const next = vehiclePhotos[newIndex + 1]
      position = prev.position + Math.floor(Math.abs(prev.position - next.position) / 2)
    } else {
      const prev = vehiclePhotos[newIndex - 1]
      const next = vehiclePhotos[newIndex]
      position = prev.position + Math.floor(Math.abs(prev.position - next.position) / 2)
    }

    const updatedPhoto = await ctx.prisma.vehiclePhoto.update({
      where: {
        uuid: input.photoUuid,
      },
      data: {
        position,
      },
    })

    return updatedPhoto
  }),

  deleteVehiclePhoto: publicProcedure.input(deleteVehiclePhotoSchema).mutation(async ({ ctx, input }) => {
    await ctx.prisma.$transaction(async (tx) => {
      let photoEntityToDelete: VehiclePhoto & {
        vehicle: Vehicle & {
          rental: Rental
        }
      }
      try {
        photoEntityToDelete = await tx.vehiclePhoto.delete({
          where: {
            uuid: input.photoUuid,
          },
          include: {
            vehicle: {
              include: {
                rental: true,
              },
            },
          },
        })
      } catch (err) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2025") {
          throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid photo uuid" })
        }
        throw err
      }

      if (photoEntityToDelete.vehicle.uuid !== input.vehicleUuid) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid vehicle uuid" })
      }
      if (photoEntityToDelete.vehicle.rental.uuid !== input.rentalUuid) {
        throw new TRPCError({ code: "BAD_REQUEST", message: "Not authorized to maintain this vehicle's photos" })
      }
    })

    return true
  }),
})
