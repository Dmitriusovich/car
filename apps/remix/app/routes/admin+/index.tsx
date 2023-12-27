import { type Prisma } from "@boilerplate/database"
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
  const rents = await db.rent.findMany({
    orderBy,
    skip,
    take,
    include: {
      pickUp: true,
      dropOff: true,
      customer: true,
      vehicle: true,
    },
  })
  const count = await db.rent.count()
  return json({ rents, count })
}

type Rental = SerializeFrom<typeof loader>["rents"][number]

export default function Rental() {
  const { rents, count } = useLoaderData<typeof loader>()

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Аренда</h1>
      <Tile>
        <Table<Rental> data={rents} take={TAKE} count={count}>
          <Column<Rental> sortKey="id" header="№" row={(rent) => rent.id} />
          <Column<Rental> sortKey="name" header="Автомобиль" row={(rent) => rent.vehicle.name} />
          <Column<Rental> sortKey="status" header="Статус" row={(rent) => rent.status} />
          <Column<Rental> sortKey="user" header="Клиент" row={(rent) => `${rent.customer.firstName} ${rent.customer.lastName}`} />
          <Column<Rental> sortKey="phoneNumber" header="Телефон" row={(rent) => rent.customer.phoneNumber} />
          <Column<Rental> sortKey="pickUp" header="Выдача" row={(rent) => rent.pickUp.city} />
          <Column<Rental> sortKey="dropOff" header="Сдача" row={(rent) => rent.dropOff.city} />
        </Table>
      </Tile>
    </div>
  )
}
