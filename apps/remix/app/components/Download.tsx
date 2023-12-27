import appstore from "../assets/images/download/appstore.png"
import google from "../assets/images/download/google.png"

export const Download = () => {
  return (
    <div className=" bg-top bg-no-repeat lg:bg-download flex justify-center">
      <div className="container py-20">
        <div className="text-center lg:max-w-[43rem] lg:text-left">
          <h2 className="py-5 text-5xl font-semibold">
            Загрузите наше <span className="text-primary-600">приложение</span>, чтобы получить максимальную отдачу
          </h2>
          <p className="py-3 text-gray2">
            Вы когда-нибудь мечтали о спонтанных поездках, исследовании новых мест и полной независимости? Теперь все это у вас
            под рукой с нашим новым приложением для аренды автомобилей!
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 p-5 xs:flex-row lg:justify-start lg:pl-0">
          <div className="w-52 cursor-pointer shadow-xl transition-all hover:opacity-80">
            <img src={google} alt="google play" />
          </div>
          <div className="w-52 cursor-pointer shadow-xl transition-all hover:opacity-80">
            <img src={appstore} alt="app store" />
          </div>
        </div>
      </div>
    </div>
  )
}
