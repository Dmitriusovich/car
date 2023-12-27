import { DevTool } from "@hookform/devtools"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import calendarIcon from "../assets/icons/calendar.png"
import carIcon from "../assets/icons/car_icon.png"
import locationIcon from "../assets/icons/location.png"
import { schema } from "../validations/FormValidation"
import { FormField } from "./FormField"
import { SerializeFrom } from "@vercel/remix"
import { Vehicle, Location } from "@boilerplate/database"
import { RouterOutputs } from "~/lib/providers/TRPCProvider"

export interface FormValues {
  carType: string
  pickLocation: string
  dropLocation: string
  pickDate: string
  dropDate: string
}

interface FormProps {
  onFormSubmit: (data: FormValues) => void
  vehicles: SerializeFrom<RouterOutputs["bookCar"]["bookCar"]["vehicles"]>
  locations: SerializeFrom<RouterOutputs["bookCar"]["bookCar"]["locations"]>
}

export const Form1 = ({ onFormSubmit, vehicles, locations }: FormProps) => {
  /*Form management and resolving */
  const form = useForm<FormValues>({
    resolver: yupResolver(schema),
  })
  const { register, control, handleSubmit, formState } = form
  const { errors } = formState

  const onSubmit = (data: FormValues) => {
    console.log(data)

    onFormSubmit(data)
  }

  /* Car type */
  const vehiclesOptions = () =>
    vehicles.map((vehicle) => (
      <option className="dark:text-black" key={vehicle.id} value={vehicle.name}>
        {vehicle.brand} {vehicle.model}
      </option>
    ))
  const carTypeErrorMessage = errors.carType?.message

  /* Pick-up location */
  const locationOptions = () =>
    locations.map((location, index) => (
      <option className="dark:text-black" value={location.id} key={index}>
        {location.city}
      </option>
    ))
  const pickLocationErrorMessage = errors.pickLocation?.message

  /* Drop-off location */
  const dropLocationErrorMessage = errors.dropLocation?.message

  /* Pick-up date */
  const pickDateErrorMessage = errors.pickDate?.message

  /* Drop-off date */
  const dropDateErrorMessage = errors.dropDate?.message

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
        {/* Car type */}
        <FormField
          icon={carIcon}
          label="Ваш автомобиль"
          register={register("carType")}
          options={vehiclesOptions()}
          errors={carTypeErrorMessage}
        />

        {/* Pick-up location */}
        <FormField
          icon={locationIcon}
          label="Место выдачи"
          register={register("pickLocation")}
          options={locationOptions()}
          errors={pickLocationErrorMessage}
        />

        {/* Drop-off location */}
        <FormField
          icon={locationIcon}
          label="Место сдачи"
          register={register("dropLocation")}
          options={locationOptions()}
          errors={dropLocationErrorMessage}
        />
        {/* Pick-up date */}
        <FormField
          icon={calendarIcon}
          label="Дата выдачи"
          register={register("pickDate")}
          errors={pickDateErrorMessage}
          date={true}
        />

        {/* Drop-off date */}
        <FormField
          icon={calendarIcon}
          label="Дата сдачи"
          register={register("dropDate")}
          errors={dropDateErrorMessage}
          date={true}
        />

        {/* Submit button */}
        <div className="sm:mt-[52px]">
          <button
            type="submit"
            className="h-10 w-full rounded bg-primary-600 hover:bg-primary-700 active:bg-primary-800 font-medium text-white shadow-lg shadow-orangeShadow transition-all duration-300 ease-in-out hover:opacity-80"
          >
            Поиск
          </button>
        </div>
      </form>

      {/* Additional devtool for form state management */}
      <DevTool control={control} />
    </>
  )
}
