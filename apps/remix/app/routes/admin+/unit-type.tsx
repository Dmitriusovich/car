import { UnitTypeEnum } from "@boilerplate/database"
import { Tile } from "@boilerplate/ui"
import { useLoaderData } from "@remix-run/react"
import { json, type LoaderFunctionArgs, type SerializeFrom } from "@vercel/remix"
import { Column, Table } from "~/components/Table"
import { db } from "~/lib/db.server"
import { getFormattedDate } from "~/lib/helpers/utils"
import { getTableParams } from "~/lib/table"

const TAKE = 10
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { orderBy, skip, take } = getTableParams(request, TAKE, { orderBy: "id", order: "asc" })

  const unitType = await db.unitType.findMany({
    orderBy,
    skip,
    take,
  })
  const count = await db.unitType.count()
  return json({ unitType, count })
}

type UnitType = SerializeFrom<typeof loader>["unitType"][number]

export default function UnitTypes() {
  const { unitType, count } = useLoaderData<typeof loader>()

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Единицы измерения</h1>
      <Tile>
        <Table<UnitType> data={unitType} take={TAKE} count={count}>
          <Column<UnitType> sortKey="id" header="№" row={(customer) => customer.id} />
          <Column<UnitType>
            sortKey="name"
            header="Наименование"
            row={(manager) => (manager.name === UnitTypeEnum.Imperial ? "Имперская система" : "Метрическая система")}
          />
          <Column<UnitType> sortKey="createdAt" header="Дата добавления" row={(manager) => getFormattedDate(manager.createdAt)} />
        </Table>
      </Tile>
    </div>
  )
}
