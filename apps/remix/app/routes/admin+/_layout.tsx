import { join } from "@boilerplate/shared"
import { NavLink, Outlet, useLoaderData } from "@remix-run/react"
import { json, type LoaderFunctionArgs } from "@vercel/remix"
import { getCurrentManager } from "~/services/auth/auth.server"
import { useTheme } from "~/lib/theme"
import { Footer } from "~/components"
import { Limiter } from "@boilerplate/ui"
import Navbar from "~/components/NavBar"

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const manager = await getCurrentManager(request)
  return json(manager)
}

export default function AdminLayout() {
  const manager = useLoaderData<typeof loader>()

  const theme = useTheme()
  const isDark = theme === "dark"
  return (
    <div>
      <div className="border-b border-solid border-gray-50 dark:border-gray-700">
        <Navbar isAuth={!!manager} isDark={isDark} />
      </div>
      <Limiter>
        <div className="flex gap-12 py-8">
          <ul className="flex flex-col gap-2 text-lg font-bold">
            <li>
              <NavLink end to="/admin" className={({ isActive }) => join("", isActive && "text-primary-500")}>
                Аренда
              </NavLink>
            </li>
            <li>
              <NavLink to="managers" className={({ isActive }) => join("", isActive && "text-primary-500")}>
                Менеджеры
              </NavLink>
            </li>
            <li>
              <NavLink to="customers" className={({ isActive }) => join("", isActive && "text-primary-500")}>
                Клиенты
              </NavLink>
            </li>
            <li>
              <NavLink to="location" className={({ isActive }) => join("", isActive && "text-primary-500")}>
                Города
              </NavLink>
            </li>
            <li>
              <NavLink to="rental" className={({ isActive }) => join("", isActive && "text-primary-500")}>
                Прокат
              </NavLink>
            </li>
            <li>
              <NavLink to="unit-type" className={({ isActive }) => join("", isActive && "text-primary-500")}>
                Единицы измерения
              </NavLink>
            </li>
            <li>
              <NavLink to="fuel-type" className={({ isActive }) => join("", isActive && "text-primary-500")}>
                Тип топлива
              </NavLink>
            </li>
          </ul>
          <div className="w-full">
            <Outlet />
          </div>
        </div>
      </Limiter>
    </div>
  )
}
