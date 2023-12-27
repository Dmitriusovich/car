import { UnitTypeEnum, type Prisma } from "@boilerplate/database"
import { Tile } from "@boilerplate/ui"
import { useLoaderData } from "@remix-run/react"
import { json, type LoaderFunctionArgs, type SerializeFrom } from "@vercel/remix"
import { Search } from "~/components/Search"
import { Column, Table } from "~/components/Table"
import { db } from "~/lib/db.server"
import { getTableParams } from "~/lib/table"

const TAKE = 10
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { orderBy, skip, take } = getTableParams(request, TAKE, { orderBy: "id", order: "asc" })

  const fuelType = await db.fuelType.findMany({
    orderBy,
    skip,
    take,
  })
  const count = await db.fuelType.count()
  return json({ fuelType, count })
}

type FuelType = SerializeFrom<typeof loader>["fuelType"][number]

export default function FuelTypes() {
  const { fuelType, count } = useLoaderData<typeof loader>()

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Тип топлива</h1>
      <Tile>
        <Table<FuelType> data={fuelType} take={TAKE} count={count}>
          <Column<FuelType> sortKey="id" header="№" row={(customer) => customer.id} />
          <Column<FuelType> sortKey="name" header="Наименование" row={(manager) => manager.name} />
          <Column<FuelType> sortKey="createdAt" header="Дата добавления" row={(manager) => manager.createdAt} />
        </Table>
      </Tile>
    </div>
  )
}
