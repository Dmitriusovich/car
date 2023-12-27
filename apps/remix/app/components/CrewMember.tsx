interface CrewMemberProps {
  image: string
  name: string
  position: string
}

export const CrewMember = ({ image, name, position }: CrewMemberProps) => {
  return (
    <div className="flex flex-col items-center p-5 text-center shadow-xl">
      <div className="bg-gray3">
        <img src={image} alt="person photography" />
      </div>
      <div className="flex flex-col pt-5">
        <div className="text-2xl font-semibold">{name}</div>
        <div className="text-gray2">{position}</div>
      </div>
    </div>
  )
}
