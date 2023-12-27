import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { RentStatusEnum } from "@boilerplate/database"
import { sendConfirmOrderEmail } from "../services/user/user-confirm.mailer"
import { createAuthToken, decodeAuthToken } from "../lib/jwt"
import { TRPCError } from "@trpc/server"

export const customerCarSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  phoneNumber: z.string().min(2),
  age: z.number().min(18),
  email: z.string().email(),
  address: z.string(),
  city: z.string(),
  zipCode: z.number(),
})
export const rentCarSchema = z.object({
  carType: z.string(),
  pickLocation: z.string(),
  dropLocation: z.string(),
  pickDate: z.string(),
  dropDate: z.string(),
})
export const reserveCarSchema = z.object({
  customer: customerCarSchema,
  rent: rentCarSchema,
})
export const confirmOrderSchema = z.object({
  payload: z.string(),
})

export const bookCarRouter = createTRPCRouter({
  bookCar: publicProcedure.query(async ({ ctx }) => {
    const vehicles = await ctx.prisma.vehicle.findMany({
      include: {
        vehiclePhotos: true,
      },
    })
    const locations = await ctx.prisma.location.findMany()
    return {
      vehicles,
      locations,
    }
  }),
  reserveCar: publicProcedure.input(reserveCarSchema).mutation(async ({ ctx, input }) => {
    const customer = await ctx.prisma.customer.create({ data: input.customer })
    const vehicle = await ctx.prisma.vehicle.findFirst({
      where: { name: input.rent.carType },
    })

    const rent = await ctx.prisma.rent.create({
      data: {
        status: RentStatusEnum.Placed,
        startAt: new Date(input.rent.pickDate),
        endAt: new Date(input.rent.dropDate),
        pickUp: {
          connect: { id: Number(input.rent.pickLocation) },
        },
        dropOff: {
          connect: { id: Number(input.rent.dropLocation) },
        },
        notes: "",
        vehicle: {
          connect: {
            id: vehicle?.id,
          },
        },
        customer: {
          connect: {
            id: customer.id,
          },
        },
      },
    })

    const token = createAuthToken({ id: customer.uuid })
    await sendConfirmOrderEmail(customer, token)

    return {
      customer,
      rent,
    }
  }),
  confirmCarOrder: publicProcedure.input(confirmOrderSchema).query(async ({ ctx, input }) => {
    const payload = decodeAuthToken(input.payload)
    if (!payload.id) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Confirm code is not corrected" })
    }
    const customer = await ctx.prisma.customer.findFirst({
      where: {
        uuid: payload.id,
      },
      include: {
        rent: true,
      },
    })
    if (customer?.rent?.status === RentStatusEnum.Placed) {
      const updatedRent = await ctx.prisma.rent.update({
        where: {
          uuid: customer.rent.uuid,
        },
        data: {
          status: RentStatusEnum.Accepted,
        },
        select: {
          status: true,
        },
      })

      return updatedRent.status === RentStatusEnum.Accepted
    }
    return customer?.rent?.status === RentStatusEnum.Accepted
  }),
})
