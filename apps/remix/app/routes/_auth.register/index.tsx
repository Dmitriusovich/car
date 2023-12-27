import { Select } from "@boilerplate/ui"
import { Link, useLoaderData } from "@remix-run/react"
import { TRPCClientError } from "@trpc/client"
import type { ActionFunctionArgs, LoaderFunctionArgs, MetaFunction } from "@vercel/remix"
import { redirect } from "@vercel/remix"
import { z } from "zod"

import { Form, FormButton, FormError, FormField } from "~/components/Form"
import { formError, validateFormData } from "~/lib/form"
import { trpcSsrClient } from "~/lib/providers/TRPCProvider"
import { badRequest } from "~/lib/remix"
import { FlashType, getFlashSession } from "~/services/session/flash.server"
import { getUserSession } from "~/services/session/session.server"

export const meta: MetaFunction = () => {
  return [{ title: "Register" }, { name: "description", content: "Sign up to the boilerplate" }]
}
export const headers = () => {
  return {
    "Cache-Control": "max-age=3600, s-maxage=86400",
  }
}

enum RegisterActions {
  Register = "Register",
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const rentals = await trpcSsrClient.rental.allRentals.query()
  return rentals
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const action = formData.get("_action") as RegisterActions | undefined

  const { createFlash } = await getFlashSession(request)
  switch (action) {
    case RegisterActions.Register:
      try {
        if (formData.get("passwordConfirmation")) return redirect("/")
        const registerSchema = z.object({
          email: z.string().min(3).email("Invalid email"),
          password: z.string().min(8, "Must be at least 8 characters"),
          name: z.string().min(2, "Must be at least 2 characters"),
          rentalUuid: z.string(),
        })
        const result = await validateFormData(registerSchema, formData)
        if (!result.success) return formError(result)
        const data = result.data
        const { manager } = await trpcSsrClient.auth.register.mutate(data)
        const { setUser } = await getUserSession(request)
        const { createFlash } = await getFlashSession(request)
        const headers = new Headers([
          ["Set-Cookie", await setUser(manager.uuid)],
          ["Set-Cookie", await createFlash(FlashType.Info, `Welcome to the rental car, ${data.name}!`)],
        ])
        return redirect("/", { headers })
      } catch (error) {
        if (error instanceof TRPCClientError) return formError({ formError: error.message })
        return badRequest(error, {
          headers: { "Set-Cookie": await createFlash(FlashType.Error, "Register error") },
        })
      }
    default:
      break
  }
}

export default function Register() {
  const data = useLoaderData<typeof loader>()

  return (
    <div>
      <Form method="post" replace>
        <div className="stack">
          <h1 className="text-4xl font-bold">Register</h1>
          <FormField required label="Email address" name="email" placeholder="valery-pukhnarevich@gmail.com" />
          <FormField required label="Password" name="password" type="password" placeholder="********" />
          <input name="passwordConfirmation" className="hidden" />
          <FormField required label="Name" name="name" placeholder="Valery Pukhnarevich" />
          <FormField
            required
            label="Rental type"
            name="rentalUuid"
            placeholder="Valery Pukhnarevich"
            input={
              <Select>
                {data.map((rental) => (
                  <option key={rental.id} value={rental.uuid}>
                    {rental.name}
                  </option>
                ))}
              </Select>
            }
          />

          <div>
            <FormButton name="_action" value={RegisterActions.Register} className="w-full">
              Register
            </FormButton>
            <FormError />
          </div>

          <div className="flex justify-between">
            <Link to="/login" className="hover:opacity-70">
              Login
            </Link>
            <Link to="/forgot-password" className="hover:opacity-70">
              Forgot password?
            </Link>
          </div>
        </div>
      </Form>
    </div>
  )
}
