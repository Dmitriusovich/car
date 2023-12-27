import { Limiter } from "@boilerplate/ui"
import { AdditionalInfo, Banner2, TopSection } from "~/components"

export default function ContactHome() {
  return (
    <Limiter className="!px-0">
      <TopSection name="Контакты" />
      <AdditionalInfo />
      <Banner2 />
    </Limiter>
  )
}
