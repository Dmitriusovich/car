import { useEffect, useState } from "react"
import { CheckEmailNotification } from "./CheckEmailNotification"
import { Form1, FormValues } from "./Form1"
import { ReservationComplete } from "./ReservationComplete"
import { SerializeFrom } from "@vercel/remix"
import { RouterOutputs } from "~/lib/providers/TRPCProvider"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import { reserveSchema } from "~/validations/ReserveValidation"

interface BookingProps {
  vehicles: SerializeFrom<RouterOutputs["bookCar"]["bookCar"]["vehicles"]>
  locations: SerializeFrom<RouterOutputs["bookCar"]["bookCar"]["locations"]>
}

export const Booking = ({ vehicles, locations }: BookingProps) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const [isFinalSubmit, setIsFinalSubmit] = useState(false)

  //Initial form data values:
  const [formData, setFormData] = useState<FormValues>({
    carType: "",
    pickLocation: "",
    dropLocation: "",
    pickDate: "",
    dropDate: "",
  })

  //Form state management:
  const handleFormSubmit = (data: FormValues) => {
    setIsFormSubmitted(true)
    setFormData(data)
  }

  const handleCloseReservation = () => {
    setIsFormSubmitted(false)
  }

  const handleFinalSubmit = () => {
    setIsFinalSubmit(true)
    setIsFormSubmitted(false)
  }

  const handleCloseNotification = () => {
    setIsFinalSubmit(false)
    setIsFormSubmitted(false)
  }

  //Hide vertical scrollbar on main page when modal is open:
  useEffect(() => {
    if (isFormSubmitted === true) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
  }, [isFormSubmitted])

  return (
    <div className="pt-20 flex justify-center" id="booking-section">
      <div className="container">
        <div className="relative z-10 rounded-lg bg-[#ffedea] bg-booking bg-cover bg-no-repeat p-10 shadow-xl">
          <div className="pb-5">
            <h2 className="pb-2 text-black text-2xl font-bold">Забронировать автомобиль</h2>
            <p className="text-black">
              <span className="text-lg font-medium text-[#ff4d30]">*</span> - обязательное поле
            </p>
          </div>

          {isFinalSubmit && <CheckEmailNotification onClose={handleCloseNotification} />}

          <Form1 onFormSubmit={handleFormSubmit} vehicles={vehicles} locations={locations} />
        </div>
      </div>
      {isFormSubmitted && (
        <ReservationComplete
          formData={formData}
          onCloseReservation={handleCloseReservation}
          onFinalSubmit={handleFinalSubmit}
          vehicles={vehicles}
        />
      )}
    </div>
  )
}
