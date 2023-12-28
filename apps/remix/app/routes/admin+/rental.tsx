import { type Prisma } from "@boilerplate/database"
import { Badge, BrandButton, Drawer, Select, Switch, Tile } from "@boilerplate/ui"
import { useLoaderData } from "@remix-run/react"
import { TRPCClientError } from "@trpc/client"
import { ActionFunctionArgs, MetaFunction, json, redirect, type LoaderFunctionArgs, type SerializeFrom } from "@vercel/remix"
import { useCallback, useState } from "react"
import { z } from "zod"
import { Form, FormButton, FormError, FormField } from "~/components/Form"
import { Search } from "~/components/Search"
import { Column, Table } from "~/components/Table"
import { db } from "~/lib/db.server"
import { formError, validateFormData } from "~/lib/form"
import { trpcSsrClient } from "~/lib/providers/TRPCProvider"
import { badRequest } from "~/lib/remix"
import { getTableParams } from "~/lib/table"
import { FlashType, getFlashSession } from "~/services/session/flash.server"

const TAKE = 10

export const meta: MetaFunction = () => {
  return [{ title: "Прокат" }, { name: "description", content: "Прокат автомобилей" }]
}
export const headers = () => {
  return {
    "Cache-Control": "max-age=3600, s-maxage=86400",
  }
}

enum RentalActions {
  Update = "Update",
  Create = "Create",
}

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
  const unitTypes = await trpcSsrClient.unitType.findAllUnitTypes.query()
  const count = await db.rental.count({ where })
  return json({ rentals, unitTypes, count })
}

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const action = formData.get("_action") as RentalActions | undefined
  const { createFlash } = await getFlashSession(request)

  switch (action) {
    case RentalActions.Update:
      try {
        const updateSchema = z.object({
          name: z.string().min(3, "Название должно быть не менее 3 символов"),
          unitTypeUuid: z.string(),
          rentalTypeUuid: z.string(),
        })
        const result = await validateFormData(updateSchema, formData)

        if (!result.success) return formError(result)
        const data = result.data
        await trpcSsrClient.rental.updateRental.mutate(data)
        const headers = new Headers([["Set-Cookie", await createFlash(FlashType.Info, `Данные успешно обновлены`)]])
        return redirect("/admin/rental", { headers })
      } catch (error) {
        if (error instanceof TRPCClientError) return formError({ formError: error.message })
        return badRequest(error, {
          headers: { "Set-Cookie": await createFlash(FlashType.Error, "Произошла ошибка, попробуйте еще раз") },
        })
      }
    case RentalActions.Create:
      try {
        const registerSchema = z.object({
          name: z.string().min(3, "Название должно быть не менее 3 символов"),
          unitTypeUuid: z.string(),
        })
        const result = await validateFormData(registerSchema, formData)

        if (!result.success) return formError(result)
        const data = result.data
        await trpcSsrClient.rental.createRental.mutate(data)
        const headers = new Headers([["Set-Cookie", await createFlash(FlashType.Info, `Новый сервис проката успешно создан`)]])
        return redirect("/admin/rental", { headers })
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

type Rental = SerializeFrom<typeof loader>["rentals"][number]

export default function Rentals() {
  const { unitTypes, rentals, count } = useLoaderData<typeof loader>()
  const [checked, setChecked] = useState<boolean>(false)

  const onCheckedChange = useCallback(() => setChecked((prev) => !prev), [])

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Сервис Проката</h1>
      <Search />
      <Tile>
        <Table<Rental>
          data={rentals}
          take={TAKE}
          count={count}
          drawer={(node, item) => (
            <Drawer trigger={node} title="Прокат">
              <Form method="post" replace className="mt-10">
                <fieldset className="stack flex flex-col gap-1" disabled={!checked}>
                  <FormField required label="Наименование" name="name" type="text" defaultValue={item.name} disabled={!checked} />
                  <input name="rentalTypeUuid" className="hidden" value={item.uuid} />
                  <FormField
                    required
                    label="Тип аренды"
                    name="unitTypeUuid"
                    placeholder="Выберите тип"
                    disabled={!checked}
                    input={
                      <Select defaultValue={item.unitType.uuid}>
                        {unitTypes.map((unitType) => (
                          <option
                            className="text-black dark:text-white dark:bg-gray-700 "
                            key={unitType.id}
                            value={unitType.uuid}
                          >
                            {unitType.name}
                          </option>
                        ))}
                      </Select>
                    }
                  />
                  {checked && (
                    <div>
                      <FormButton name="_action" value={RentalActions.Update} className="w-full" disabled={!checked}>
                        Обновить
                      </FormButton>
                      <FormError />
                    </div>
                  )}
                </fieldset>
              </Form>
              <Badge colorScheme={"primary"} className="flex items-center justify-center p-2 gap-4 my-8">
                <label className="font-bold cursor-pointer" htmlFor="airplane-mode">
                  {checked ? "Ввод данных разрешен" : "Обновить данные"}
                </label>
                <Switch checked={checked} onCheckedChange={onCheckedChange} id="airplane-mode" />
              </Badge>
            </Drawer>
          )}
        >
          <Column<Rental> sortKey="id" header="№" row={(customer) => customer.id} />
          <Column<Rental> sortKey="name" header="Наименование" row={(customer) => customer.name} />
          <Column<Rental> sortKey="name" header="Единицы измерения" row={(customer) => customer.unitType.name} />
          <Column<Rental> sortKey="createdAt" header="Добавлено" row={(customer) => customer.createdAt} />
        </Table>
      </Tile>
      <Drawer
        trigger={<BrandButton className="ml-auto mt-4">Создать новый сервис</BrandButton>}
        title="Создать новый сервис проката"
      >
        <Form method="post" replace className="mt-10">
          <fieldset className="stack flex flex-col gap-1">
            <FormField required label="Наименование" name="name" type="text" />
            <FormField
              required
              label="Тип аренды"
              name="unitTypeUuid"
              placeholder="Выберите тип"
              input={
                <Select>
                  {unitTypes.map((unitType) => (
                    <option className="text-black dark:text-white dark:bg-gray-700 " key={unitType.id} value={unitType.uuid}>
                      {unitType.name}
                    </option>
                  ))}
                </Select>
              }
            />
            <div>
              <FormButton name="_action" value={RentalActions.Create} className="w-full">
                Создать
              </FormButton>
              <FormError />
            </div>
          </fieldset>
        </Form>
      </Drawer>
    </div>
  )
}
