import arrowRight from "../assets/icons/arrow-right.png"
import icon1 from "../assets/images/chooseUs/icon1.png"
import icon2 from "../assets/images/chooseUs/icon2.png"
import icon3 from "../assets/images/chooseUs/icon3.png"
import car from "../assets/images/chooseUs/main.png"
import { ChooseUnit } from "./ChooseUnit"

export const Choose = () => {
  return (
    <div className="bg-choose bg-left-bottom bg-no-repeat flex justify-center">
      <div className="container">
        <div className="flex justify-center pb-20">
          <img className="w-full lg:w-[80%]" src={car} alt="three cars" />
        </div>
        <div className="flex flex-col lg:flex-row">
          <div className="flex flex-col items-center justify-center lg:w-fit">
            <h3 className="text-center text-2xl font-semibold">Почему выбирают нас?</h3>
            <h2 className="py-5 text-center text-5xl font-semibold">
              Лучшие <span className="text-primary-600">предложения</span>, которые вы когда-либо найдете
            </h2>
            <p className="py-3 text-gray2">
              Откройте для себя лучшие предложения, которые вы когда-либо находили, благодаря нашим непревзойденным предложениям.
              Мы стремимся предоставить вам лучшее соотношение цены и качества, чтобы вы могли наслаждаться высококачественными
              услугами и продуктами, не разоряя банк. Наши предложения разработаны для того, чтобы вы получили максимальную выгоду
              от аренды, поэтому не упустите свой шанс сэкономить.
            </p>
            <button
              className="my-5 flex min-w-[163px] items-center gap-1 rounded bg-primary-600 hover:bg-primary-700 active:bg-primary-800 px-7 py-4 font-medium text-white shadow-lg shadow-orangeShadow transition-all hover:opacity-80"
              onClick={() => window.scrollTo(0, 0)}
            >
              Узнать подробности
              <img className="inline-block w-4" src={arrowRight} alt="arrow right" />
            </button>
          </div>
          <div className="flex flex-col gap-10 py-10">
            <ChooseUnit
              picture={icon1}
              header="Водитель на автомобиле"
              paragraph="Поднимите свой опыт вождения на новый уровень с нашими первоклассными автомобилями для путешествий по стране."
            />
            <ChooseUnit
              picture={icon2}
              header="Цены на все включено"
              paragraph='Получите все, что вам нужно, по одной удобной и прозрачной цене благодаря нашей ценовой политике "все включено".'
            />
            <ChooseUnit
              picture={icon3}
              header="Отсутствие скрытых платежей"
              paragraph="Наслаждайтесь душевным спокойствием благодаря нашей политике отсутствия скрытых платежей. Мы верим в прозрачное и честное ценообразование."
            />
          </div>
        </div>
      </div>
    </div>
  )
}
