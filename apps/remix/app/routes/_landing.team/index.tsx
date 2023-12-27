import { Limiter } from "@boilerplate/ui"
import { Banner2, Crew, TopSection } from "~/components"

export default function TeamHome() {
  return (
    <Limiter className="!px-0">
      <TopSection name="Наша команда" />
      <Crew />
      <Banner2 />
    </Limiter>
  )
}
