import aboutPicture from "../assets/images/about/about-main.jpg"
import icon1 from "../assets/images/about/icon1.png"
import icon2 from "../assets/images/about/icon2.png"
import icon3 from "../assets/images/about/icon3.png"

export const AboutCompany = () => {
  return (
    <div className="container flex mx-auto flex-col gap-8 py-20 lg:flex-row max-w-[70rem]">
      <div className="flex justify-center flex-shrink-0 items-center">
        <img src={aboutPicture} alt="man showing a catalogue" />
      </div>
      <div className="flex flex-col text-center lg:text-start">
        <h4 className=" text-2xl font-semibold">О компании</h4>
        <h2 className="py-5 text-5xl font-semibold">Вы заводите двигатель, и ваши приключения начинаются</h2>
        <p className="py-3 text-gray2">
          Ищете лучший автокредит с низкой ставкой? Забудьте о поиске лучшей ставки по кредиту. Позвольте нашей интеллектуальной
          технологии финансирования подобрать вам идеального кредитора и лучшую персональную ставку за считанные минуты.
        </p>
        <div className="flex justify-center gap-12 pt-6 xs:flex-row lg:justify-start">
          <div className="flex flex-col items-center gap-2">
            <img className="h-[39px]" src={icon1} alt="car icon" />
            <p className="text-5xl font-bold">20</p>
            <p className="text-gray2">Типы автомобилей</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img src={icon2} alt="car garage icon" />
            <p className="text-5xl font-bold">85</p>
            <p className="text-gray2">Пункты проката</p>
          </div>

          <div className="flex flex-col items-center gap-2">
            <img src={icon3} alt="car service icon" />
            <p className="text-5xl font-bold">75</p>
            <p className="text-gray2">Ремонтные мастерские</p>
          </div>
        </div>
      </div>
    </div>
  )
}
