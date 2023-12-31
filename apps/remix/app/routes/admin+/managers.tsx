import { type Prisma } from "@boilerplate/database"
import { Tile } from "@boilerplate/ui"
import { useLoaderData } from "@remix-run/react"
import { json, type LoaderFunctionArgs, type SerializeFrom } from "@vercel/remix"
import { Search } from "~/components/Search"
import { Column, Table } from "~/components/Table"
import { db } from "~/lib/db.server"
import { getFormattedDate } from "~/lib/helpers/utils"
import { getTableParams } from "~/lib/table"

const TAKE = 10
export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { orderBy, search, skip, take } = getTableParams(request, TAKE, { orderBy: "id", order: "asc" })
  const where = {
    OR: search ? [{ email: { contains: search } }, { name: { contains: search } }] : undefined,
  } satisfies Prisma.RentalManagerWhereInput
  const mangers = await db.rentalManager.findMany({
    orderBy,
    skip,
    take,
    where,
  })
  const count = await db.rentalManager.count({ where })
  return json({ mangers, count })
}

type Manager = SerializeFrom<typeof loader>["mangers"][number]

export default function Managers() {
  const { mangers, count } = useLoaderData<typeof loader>()
  console.log(mangers)

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Менеджеры</h1>
      <Search />
      <Tile>
        <Table<Manager> data={mangers} take={TAKE} count={count}>
          <Column<Manager> sortKey="id" header="№" row={(customer) => customer.id} />
          <Column<Manager> sortKey="name" header="Имя" row={(manager) => manager.name} />
          <Column<Manager> sortKey="email" header="Почта" row={(manager) => manager.email} />
          <Column<Manager> sortKey="createdAt" header="Дата регистрации" row={(manager) => getFormattedDate(manager.createdAt)} />
        </Table>
      </Tile>
    </div>
  )
}
