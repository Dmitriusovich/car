import icon1 from "../assets/images/plan/icon1.png"
import icon2 from "../assets/images/plan/icon2.png"
import icon3 from "../assets/images/plan/icon3.png"
import { PlanUnit } from "./PlanUnit"

export const Plan = () => {
  return (
    <div className="flex flex-col items-center py-10">
      <div className="container">
        <div className="text-center font-semibold">
          <h3 className="text-2xl">Планируйте поездку прямо сейчас</h3>
          <h2 className="py-5 text-5xl">
            Быстрая и <span className="text-primary-600">простая</span> аренда автомобиля
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-5 px-5 py-5 sm:grid-cols-2 md:grid-cols-3">
          <PlanUnit
            picture={icon1}
            header="Выбрать автомобиль"
            paragraph="Мы предлагаем большой выбор автомобилей для всех ваших потребностей. У нас есть идеальный автомобиль для удовлетворения ваших потребностей"
          />
          <PlanUnit
            picture={icon2}
            header="Связаться с оператором"
            paragraph="Наши знающие и дружелюбные операторы всегда готовы помочь в решении любых вопросов и проблем."
          />
          <PlanUnit
            picture={icon3}
            header="Поездка"
            paragraph="Если вы собираетесь отправиться в путь, мы позаботимся о вас, предоставив широкий выбор автомобилей."
          />
        </div>
      </div>
    </div>
  )
}
