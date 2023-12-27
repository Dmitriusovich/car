interface ReservationLocDateUnitProps {
  image: string
  label: string
  date?: string
  type?: string
  location?: string
}

export const ReservationLocDateUnit = ({ image, label, date, type, location }: ReservationLocDateUnitProps) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex gap-3">
        <img src={image} alt="icon" className="h-6 w-6" />
        <h6 className="font-semibold text-black">{label}</h6>
      </div>
      <div className="flex items-center gap-2 ">
        {date ? <p className="text-black">{date}</p> : <p className="text-black">{location}</p>}
      </div>
    </div>
  )
}
