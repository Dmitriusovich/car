import { useState } from "react"
import { vehicles } from "../data/AllData"
import { PickTechTable } from "./PickTechTable"

export const Pick = () => {
  const [selectedVehicle, setSelectedVehicle] = useState(vehicles[0])
  const [activeButtonId, setActiveButtonId] = useState(vehicles[0].id)

  const handleButtonClick = (id: number) => {
    const selected = vehicles.find((vehicle) => vehicle.id === id)
    if (selected) {
      setSelectedVehicle(selected)
      setActiveButtonId(id)
    }
  }
  return (
    <div className="flex justify-center">
      <div className="container py-20">
        <div className="text-center">
          <h3 className="text-2xl font-semibold">Модели автомобилей</h3>
          <h2 className="py-5 text-5xl font-semibold">
            Наш <span className="text-primary-600">арендный</span> парк
          </h2>
          <p className="py-3 text-gray2">
            Выбирайте из множества наших замечательных автомобилей, чтобы арендовать их для вашего следующего приключения или
            деловой поездки.
          </p>
        </div>

        <div className="pt-10 lg:flex">
          <div className="flex flex-col justify-between gap-3">
            {vehicles.map((vehicle) => (
              <button
                className={`whitespace-nowrap px-6 py-4 text-left text-xl  font-medium transition-colors duration-300 hover:bg-orange hover:text-white ${
                  activeButtonId === vehicle.id
                    ? "bg-[#ff5337] dark:bg-[#ff5337] text-white"
                    : "bg-gray3 dark:bg-[#ffedea] dark:text-black"
                }`}
                key={vehicle.id}
                onClick={() => handleButtonClick(vehicle.id)}
              >
                {vehicle.brand} {vehicle.model}
                {vehicle.line ? " " + vehicle.line : ""}
              </button>
            ))}
          </div>

          <div className="flex flex-col items-center gap-5 py-10 md:w-full md:flex-row md:justify-between lg:justify-end lg:gap-0 lg:py-0">
            <div className="flex justify-center px-5 lg:w-full lg:px-10 2xl:px-16">
              <img src={selectedVehicle.image2} alt="selected car" />
            </div>

            <PickTechTable
              cost={selectedVehicle.cost + " "}
              brand={selectedVehicle.brand}
              model={selectedVehicle.model}
              year={selectedVehicle.year}
              doors={selectedVehicle.doors}
              ac={selectedVehicle.ac}
              transmission={selectedVehicle.transmission}
              fuel={selectedVehicle.fuel}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
