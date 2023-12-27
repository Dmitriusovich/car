import { Limiter } from "@boilerplate/ui"
import { Banner2, TopSection, VehiclesList } from "~/components"

export default function VehiclesHome() {
  return (
    <Limiter className="!px-0">
      <TopSection name="Автомобили" />
      <VehiclesList />
      <Banner2 />
    </Limiter>
  )
}
