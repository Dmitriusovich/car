import { authRouter } from "./router/auth"
import { bookCarRouter } from "./router/bookCar"
import { fuelTypeRouter } from "./router/fuelType"
import { locationRouter } from "./router/location"
import { rentalRouter } from "./router/rental"
import { unitTypeRouter } from "./router/unitType"
import { vehicleRouter } from "./router/vehicle"
import { vehicleEquipmentRouter } from "./router/vehicleEquipment"
import { vehiclePhotoRouter } from "./router/vehiclePhoto"
import { createTRPCRouter } from "./trpc"

export const appRouter = createTRPCRouter({
  auth: authRouter,
  fuelType: fuelTypeRouter,
  rental: rentalRouter,
  unitType: unitTypeRouter,
  vehicle: vehicleRouter,
  vehicleEquipment: vehicleEquipmentRouter,
  vehiclePhoto: vehiclePhotoRouter,
  bookCar: bookCarRouter,
  location: locationRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
