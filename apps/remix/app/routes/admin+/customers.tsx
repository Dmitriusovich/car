import { type Prisma } from "@boilerplate/database"
import { Badge, Drawer, Switch, Tile } from "@boilerplate/ui"
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
import { getFormattedDate } from "~/lib/helpers/utils"
import { trpcSsrClient } from "~/lib/providers/TRPCProvider"
import { badRequest } from "~/lib/remix"
import { getTableParams } from "~/lib/table"
import { FlashType, getFlashSession } from "~/services/session/flash.server"

const TAKE = 10

export const meta: MetaFunction = () => {
  return [{ title: "Клиенты" }, { name: "description", content: "Клиенты оформившие заказ" }]
}
export const headers = () => {
  return {
    "Cache-Control": "max-age=3600, s-maxage=86400",
  }
}

enum CustomerActions {
  Update = "Update",
}

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const action = formData.get("_action") as CustomerActions | undefined
  const { createFlash } = await getFlashSession(request)

  switch (action) {
    case CustomerActions.Update:
      try {
        const updateSchema = z.object({
          firstName: z.string().min(2, "Имя должно быть не менее 2 символов"),
          lastName: z.string().min(2, "Имя должно быть не менее 2 символов"),
          email: z.string().email(),
          age: z.string().refine((data) => Number(data) >= 18, { message: "Клиенту должно быть не менее 18 лет" }),
          city: z.string().min(2),
          address: z.string().min(2),
          zipCode: z.string(),
          customerUuid: z.string().uuid(),
        })
        const result = await validateFormData(updateSchema, formData)

        if (!result.success) return formError(result)
        const data = result.data

        await trpcSsrClient.customer.updateCustomerByUuid.mutate({
          ...data,
          age: Number(data.age),
          zipCode: Number(data.zipCode),
        })
        const headers = new Headers([["Set-Cookie", await createFlash(FlashType.Info, `Данные успешно обновлены`)]])
        return redirect("/admin/customers", { headers })
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

type Customer = SerializeFrom<typeof loader>["customers"][number]

export default function Customers() {
  const { customers, count } = useLoaderData<typeof loader>()
  const [checked, setChecked] = useState<boolean>(false)

  const onCheckedChange = useCallback(() => setChecked((prev) => !prev), [])

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Клиенты</h1>
      <Search />
      <Tile>
        <Table<Customer>
          data={customers}
          take={TAKE}
          count={count}
          drawer={(node, item) => (
            <Drawer trigger={node} title="Клиент">
              <Form method="post" replace className="mt-10">
                <fieldset className="stack flex flex-col gap-1" disabled={!checked}>
                  <FormField
                    required
                    label="Имя"
                    name="firstName"
                    type="text"
                    defaultValue={item.firstName}
                    disabled={!checked}
                  />
                  <FormField
                    required
                    label="Фамилия"
                    name="lastName"
                    type="text"
                    defaultValue={item.lastName}
                    disabled={!checked}
                  />
                  <FormField required label="Почта" name="email" type="email" defaultValue={item.email} disabled={!checked} />
                  <FormField
                    required
                    label="Возраст"
                    name="age"
                    type="number"
                    defaultValue={String(item.age)}
                    disabled={!checked}
                  />
                  <FormField required label="Город" name="city" type="text" defaultValue={item.city} disabled={!checked} />
                  <FormField required label="Адрес" name="address" type="text" defaultValue={item.address} disabled={!checked} />
                  <FormField
                    required
                    label="Индекс"
                    name="zipCode"
                    type="number"
                    defaultValue={String(item.zipCode)}
                    disabled={!checked}
                  />
                  <input name="customerUuid" className="hidden" value={item.uuid} />

                  {checked && (
                    <div>
                      <FormButton name="_action" value={CustomerActions.Update} className="w-full" disabled={!checked}>
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
          <Column<Customer> sortKey="id" header="№" row={(customer) => customer.id} />
          <Column<Customer> sortKey="firstName" header="Имя" row={(customer) => customer.firstName} />
          <Column<Customer> sortKey="lastName" header="Фамилия" row={(customer) => customer.lastName} />
          <Column<Customer> sortKey="email" header="Почта" row={(customer) => customer.email} />
          <Column<Customer> sortKey="phoneNumber" header="Телефон" row={(customer) => customer.phoneNumber} />
          <Column<Customer> sortKey="city" header="Город" row={(customer) => customer.city} />
          <Column<Customer>
            sortKey="createdAt"
            header="Дата регистрации"
            row={(customer) => getFormattedDate(customer.createdAt)}
          />
        </Table>
      </Tile>
    </div>
  )
}
