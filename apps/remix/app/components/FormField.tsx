interface FormFieldProps {
  icon: string
  label: string
  register: object
  options?: JSX.Element[]
  errors: string | undefined
  date?: boolean
}

export const FormField = ({ icon, label, register, options, errors, date = false }: FormFieldProps) => {
  return (
    <div className="rounded-md">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <div>
            <img alt="icon" src={icon} className="w-6"></img>
          </div>
          <div>
            <label className="flex whitespace-nowrap py-3 text-lg font-medium text-black">
              {label}
              <span className="text-[#ff4d30]">*</span>
            </label>
          </div>
        </div>
        <div>
          {date === false ? (
            <select className="w-full rounded-md text-black border border-[#ccd7e6] p-2 " {...register}>
              <option className="dark:text-black" value="">
                ---
              </option>
              {options}
            </select>
          ) : (
            <input
              type="date"
              className="w-full text-black rounded-md border border-[#ccd7e6] px-2 py-[5.5px]"
              {...register}
            ></input>
          )}
        </div>
        <p className="mt-2 text-red-500">{errors}</p>
      </div>
    </div>
  )
}
