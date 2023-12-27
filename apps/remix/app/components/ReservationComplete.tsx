import { useForm } from "react-hook-form"
import arrow from "../assets/icons/arrow-right.png"
import calendarIcon from "../assets/icons/calendar.png"
import locationIcon from "../assets/icons/location.png"
import { FormValues } from "./Form1"
import { ReservationField } from "./ReservationField"
import { ReservationLocDateUnit } from "./ReservationLocDateUnit"
import { SerializeFrom } from "@vercel/remix"
import { RouterOutputs, trpc } from "~/lib/providers/TRPCProvider"
import { yupResolver } from "@hookform/resolvers/yup"
import { reserveSchema } from "~/validations/ReserveValidation"
interface Props {
  vehicles: SerializeFrom<RouterOutputs["bookCar"]["bookCar"]["vehicles"]>
  formData: FormValues
  onCloseReservation: () => void
  onFinalSubmit: () => void
}

export interface FormReserveValues {
  firstName: string
  lastName: string
  phoneNumber: number
  age: number
  email: string
  address: string
  city: string
  zipCode: number
}

export const ReservationComplete = ({ formData, onCloseReservation, onFinalSubmit, vehicles }: Props) => {
  const { mutateAsync } = trpc.bookCar.reserveCar.useMutation()
  const selectedCar = formData.carType
  const selectedVehicle = vehicles.find((vehicle) => {
    return `${vehicle.brand} ${vehicle.model}` === selectedCar
  })

  const form = useForm<FormReserveValues>({
    resolver: yupResolver(reserveSchema),
  })
  const { register, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = async (data: FormReserveValues) => {
    if (data) {
      const customer = await mutateAsync({ customer: { ...data, phoneNumber: String(data.phoneNumber) }, rent: formData })
      onFinalSubmit()
    }
  }

  return (
    <div className="fixed top-0 z-50 flex h-full w-full items-center justify-center bg-[rgba(0,0,0,0.3)]">
      <div className="h-full w-full max-w-screen-md overflow-y-scroll bg-white md:relative md:top-10 md:p-1 ">
        <div className="flex items-center justify-between bg-primary-600 p-3">
          <h3 className="text-xl font-medium text-white xs:text-2xl">Завершить бронирование</h3>
          <div className="h-fit w-6 cursor-pointer text-white" onClick={onCloseReservation}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 6l-12 12"></path>
              <path d="M6 6l12 12"></path>
            </svg>
          </div>
        </div>
        <div className="bg-[#ffedea] Light p-5">
          <div className="mb-3 flex items-center gap-2 text-primary-600">
            <svg
              className="w-6 min-w-[1.5rem]"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path
                d="M12 2c5.523 0 10 4.477 10 10a10 10 0 0 1 -19.995 .324l-.005 -.324l.004 -.28c.148 -5.393 4.566 -9.72 9.996 -9.72zm0 9h-1l-.117 .007a1 1 0 0 0 0 1.986l.117 .007v3l.007 .117a1 1 0 0 0 .876 .876l.117 .007h1l.117 -.007a1 1 0 0 0 .876 -.876l.007 -.117l-.007 -.117a1 1 0 0 0 -.764 -.857l-.112 -.02l-.117 -.006v-3l-.007 -.117a1 1 0 0 0 -.876 -.876l-.117 -.007zm.01 -3l-.127 .007a1 1 0 0 0 0 1.986l.117 .007l.127 -.007a1 1 0 0 0 0 -1.986l-.117 -.007z"
                fill="currentColor"
                strokeWidth="0"
                className="text-primary-600"
              ></path>
            </svg>
            <h4 className="text-xl font-medium text-primary-600">Выполнив этот запрос на бронирование, вы получите:</h4>
          </div>

          <ul className="list-inside list-disc text-lg">
            <li className="text-black">Ваучер на аренду, который необходимо предъявить по прибытии в пункт проката</li>
            <li className="text-black">Бесплатный номер службы поддержки клиентов</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-14 border-b p-8">
          <div className="flex flex-col gap-10">
            <h5 className="text-center text-lg font-medium text-primary-600">Место и дата</h5>
            <div className="grid grid-cols-1 items-center gap-8 xs:grid-cols-2 sm:grid-cols-4 md:gap-0">
              <ReservationLocDateUnit image={calendarIcon} label="Pick-up:" date={formData.pickDate} />
              <ReservationLocDateUnit image={calendarIcon} label="Drop-off:" date={formData.dropDate} />
              <ReservationLocDateUnit image={locationIcon} label="Pick-up:" location={formData.pickLocation} />
              <ReservationLocDateUnit image={locationIcon} label="Drop-off:" location={formData.dropLocation} />
            </div>
          </div>

          <div className="flex flex-col items-center gap-10">
            <div className="text-lg font-medium">
              <h5 className="text-black">
                Ваш автомобиль:
                <span className="text-primary-600"> {formData.carType}</span>
              </h5>
            </div>
            <div>
              <img src={selectedVehicle?.vehiclePhotos[1].url || ""} alt="selected car" className="max-h-[210px]" />
            </div>
          </div>
        </div>
        <div className="p-8">
          <h5 className="mb-8 text-center text-lg font-medium text-primary-600">Личная информация</h5>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-2 gap-8 xs:grid-cols-2">
              <ReservationField
                register={register("firstName")}
                label="Имя"
                type="text"
                placeholder="имя"
                minLength={3}
                maxLength={30}
              />
              <ReservationField
                register={register("lastName")}
                label="Фамилия"
                type="text"
                placeholder="фамилия"
                minLength={3}
                maxLength={30}
              />
              <ReservationField
                register={register("phoneNumber")}
                label="Номер телефона"
                type="tel"
                placeholder="номер телефона"
              />
              <ReservationField register={register("age")} label="Ваш возраст" type="number" placeholder="возраст" />
              <ReservationField
                register={register("email")}
                label="Почта"
                type="email"
                placeholder="почта"
                minLength={3}
                maxLength={30}
              />
              <ReservationField
                register={register("address")}
                label="Адрес"
                type="text"
                placeholder="адрес"
                minLength={3}
                maxLength={30}
              />
              <ReservationField
                register={register("city")}
                label="Город"
                type="text"
                placeholder="город"
                minLength={3}
                maxLength={30}
              />
              <ReservationField
                register={register("zipCode")}
                label="Индекс"
                type="number"
                placeholder="индекс"
                minLength={3}
                maxLength={30}
              />
            </div>
            <div className="flex mt-4 flex-col xs:col-span-2">
              <div className="flex items-center gap-2">
                <input type="checkbox" className="h-4 w-4" />
                <p className="text-black">Пожалуйста, присылайте мне последние новости и обновления</p>
              </div>
              <div className="flex  items-center justify-center gap-5 p-10 xs:flex-row">
                <button
                  className="flex min-w-[172px] items-center gap-2 whitespace-nowrap rounded bg-black px-7 py-4 text-white shadow-lg shadow-gray2 transition-all duration-300 hover:opacity-80"
                  onClick={onCloseReservation}
                  type="button"
                >
                  <img src={arrow} alt="arrow" className="w-3 rotate-180" />
                  Изменение данных
                </button>
                <button
                  className="min-w-[172px] whitespace-nowrap rounded bg-primary-600 hover:bg-primary-700 active:bg-primary-800 px-7 py-4 font-medium text-white shadow-lg shadow-orangeShadow transition-all duration-300  hover:shadow-none"
                  type="submit"
                >
                  ЗАРЕЗЕРВИРОВАТЬ
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
