import { Limiter } from "@boilerplate/ui"
import { Banner2, Testimonials, TopSection } from "~/components"

export default function TestimonialsHome() {
  return (
    <Limiter className="!px-0">
      <TopSection name="Отзывы" />
      <Testimonials />
      <Banner2 />
    </Limiter>
  )
}
