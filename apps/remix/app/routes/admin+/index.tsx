import { RentStatusEnum } from "@boilerplate/database"
import { Tile } from "@boilerplate/ui"
import { useLoaderData } from "@remix-run/react"
import { json, type LoaderFunctionArgs, type SerializeFrom } from "@vercel/remix"
import { useCallback } from "react"
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

  const getRentStatus = useCallback((rentData: Rental) => {
    switch (rentData.status) {
      case RentStatusEnum.Accepted:
        return "Подтвержден"
      case RentStatusEnum.Canceled:
        return "Отменен"
      case RentStatusEnum.Completed:
        return "Выполнен"
      case RentStatusEnum.During:
        return "Выполняется"
      case RentStatusEnum.Placed:
        return "Размещен"
      case RentStatusEnum.Rejected:
        return "Отклонен"
      default: {
        const _exhaustiveCheck: never = rentData.status
        return _exhaustiveCheck
      }
    }
  }, [])

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Аренда</h1>
      <Tile>
        <Table<Rental> data={rents} take={TAKE} count={count}>
          <Column<Rental> sortKey="id" header="№" row={(rent) => rent.id} />
          <Column<Rental> sortKey="name" header="Автомобиль" row={(rent) => rent.vehicle.name} />
          <Column<Rental> sortKey="status" header="Статус" row={getRentStatus} />
          <Column<Rental> sortKey="user" header="Клиент" row={(rent) => `${rent.customer.firstName} ${rent.customer.lastName}`} />
          <Column<Rental> sortKey="phoneNumber" header="Телефон" row={(rent) => rent.customer.phoneNumber} />
          <Column<Rental> sortKey="pickUp" header="Выдача" row={(rent) => rent.pickUp.city} />
          <Column<Rental> sortKey="dropOff" header="Сдача" row={(rent) => rent.dropOff.city} />
        </Table>
      </Tile>
    </div>
  )
}
