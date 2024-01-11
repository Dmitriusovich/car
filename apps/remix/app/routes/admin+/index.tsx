import { RentStatusEnum } from "@boilerplate/database"
import { Badge, Button, Drawer, Select, Switch, Tile } from "@boilerplate/ui"
import { useLoaderData } from "@remix-run/react"
import { TRPCClientError } from "@trpc/client"
import { json, MetaFunction, type LoaderFunctionArgs, type SerializeFrom, ActionFunctionArgs, redirect } from "@vercel/remix"
import { useCallback, useState } from "react"
import { z } from "zod"
import { Form, FormButton, FormError, FormField } from "~/components/Form"
import { Column, Table } from "~/components/Table"
import { DownloadPDF } from "~/components/pdf/DownloadPDF"
import { initialInvoice } from "~/components/pdf/InvoicePage"
import { db } from "~/lib/db.server"
import { formError, validateFormData } from "~/lib/form"
import { trpcSsrClient } from "~/lib/providers/TRPCProvider"
import { badRequest } from "~/lib/remix"
import { getTableParams } from "~/lib/table"
import { FlashType, getFlashSession } from "~/services/session/flash.server"

const TAKE = 10

export const meta: MetaFunction = () => {
  return [{ title: "Аренда" }, { name: "description", content: "Данные аренды" }]
}
export const headers = () => {
  return {
    "Cache-Control": "max-age=3600, s-maxage=86400",
  }
}

enum OrderActions {
  Update = "Update",
}

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
  const { vehicles, locations } = await trpcSsrClient.bookCar.bookCar.query()
  return json({ rents, vehicles, locations, count })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const action = formData.get("_action") as OrderActions | undefined
  const { createFlash } = await getFlashSession(request)

  switch (action) {
    case OrderActions.Update:
      try {
        const updateSchema = z.object({
          vehicleUuid: z.string(),
          status: z.nativeEnum(RentStatusEnum),
          firstName: z.string().min(2, "Имя должно быть не менее 2 символов"),
          lastName: z.string().min(2, "Фамилия должно быть не менее 2 символов"),
          phoneNumber: z.string(),
          pickUpUuid: z.string(),
          dropOffUuid: z.string(),
          rentUuid: z.string(),
          customerUuid: z.string(),
        })
        const result = await validateFormData(updateSchema, formData)

        if (!result.success) return formError(result)
        const data = result.data

        await db.rent.update({
          where: {
            uuid: data.rentUuid,
          },
          data: {
            vehicleId: Number(data.vehicleUuid),
            status: data.status,
            pickUpId: Number(data.pickUpUuid),
            dropOffId: Number(data.dropOffUuid),
          },
        })

        await db.customer.update({
          where: {
            uuid: data.customerUuid,
          },
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            phoneNumber: data.phoneNumber,
          },
        })

        const headers = new Headers([["Set-Cookie", await createFlash(FlashType.Info, `Данные успешно обновлены`)]])
        return redirect("/admin", { headers })
      } catch (error) {
        if (error instanceof TRPCClientError) return formError({ formError: error.message })
        return badRequest(error, {
          headers: { "Set-Cookie": await createFlash(FlashType.Error, "Произошла ошибка, попробуйте еще раз") },
        })
      }
    default:
      break
  }
}

export type RentalType = SerializeFrom<typeof loader>["rents"][number]

