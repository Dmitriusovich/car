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
    OR: search
      ? [
          { email: { contains: search } },
          { firstName: { contains: search } },
          { lastName: { contains: search } },
          { city: { contains: search } },
          { phoneNumber: { contains: search } },
        ]
      : undefined,
  } satisfies Prisma.CustomerWhereInput
  const customers = await db.customer.findMany({
    orderBy,
    skip,
    take,
    where,
  })
  const count = await db.customer.count({ where })
  return json({ customers, count })
}

type Customer = SerializeFrom<typeof loader>["customers"][number]

export default function Customers() {
  const { customers, count } = useLoaderData<typeof loader>()

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Клиенты</h1>
      <Search />
      <Tile>
        <Table<Customer> data={customers} take={TAKE} count={count}>
          <Column<Customer> sortKey="id" header="№" row={(customer) => customer.id} />
          <Column<Customer> sortKey="firstName" header="Имя" row={(customer) => customer.firstName} />
          <Column<Customer> sortKey="lastName" header="Фамилия" row={(customer) => customer.lastName} />
          <Column<Customer> sortKey="email" header="Почта" row={(customer) => customer.email} />
          <Column<Customer> sortKey="phoneNumber" header="Телефон" row={(customer) => customer.phoneNumber} />
          <Column<Customer> sortKey="city" header="Город" row={(customer) => customer.city} />
          <Column<Customer> sortKey="createdAt" header="Дата регистрации" row={(customer) => customer.createdAt} />
        </Table>
      </Tile>
    </div>
  )
}
