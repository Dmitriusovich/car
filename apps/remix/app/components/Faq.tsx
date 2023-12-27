import { useState } from "react"
import { faq } from "../data/AllData"

export const Faq = () => {
  const [activeButtonId, setActiveButtonId] = useState(0)

  const toggle = (id: number) => {
    if (activeButtonId === id) {
      setActiveButtonId(0)
    } else {
      setActiveButtonId(id)
    }
  }

  return (
    <div className="mb-20 bg-faq bg-left-bottom bg-no-repeat flex justify-center">
      <div className="container py-20">
        <div className="z-10 text-center">
          <h3 className="text-2xl font-semibold">FAQ</h3>
          <h2 className="py-5 text-5xl font-semibold">
            Часто <span className="text-primary-600">задаваемые</span> вопросы
          </h2>
          <p className="py-3 text-gray2">
            Часто задаваемые вопросы о процессе бронирования аренды автомобиля на нашем сайте: Ответы на часто задаваемые вопросы
            и вопросы.
          </p>
        </div>
        <div className="mx-auto w-full py-10 lg:max-w-[50rem]">
          {faq.map((item) => (
            <div className="flex flex-col shadow-xl" key={item.id} onClick={() => toggle(item.id)}>
              <div
                className={`flex cursor-pointer items-center justify-between gap-5 px-8 py-5 shadow-lg transition-all ${
                  activeButtonId === item.id
                    ? "z-[1] bg-primary-600 hover:bg-primary-700 active:bg-primary-800 text-black shadow-orangeShadow"
                    : "bg-white text-black"
                }`}
              >
                <div className={`text-lg font-medium text-black ${activeButtonId === item.id ? "text-white" : "text-black"}`}>
                  {item.id}. {item.question}
                </div>
                <div className="w-6">
                  <svg
                    className={`h-6 w-6 transition-all duration-300 ${activeButtonId === item.id ? "rotate-18" : ""}`}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path
                      className={`h-6 w-6 transition-all duration-300 ${
                        activeButtonId === item.id ? " text-white" : "text-black"
                      }`}
                      d="M6 9l6 6l6 -6"
                    ></path>
                  </svg>
                </div>
              </div>

              <div
                className={`grid cursor-pointer bg-white text-gray2 shadow-xl transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] ${
                  activeButtonId === item.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-8 py-5  text-black">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
