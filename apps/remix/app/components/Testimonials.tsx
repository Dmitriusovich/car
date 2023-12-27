import { testimonials } from "../data/AllData"
import { TestimonialsPost } from "./TestimonialsPost"

export const Testimonials = () => {
  return (
    <div className="container py-20 mx-auto">
      <div className="text-center">
        <h3 className="text-2xl font-semibold">Проверено людьми</h3>
        <h2 className="py-5 text-5xl font-semibold">
          Отзывы <span className="text-primary-600">клиентов</span>
        </h2>
        <p className="py-3 text-gray2">
          Узнайте, какое положительное влияние мы оказали на наших клиентов, прочитав их отзывы. Наши клиенты испытали на себе
          наши услуги и результаты, и они охотно делятся своим положительным опытом с вами.
        </p>
      </div>
      <div className="flex flex-col items-center justify-center gap-10 py-10 lg:flex-row">
        {testimonials.map((testimonial) => (
          <TestimonialsPost
            author={testimonial.author}
            opinion={testimonial.opinion}
            picture={testimonial.picture}
            place={testimonial.place}
            key={testimonial.id}
          />
        ))}
      </div>
    </div>
  )
}
