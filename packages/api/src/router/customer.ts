import { TRPCError } from "@trpc/server"
import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const updateCustomerSchema = z.object({
  firstName: z.string().min(2, "Имя должно быть не менее 2 символов"),
  lastName: z.string().min(2, "Имя должно быть не менее 2 символов"),
  email: z.string().email(),
  age: z.number().min(18),
  city: z.string().min(2),
  address: z.string().min(2),
  zipCode: z.number().min(2),
  customerUuid: z.string().uuid(),
})

export const customerRouter = createTRPCRouter({
  updateCustomerByUuid: publicProcedure.input(updateCustomerSchema).mutation(async ({ ctx, input }) => {
    const { customerUuid, ...data } = input
    const userData = await ctx.prisma.customer.findUnique({
      where: { uuid: customerUuid },
    })

    if (!userData) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid customer type uuid" })
    }

    const customer = await ctx.prisma.customer.update({
      where: {
        uuid: input.customerUuid,
      },
      data,
    })

    return customer
  }),
})
