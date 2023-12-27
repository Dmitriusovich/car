import { Limiter } from "@boilerplate/ui"
import { AboutCompany, Banner2, Plan, TopSection } from "~/components"

export default function AboutHome() {
  return (
    <Limiter className="!px-0">
      <TopSection name="О нас" />
      <AboutCompany />
      <Plan />
      <Banner2 />
    </Limiter>
  )
}
