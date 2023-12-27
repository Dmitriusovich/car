import { TRPCError } from "@trpc/server"
import { randomBytes } from "node:crypto"
import { promisify } from "node:util"
import { z } from "zod"

import { SMTP_USERNAME } from "../lib/config"
import { createAuthToken, decodeAuthToken } from "../lib/jwt"
import { mailer } from "../lib/mailer"
import { comparePasswords, hashPassword } from "../lib/password"
import { sendResetPasswordEmail } from "../services/user/user.mailer"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const managerSchema = z.object({
  email: z.string().email(),
  name: z.string().min(2),
  password: z.string().min(2),
})
export const loginSchema = managerSchema.pick({ email: true, password: true })
export const registerSchema = managerSchema
  .pick({
    email: true,
    password: true,
    name: true,
  })
  .merge(z.object({ rentalUuid: z.string() }))
export const activateManagerSchema = z.object({ uuid: z.string().min(2), token: z.string().min(2) })
export const checkAuthorizationSchema = z.object({ uuid: z.string() })
export const forgotPasswordSchema = managerSchema.pick({ email: true })
export const resetPasswordSchema = managerSchema.pick({ password: true }).merge(z.object({ token: z.string() }))

export const authRouter = createTRPCRouter({
  login: publicProcedure.input(loginSchema).mutation(async ({ ctx, input }) => {
    const manager = await ctx.prisma.rentalManager.findUnique({
      where: { email: input.email },
      include: {
        rental: true,
      },
    })
    if (!manager) throw new TRPCError({ code: "BAD_REQUEST", message: "Incorrect email or password" })
    const isSamePassword = await comparePasswords(input.password, manager.password)
    if (!isSamePassword) throw new TRPCError({ code: "BAD_REQUEST", message: "Incorrect email or password" })
    const token = createAuthToken({ id: manager.uuid })
    return { manager, token }
  }),
  register: publicProcedure.input(registerSchema).mutation(async ({ ctx, input }) => {
    // const rentalManagerCount = await ctx.prisma.rentalManager.count()
    // if (rentalManagerCount >= 1) {
    //   throw new TRPCError({ code: "FORBIDDEN", message: "It is not possible to register more than one rental manager" })
    // }

    const { rentalUuid, password, ...data } = input
    const rental = await ctx.prisma.rental.findUnique({
      where: { uuid: rentalUuid },
    })

    if (!rental) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid rental uuid" })
    }

    const randomBytesAsync = promisify(randomBytes)
    const activationToken = (await randomBytesAsync((32 * 6) / 8)).toString("base64url")
    const activationTokenExpiration = new Date(Date.now() + 1000 * 60 * 60 * 24)
    const hashedPassword = await hashPassword(password)

    const createdRentalManager = await ctx.prisma.rentalManager.create({
      data: {
        ...data,
        password: hashedPassword,
        activationToken,
        activationTokenExpiration,
        rental: {
          connect: { id: rental.id },
        },
      },
      include: {
        rental: true,
      },
    })
    const token = createAuthToken({ id: createdRentalManager.uuid })

    await mailer.send({
      to: createdRentalManager.email,
      from: `Car rental <${SMTP_USERNAME}>`,
      subject: `[${createdRentalManager.rental.name}] Rental manager account verifictation`,
      text: `Hi, ${createdRentalManager.name}! Activation token: '${createdRentalManager.activationToken}', expires in 24 hours.`,
      html: `Hi, ${createdRentalManager.name}! Activation token: '${createdRentalManager.activationToken}', expires in 24 hours.`,
    })

    return { manager: createdRentalManager, token }
  }),

  activateManager: publicProcedure.input(activateManagerSchema).mutation(async ({ ctx, input }) => {
    const rentalManager = await ctx.prisma.rentalManager.findUnique({
      where: { uuid: input.uuid },
    })
    if (!rentalManager) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Rental manager not found" })
    }

    if (rentalManager.active || !rentalManager.activationToken || !rentalManager.activationTokenExpiration) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Rental manager already activated" })
    }
    if (rentalManager.activationToken !== input.token) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid activation token" })
    }
    if (new Date() > rentalManager.activationTokenExpiration) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Activation token expired" })
    }

    const activatedRentalManager = await ctx.prisma.rentalManager.update({
      where: { uuid: input.uuid },
      data: {
        active: true,
        activationToken: null,
        activationTokenExpiration: null,
      },
      include: {
        rental: true,
      },
    })
    await mailer.send({
      to: activatedRentalManager.email,
      from: `Car rental <${SMTP_USERNAME}>`,
      subject: `[${activatedRentalManager.rental.name}] Rental manager account activated`,
      text: `Hi, ${activatedRentalManager.name}! Your account has been activated. You can now log in to your account.`,
      html: `Hi, ${activatedRentalManager.name}! Your account has been activated. You can now log in to your account.`,
    })

    return { manager: activatedRentalManager }
  }),

  forgotPassword: publicProcedure.input(forgotPasswordSchema).mutation(async ({ ctx, input }) => {
    const manager = await ctx.prisma.rentalManager.findUnique({ where: { email: input.email } })
    if (!manager) return
    const token = createAuthToken({ id: manager.uuid })
    await sendResetPasswordEmail(manager, token)
  }),

  resetPassword: publicProcedure.input(resetPasswordSchema).mutation(async ({ ctx, input }) => {
    const payload = decodeAuthToken(input.token)
    const hashedPassword = await hashPassword(input.password)
    await ctx.prisma.rentalManager.update({ where: { uuid: payload.id }, data: { password: hashedPassword } })
  }),

  checkAuthorization: publicProcedure.input(checkAuthorizationSchema).query(async ({ ctx, input }) => {
    const manager = await ctx.prisma.rentalManager.findUnique({ where: { uuid: input.uuid }, select: { uuid: true } })
    if (!manager) return false
    return true
  }),
})
