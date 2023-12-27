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
    OR: search ? [{ city: { contains: search } }] : undefined,
  } satisfies Prisma.LocationWhereInput
  const locations = await db.location.findMany({
    orderBy,
    skip,
    take,
    where,
  })
  const count = await db.location.count({ where })
  return json({ locations, count })
}

type Location = SerializeFrom<typeof loader>["locations"][number]

export default function Location() {
  const { locations, count } = useLoaderData<typeof loader>()

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Города</h1>
      <Search />
      <Tile>
        <Table<Location> data={locations} take={TAKE} count={count}>
          <Column<Location> sortKey="id" header="№" row={(customer) => customer.id} />
          <Column<Location> sortKey="city" header="Город" row={(customer) => customer.city} />
          <Column<Location> sortKey="createdAt" header="Добавлено" row={(customer) => customer.createdAt} />
        </Table>
      </Tile>
    </div>
  )
}
