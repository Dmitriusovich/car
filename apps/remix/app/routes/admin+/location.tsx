import { type Prisma } from "@boilerplate/database"
import { Badge, BrandButton, Drawer, Switch, Tile } from "@boilerplate/ui"
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
  return [{ title: "Города" }, { name: "description", content: "Доступные города" }]
}
export const headers = () => {
  return {
    "Cache-Control": "max-age=3600, s-maxage=86400",
  }
}

enum LocationActions {
  Update = "Update",
  Create = "Create",
}

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

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData()
  const action = formData.get("_action") as LocationActions | undefined
  const { createFlash } = await getFlashSession(request)

  switch (action) {
    case LocationActions.Update:
      try {
        const updateSchema = z.object({
          city: z.string().min(3, "Название должно быть не менее 3 символов"),
          locationUuid: z.string().uuid(),
        })
        const result = await validateFormData(updateSchema, formData)
        if (!result.success) return formError(result)
        const data = result.data
        await trpcSsrClient.location.updateLocationByUuid.mutate(data)
        const headers = new Headers([["Set-Cookie", await createFlash(FlashType.Info, `Данные успешно обновлены`)]])
        return redirect("/admin/location", { headers })
      } catch (error) {
        if (error instanceof TRPCClientError) return formError({ formError: error.message })
        return badRequest(error, {
          headers: { "Set-Cookie": await createFlash(FlashType.Error, "Произошла ошибка, попробуйте еще раз") },
        })
      }
    case LocationActions.Create:
      try {
        const registerSchema = z.object({
          city: z.string().min(3, "Название должно быть не менее 3 символов"),
        })
        const result = await validateFormData(registerSchema, formData)

        if (!result.success) return formError(result)
        const data = result.data
        await trpcSsrClient.location.createLocation.mutate(data)
        const headers = new Headers([["Set-Cookie", await createFlash(FlashType.Info, `Новый город успешно создан`)]])
        return redirect("/admin/location", { headers })
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

type Location = SerializeFrom<typeof loader>["locations"][number]

export default function Location() {
  const { locations, count } = useLoaderData<typeof loader>()
  const [checked, setChecked] = useState<boolean>(false)

  const onCheckedChange = useCallback(() => setChecked((prev) => !prev), [])

  return (
    <div className="stack">
      <h1 className="text-4xl text-center mb-8">Города</h1>
      <Search />
      <Tile>
        <Table<Location>
          data={locations}
          take={TAKE}
          count={count}
          drawer={(node, item) => (
            <Drawer trigger={node} title="Город">
              <Form method="post" replace className="mt-10">
                <fieldset className="stack flex flex-col gap-1" disabled={!checked}>
                  <FormField required label="Наименование" name="city" type="text" defaultValue={item.city} disabled={!checked} />
                  <input name="locationUuid" className="hidden" value={item.uuid} />

                  {checked && (
                    <div>
                      <FormButton name="_action" value={LocationActions.Update} className="w-full" disabled={!checked}>
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
          <Column<Location> sortKey="id" header="№" row={(customer) => customer.id} />
          <Column<Location> sortKey="city" header="Город" row={(customer) => customer.city} />
          <Column<Location> sortKey="createdAt" header="Добавлено" row={(customer) => customer.createdAt} />
        </Table>
      </Tile>
      <Drawer trigger={<BrandButton className="ml-auto mt-4">Добавить новый город</BrandButton>} title="Добавить новый город">
        <Form method="post" replace className="mt-10">
          <fieldset className="stack flex flex-col gap-1">
            <FormField required label="Наименование" name="city" type="text" />
            <div>
              <FormButton name="_action" value={LocationActions.Create} className="w-full">
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
