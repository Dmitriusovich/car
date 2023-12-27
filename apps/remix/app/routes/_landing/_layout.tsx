import { Limiter } from "@boilerplate/ui"
import { Outlet, useLoaderData } from "@remix-run/react"
import { json, type LoaderFunctionArgs } from "@vercel/remix"
import { Footer } from "~/components"

import Navbar from "~/components/NavBar"
import { useTheme } from "~/lib/theme"
import { getMaybeUser } from "~/services/auth/auth.server"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const user = await getMaybeUser(request)
  return json(user)
}

export default function LandingLayout() {
  const user = useLoaderData<typeof loader>()
  const theme = useTheme()
  const isDark = theme === "dark"
  return (
    <div>
      <div
        style={{
          backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 65 65' width='60' height='60' fill='none' stroke='${
            isDark ? "rgb(50 50 50 / 0.2)" : "rgb(15 23 42 / 0.03)"
          }'%3e%3cpath d='M0 .5H63.5V65'/%3e%3c/svg%3e")`,
        }}
        className="absolute inset-0 z-[-10]"
      />
      <div className="border-b border-solid border-gray-50 dark:border-gray-700">
        <Navbar isAuth={!!user} isDark={isDark} />
      </div>
      <Outlet />
      <Limiter className="pt-16">
        <Footer />
      </Limiter>
    </div>
  )
}
