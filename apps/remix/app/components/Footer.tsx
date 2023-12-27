import { Link } from "react-router-dom"

export const Footer = () => {
  return (
    <footer>
      <div className="container py-10 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center justify-center">
              <h5 className="text-2xl font-medium">
                Аренда <span className="font-normal">автомобиля</span>
              </h5>
              <p className="py-2 text-center text-gray2">
                Мы предлагаем большой выбор автомобилей для всех ваших потребностей. У нас найдется идеальный автомобиль, который
                удовлетворит ваши требования.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3 p-2">
              <a href="tel:123-456-789" className="transition-all hover:text-primary-600">
                <div className="flex w-fit justify-center gap-2">
                  <div className="w-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2"></path>
                      <path d="M15 7a2 2 0 0 1 2 2"></path>
                      <path d="M15 3a6 6 0 0 1 6 6"></path>
                    </svg>
                  </div>

                  <div>
                    <p className="font-medium">+375 (29)-200-7890</p>
                  </div>
                </div>
              </a>
              <a href="mailto:email@example.com" className="transition-all hover:text-primary-600">
                <div className="flex justify-center gap-2">
                  <div className="w-6">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z"></path>
                      <path d="M3 7l9 6l9 -6"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium ">email@example.com</p>
                  </div>
                </div>
              </a>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center">
              <h5 className="pb-2 text-center text-2xl font-medium">КОМПАНИЯ</h5>
              <ul className="flex flex-col items-center p-2">
                <li className="w-fit cursor-pointer pb-2 transition-all hover:text-primary-600">Как мы работаем</li>
                <li className="w-fit cursor-pointer pb-2 transition-all  hover:text-primary-600">Минск</li>
                <li className="w-fit cursor-pointer pb-2 transition-all hover:text-primary-600">Карьера</li>
                <li className="w-fit cursor-pointer pb-2 transition-all hover:text-primary-600">Мобильная версия</li>
                <li className="w-fit cursor-pointer pb-2 transition-all hover:text-primary-600">Блог</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center">
              <h5 className="pb-2 text-center text-2xl font-medium">ЧАСЫ РАБОТЫ</h5>
              <ul className="whitespace-nowrap p-2 text-center">
                <li className="pb-2">Пн - Пт: 9:00 - 21:00</li>
                <li className="pb-2">Сб: 9:00 - 19:00</li>
                <li className="pb-2">Вс: Выходной</li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col">
            <div className="flex flex-col items-center justify-center">
              <h5 className="pb-2 text-center text-2xl font-medium">ПОДПИСКА</h5>
              <p className="p-2 text-center">Подписаться на последние новости и обновления</p>
            </div>
            <div className="m-2 flex flex-col gap-3 py-5">
              <input
                type="e-mail"
                minLength={5}
                maxLength={40}
                placeholder="Ваша почта"
                className="bg-gray3 px-7 py-4 text-center placeholder-gray2"
              />
              <button className="rounded px-7 py-4 font-medium bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-white shadow-lg shadow-orangeShadow transition-all hover:opacity-80">
                Отправить
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
