import { Button, IconButton, Limiter } from "@boilerplate/ui"
import { Link, useFetcher, useSubmit } from "@remix-run/react"
import { Moon, Sun } from "lucide-react"
import { ReactElement, useEffect, useState } from "react"

import { LinkButton } from "./LinkButton"
import { NavLink } from "./NavLink"

interface INavbarProps {
  isDark: boolean
  isAuth: boolean
}

const Navbar = ({ isDark, isAuth }: INavbarProps): ReactElement => {
  const [isMenuActive, setIsMenuActive] = useState(false)
  const themeFetcher = useFetcher()
  const logoutSubmit = useSubmit()

  const handleClick = () => {
    setIsMenuActive(!isMenuActive)
  }

  useEffect(() => {
    if (isMenuActive === true) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isMenuActive])

  return (
    <Limiter className="bg-white dark:bg-gray-800 dark:bg-opacity-50 bg-opacity-5 relative z-20">
      <nav className="flex items-center justify-between py-5 align-middle">
        <div className="hstack h-12 space-x-6">
          <Link to="/">
            <div className="hstack">
              <p className="text-xl font-semibold">RentalCar</p>
            </div>
          </Link>
        </div>

        <div
          className={`fixed z-[99] flex h-screen flex-col items-center justify-center overflow-hidden transition-all duration-500 ${
            isMenuActive ? "w-full " : "w-0"
          }`}
        >
          <div className="absolute right-10 top-10 cursor-pointer transition-colors hover:text-primary-600" onClick={handleClick}>
            <svg
              className="w-8"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </div>
          <ul className="flex flex-col items-center gap-7 text-2xl">
            <NavLink to={"/"}>Главная</NavLink>
            <NavLink to={"/about"}>О нас</NavLink>
            <NavLink to={"/vehicles"}>Автомобили</NavLink>
            <NavLink to={"/testimonials"}>Отзывы</NavLink>
            <NavLink to={"/team"}>Наша команда</NavLink>
            <NavLink to={"/contact"}>Контакты</NavLink>
          </ul>
        </div>
        <div className="container flex items-center justify-between font-medium">
          <NavLink to={"/"}>
            {/* <div className="w-36">
            <img src={logo} alt="logo" />
          </div> */}
          </NavLink>
          <ul className="hidden gap-6 px-5 lg:flex">
            <NavLink to={"/"}>Главная</NavLink>
            <NavLink to={"/about"}>О нас</NavLink>
            <NavLink to={"/vehicles"}>Автомобили</NavLink>
            <NavLink to={"/testimonials"}>Отзывы</NavLink>
            <NavLink to={"/team"}>Наша команда</NavLink>
            <NavLink to={"/contact"}>Контакты</NavLink>
          </ul>
          <div className="flex gap-5">
            {/* <button className="my-auto hidden h-fit rounded transition-colors hover:text-primary-600 lg:block">Sign In</button>
          <button className="hidden rounded bg-orange px-6 py-3 text-white shadow-lg shadow-orangeShadow transition-all duration-300 hover:opacity-80 lg:block">
            Register
          </button> */}
            <div className="hstack hidden md:flex">
              <themeFetcher.Form action="/api/theme" method="post">
                <input type="hidden" name="theme" value={isDark ? "light" : "dark"} />
                <IconButton
                  type="submit"
                  aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
                  variant="ghost"
                  icon={isDark ? <Sun className="sq-4" /> : <Moon className="sq-4" />}
                />
              </themeFetcher.Form>
              {isAuth ? (
                <Button variant="outline" onClick={() => logoutSubmit(null, { method: "post", action: "/logout" })}>
                  Выход
                </Button>
              ) : (
                <div className="hstack">
                  <LinkButton variant="ghost" to="/login">
                    Вход
                  </LinkButton>
                  <LinkButton colorScheme="primary" to="/register">
                    Регистрация
                  </LinkButton>
                </div>
              )}
            </div>
            <div
              className="my-auto mr-5 w-10 cursor-pointer text-black transition-all duration-300 ease-in-out hover:text-primary-600 lg:hidden"
              onClick={handleClick}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </div>
          </div>
        </div>
        {/* <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <IconButton
                  className="inline-block md:hidden"
                  aria-label={`Toggle open menu`}
                  icon={<Menu className="sq-5" />}
                  variant="ghost"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent side="bottom" align="end" className="inline-block md:hidden">
                {user ? (
                  <DropdownMenuItem asChild>
                    <Button variant="ghost" onClick={() => logoutSubmit(null, { method: "post", action: "/logout" })}>
                      Log out
                    </Button>
                  </DropdownMenuItem>
                ) : (
                  <>
                    <DropdownMenuItem asChild>
                      <Link to="/register">Register</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/login">Login</Link>
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu> */}
      </nav>
    </Limiter>
  )
}

export default Navbar
