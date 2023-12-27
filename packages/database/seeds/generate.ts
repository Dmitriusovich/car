import { Prisma } from "@prisma/client"
import fs from "fs"

const generators = {
  RentalManager: {
    _qty: 0,
  },

  UnitType: {
    _qty: 0,
  },

  FuelType: {
    _qty: 0,
  },

  Rental: {
    _qty: 0,
  },

  Vehicle: {
    _qty: 0,
  },

  VehicleEquipment: {
    _qty: 0,
  },

  VehicleService: {
    _qty: 6,
    vehicleId: "Vehicle",
    startAt: () => new Date(),
    endAt: () => new Date(),
  },

  VehiclePhoto: {
    _qty: 0,
  },

  Rent: {
    _qty: 0,
  },

  // Customer: {
  //   _qty: 0,
  //   firstName: () => faker.person.firstName(),
  //   lastName: () => faker.person.lastName(),
  //   birthDate: () => faker.date.past(),
  //   email: () => faker.internet.email(),
  //   phoneNumber: () => faker.phone.number(),
  // },
}

// Get Prisma models list with metadata
const queue = [...Prisma.dmmf.datamodel.models]

const generateSeeds = async () => {
  queue.forEach((model) => {
    // take current model generators
    const modelGenerators = generators[model.name as keyof typeof generators] as any

    const seeds = []

    console.log(model.name, modelGenerators)

    if (!modelGenerators) return

    // Finally generate seeds for particular model
    for (let i = 0; i < modelGenerators._qty; i++) {
      const seed = model.fields.reduce((seedData, field) => {
        const generator = modelGenerators[field.name as keyof typeof modelGenerators] as string | Function | undefined

        if (typeof generator === "function") {
          return {
            ...seedData,
            [field.name]: generator(i),
          }
        }

        if (typeof generator === "string") {
          return {
            ...seedData,
            [field.name]: { type: generator },
          }
        }

        return seedData
      }, {})

      seeds.push(seed)
    }

    // Format and write to json file.
    const json = JSON.stringify(seeds, null, 2)
    fs.writeFile(`${__dirname}/data/${model.name}.json`, json, (err) => {
      if (err) {
        console.error(err)
      }
    })
  })
}

generateSeeds()
  .then(() => {
    console.log("Generated new seed data to database/seeds/data directory")
  })
  .catch((err) => {
    console.log(err)
  })