export default function Rental() {
  const { rents, vehicles, locations, count } = useLoaderData<typeof loader>()
  const [checked, setChecked] = useState<boolean>(false)

  const onCheckedChange = useCallback(() => setChecked((prev) => !prev), [])

  const getRentStatus = useCallback((rentData: RentalType) => {
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
        <Table<RentalType>
          activeRow
          data={rents}
          take={TAKE}
          count={count}
          drawer={(node, item) => (
            <Drawer trigger={node} title="Аренда">
              <Form method="post" replace className="mt-10">
                <fieldset className="stack flex flex-col gap-1" disabled={!checked}>
                  <FormField
                    required
                    label="Автомобиль"
                    name="vehicleUuid"
                    placeholder="Выберите Автомобиль"
                    disabled={!checked}
                    input={
                      <Select defaultValue={item.vehicle.id}>
                        {vehicles.map((vehicle) => (
                          <option className="text-black dark:text-white dark:bg-gray-700 " key={vehicle.id} value={vehicle.id}>
                            {vehicle.name}
                          </option>
                        ))}
                      </Select>
                    }
                  />
                  <FormField
                    required
                    label="Статус"
                    name="status"
                    placeholder="Выберите статус"
                    disabled={!checked}
                    input={
                      <Select defaultValue={item.status}>
                        <option className="text-black dark:text-white dark:bg-gray-700 " value={RentStatusEnum.Accepted}>
                          Подтвержден
                        </option>
                        <option className="text-black dark:text-white dark:bg-gray-700 " value={RentStatusEnum.Canceled}>
                          Отменен
                        </option>
                        <option className="text-black dark:text-white dark:bg-gray-700 " value={RentStatusEnum.Completed}>
                          Выполнен
                        </option>
                        <option className="text-black dark:text-white dark:bg-gray-700 " value={RentStatusEnum.During}>
                          Выполняется
                        </option>
                        <option className="text-black dark:text-white dark:bg-gray-700 " value={RentStatusEnum.Placed}>
                          Размещен
                        </option>
                        <option className="text-black dark:text-white dark:bg-gray-700 " value={RentStatusEnum.Rejected}>
                          Отклонен
                        </option>
                      </Select>
                    }
                  />
                  <FormField
                    label="Имя"
                    name="firstName"
                    type="text"
                    defaultValue={item.customer.firstName}
                    disabled={!checked}
                  />
                  <FormField
                    label="Фамилия"
                    name="lastName"
                    type="text"
                    defaultValue={item.customer.lastName}
                    disabled={!checked}
                  />
                  <FormField
                    label="Клиент"
                    name="phoneNumber"
                    type="tel"
                    defaultValue={item.customer.phoneNumber}
                    disabled={!checked}
                  />
                  <FormField
                    required
                    label="Выдача"
                    name="pickUpUuid"
                    placeholder="Выберите город"
                    disabled={!checked}
                    input={
                      <Select defaultValue={item.pickUp.id}>
                        {locations.map((location) => (
                          <option className="text-black dark:text-white dark:bg-gray-700 " key={location.id} value={location.id}>
                            {location.city}
                          </option>
                        ))}
                      </Select>
                    }
                  />
                  <FormField
                    required
                    label="Сдача"
                    name="dropOffUuid"
                    placeholder="Выберите город"
                    disabled={!checked}
                    input={
                      <Select defaultValue={item.dropOff.id}>
                        {locations.map((location) => (
                          <option className="text-black dark:text-white dark:bg-gray-700 " key={location.id} value={location.id}>
                            {location.city}
                          </option>
                        ))}
                      </Select>
                    }
                  />
                  <input name="customerUuid" className="hidden" defaultValue={item.customer.uuid} />
                  <input name="rentUuid" className="hidden" defaultValue={item.uuid} />

                  {checked && (
                    <div>
                      <FormButton name="_action" value={OrderActions.Update} className="w-full" disabled={!checked}>
                        Обновить
                      </FormButton>
                      <FormError />
                    </div>
                  )}
                </fieldset>
              </Form>
              <Badge colorScheme={"primary"} className="flex items-center justify-center p-2 gap-4 mt-8 mb-2">
                <label className="font-bold cursor-pointer" htmlFor="airplane-mode">
                  {checked ? "Ввод данных разрешен" : "Обновить данные"}
                </label>
                <Switch checked={checked} onCheckedChange={onCheckedChange} id="airplane-mode" />
              </Badge>
							<DownloadPDF className="outline-none focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-gray-400 dark:focus:ring-offset-gray-900 flex center border border-transparent transition-colors duration-200 bg-red-500 hover:bg-red-600 active:bg-red-700 text-white py-2" data={item}>Скачать документ</DownloadPDF>
            </Drawer>
          )}
        >
          <Column<RentalType> sortKey="id" header="№" row={(rent) => rent.id} />
          <Column<RentalType> sortKey="vehicle.name" header="Автомобиль" row={(rent) => rent.vehicle.name} />
          <Column<RentalType> sortKey="status" header="Статус" row={getRentStatus} />
          <Column<RentalType>
            sortKey="customer.firstName"
            header="Клиент"
            row={(rent) => `${rent.customer.firstName} ${rent.customer.lastName}`}
          />
          <Column<RentalType> sortKey="customer.phoneNumber" header="Телефон" row={(rent) => rent.customer.phoneNumber} />
          <Column<RentalType> sortKey="pickUp.city" header="Выдача" row={(rent) => rent.pickUp.city} />
          <Column<RentalType> sortKey="dropOff.city" header="Сдача" row={(rent) => rent.dropOff.city} />
        </Table>
      </Tile>
    </div>
  )
}
