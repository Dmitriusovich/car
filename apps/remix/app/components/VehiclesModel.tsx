interface VehiclesModelProps {
  image: string
  brand: string
  model: string
  price: string
  door: string
  transmission: string
  fuel: string
  line?: string
}

export const VehiclesModel = ({ image, brand, model, price, door, transmission, fuel, line }: VehiclesModelProps) => {
  return (
    <div className="flex flex-col justify-between border border-[#d5d5d5] p-7 shadow-lg">
      <div className="h-1/2">
        <img className="h-full w-full object-cover" src={image} alt="car" />
      </div>
      <div className="flex flex-col gap-6 pt-5">
        <div className="flex justify-between">
          <div className="flex flex-col justify-between">
            <p className="text-2xl font-medium">
              {brand} {model}
            </p>
            <div className="flex pb-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
              </svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"></path>
              </svg>
            </div>
          </div>

          <div className="pl-5">
            <p className="text-2xl font-medium">{price}</p>
            <p>в сутки</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-3">
          <div>
            Линия:
            <span className="font-medium">{line ? " " + line : " стандарт"}</span>
          </div>

          <div>
            Двери: <span className="font-medium">{door}</span>
          </div>
          <div>
            Трансмиссия: <span className="font-medium">{transmission}</span>
          </div>
          <div>
            Топливо: <span className="font-medium">{fuel}</span>
          </div>
        </div>

        <div className="mx-auto w-full border-t border-t-[#d5d5d5] pt-5">
          <button className="w-full rounded bg-primary-600 hover:bg-primary-700 active:bg-primary-800px-7 py-4 font-medium text-white shadow-lg shadow-orangeShadow transition-all hover:opacity-80">
            Забронирывать
          </button>
        </div>
      </div>
    </div>
  )
}
