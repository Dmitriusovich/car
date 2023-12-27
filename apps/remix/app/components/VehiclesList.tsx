import { vehicles } from "../data/AllData"
import { VehiclesModel } from "./VehiclesModel"

export const VehiclesList = () => {
  return (
    <div className="container py-20 mx-auto">
      <div className="grid grid-cols-1 gap-10 p-5 md:grid-cols-2 xl:grid-cols-3">
        {vehicles.map((vehicle) => (
          <VehiclesModel
            image={vehicle.image1}
            brand={vehicle.brand}
            model={vehicle.model}
            price={vehicle.cost}
            door={vehicle.doors}
            transmission={vehicle.transmission}
            fuel={vehicle.fuel}
            line={vehicle.line}
            key={vehicle.id}
          />
        ))}
      </div>
    </div>
  )
}
