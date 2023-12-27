import { Limiter } from "@boilerplate/ui"
import { useLoaderData } from "@remix-run/react"
import { LoaderFunctionArgs, redirect } from "@vercel/remix"
import { Banner1, Choose, Download, Faq, Hero, Pick, Plan, Testimonials } from "~/components"
import { Booking } from "~/components/Booking"
import { trpcSsrClient } from "~/lib/providers/TRPCProvider"
import { FlashType, getFlashSession } from "~/services/session/flash.server"

export const headers = () => {
  return {
    "Cache-Control": "max-age=3600, s-maxage=86400",
  }
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const confirmOrderToken = url.searchParams.get("confirm-order")

  if (confirmOrderToken) {
    const isConfirmed = await trpcSsrClient.bookCar.confirmCarOrder.query({ payload: confirmOrderToken })

    if (isConfirmed) {
      url.searchParams.delete("confirm-order")
      const { createFlash } = await getFlashSession(request)

      return redirect(url.toString(), {
        headers: {
          "Set-Cookie": await createFlash(FlashType.Info, "You have left a rental application, a manager will contact you"),
        },
      })
    }
  }

  const bookCars = await trpcSsrClient.bookCar.bookCar.query()
  return bookCars
}

export default function Home() {
  const data = useLoaderData<typeof loader>()
  return (
    <>
      <Limiter>
        <Hero />
      </Limiter>
      <Limiter className="py-16">
        <Booking vehicles={data.vehicles} locations={data.locations} />
      </Limiter>
      <Limiter>
        <Plan />
      </Limiter>
      <Limiter>
        <Pick />
      </Limiter>
      <Limiter>
        <Banner1 />
      </Limiter>
      <Limiter>
        <Choose />
      </Limiter>
      <Limiter>
        <Testimonials />
      </Limiter>
      <Limiter className="!px-0">
        <Faq />
      </Limiter>
      <Limiter>
        <Download />
      </Limiter>
    </>
  )
}
