interface ReservationFieldProps {
  label: string
  type: "text" | "number" | "email" | "tel"
  placeholder: string
  minLength?: number
  maxLength?: number
  register: object
}

export const ReservationField = ({ label, type, placeholder, minLength, maxLength, register }: ReservationFieldProps) => {
  return (
    <div>
      <h6 className="mb-1 font-medium text-black">{label}</h6>
      <input
        type={type}
        className="w-full bg-gray3 p-2 text-sm text-gray2"
        placeholder={placeholder}
        minLength={minLength}
        maxLength={maxLength}
        {...register}
      />
    </div>
  )
}
