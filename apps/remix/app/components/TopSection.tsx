import { Limiter } from "@boilerplate/ui"

interface TopSectionProps {
  name: string
}

export const TopSection = ({ name }: TopSectionProps) => {
  return (
    <div className="flex h-72 items-center bg-[hsla(0,0%,100%,.42)] bg-header bg-cover bg-right-top bg-blend-overlay">
      <Limiter>
        <div className="container">
          <h3 className="text-4xl font-bold pb-3 text-black">{name}</h3>
          <p className="font-semibold text-black">Главная / {name}</p>
        </div>
      </Limiter>
    </div>
  )
}
