interface ChooseUnitProps {
  picture: string
  header: string
  paragraph: string
}

export const ChooseUnit = ({ picture, header, paragraph }: ChooseUnitProps) => {
  return (
    <>
      <div className="flex flex-col items-center px-6 sm:flex-row">
        <div className="h-40 w-40 sm:h-auto">
          <img className="h-full w-full" src={picture} alt="service icon" />
        </div>
        <div className="flex flex-col px-5">
          <h3 className="pb-2 text-center text-2xl font-bold lg:text-left">{header}</h3>
          <p className="text-center lg:text-left">{paragraph}</p>
        </div>
      </div>
    </>
  )
}
