interface Props {
  picture: string
  header: string
  paragraph: string
}

export const PlanUnit = ({ picture, header, paragraph }: Props) => {
  return (
    <>
      <div className="flex flex-col items-center justify-start px-6">
        <div className="flex h-40 w-40 items-center">
          <img className="h-full w-full" src={picture} alt="service icon" />
        </div>
        <h3 className="pb-2 text-center text-2xl font-bold">{header}</h3>
        <p className="text-center">{paragraph}</p>
      </div>
    </>
  )
}
