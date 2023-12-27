import { AdditionalInfoContact } from "./AdditionalInfoContact"
import { AdditionalInfoForm } from "./AdditionalInfoForm"

export const AdditionalInfo = () => {
  return (
    <div className="container py-20 mx-auto">
      <div className="grid grid-cols-1 gap-16 bg-contact bg-center bg-no-repeat sm:grid-cols-2">
        <div className="flex flex-col items-center gap-8 sm:items-start ">
          <div className="flex max-w-lg flex-col gap-8 text-center sm:text-start">
            <h2 className="text-4xl font-semibold sm:text-5xl">Нужна дополнительная информация?</h2>
            <p className="text-gray2">
              Многогранный профессионал в различных областях исследований, разработок, а также специалист по обучению. Опыт работы
              более 15 лет.
            </p>
          </div>
          <AdditionalInfoContact />
        </div>
        <AdditionalInfoForm />
      </div>
    </div>
  )
}
