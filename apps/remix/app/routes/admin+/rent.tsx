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
  const { orderBy, search, skip, take } = getTableParams(request, TAKE, { orderBy: "id", order: "asc" })
  const where = {
    OR: search ? [{ name: { contains: search } }] : undefined,
  } satisfies Prisma.RentalWhereInput
  const rentals = await db.rental.findMany({
    orderBy,
    skip,
    take,
    where,
    include: {
      unitType: true,
    },
  })
  const count = await db.rental.count({ where })
  return json({ rentals, count })
}

type Rental = SerializeFrom<typeof loader>["rentals"][number]

export default function Rentals() {
  const { rentals, count } = useLoaderData<typeof loader>()

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Прокат</h1>
      <Search />
      <Tile>
        <Table<Rental> data={rentals} take={TAKE} count={count}>
          <Column<Rental> sortKey="id" header="№" row={(customer) => customer.id} />
          <Column<Rental> sortKey="name" header="Наименование" row={(customer) => customer.name} />
          <Column<Rental> sortKey="name" header="Единицы измерения" row={(customer) => customer.unitType.name} />
          <Column<Rental> sortKey="createdAt" header="Добавлено" row={(customer) => customer.createdAt} />
        </Table>
      </Tile>
    </div>
  )
}
