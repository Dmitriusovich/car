import { PickTechTableField } from "./PickTechTableField"

interface PickTechTableProps {
  cost: string
  brand: string
  model: string
  year: string
  doors: string
  ac: string
  transmission: string
  fuel: string
}

export const PickTechTable = ({ cost, brand, model, year, doors, ac, transmission, fuel }: PickTechTableProps) => {
  return (
    <div className="flex min-w-[250px] flex-col">
      <div className="bg-primary-600 px-4 py-1 text-center text-lg text-white">
        <span className="text-2xl font-medium">{cost}</span>/ день
      </div>
      <PickTechTableField label="Бренд" value={brand} />
      <PickTechTableField label="Модель" value={model} />
      <PickTechTableField label="Год" value={year} />
      <PickTechTableField label="Двери" value={doors} />
      <PickTechTableField label="AC" value={ac} />
      <PickTechTableField label="Трансмиссия" value={transmission} />
      <PickTechTableField label="Топливо" value={fuel} />

      <a href="#booking-section">
        <button className="mt-5 w-full rounded bg-primary-600 hover:bg-primary-700 active:bg-primary-800 px-4 py-2 text-xl text-white shadow-lg shadow-orangeShadow transition-all duration-300 hover:opacity-80">
          Забронировать
        </button>
      </a>
    </div>
  )
}
