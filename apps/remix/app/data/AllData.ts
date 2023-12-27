import audi1 from "../assets/images/cars-big/audi-box.png"
import audi2 from "../assets/images/cars-big/audia1.jpg"
import mercedes1 from "../assets/images/cars-big/benz-box.png"
import mercedes2 from "../assets/images/cars-big/benz.jpg"
import bmw1 from "../assets/images/cars-big/bmw-box.png"
import bmw2 from "../assets/images/cars-big/bmw320.jpg"
import golf1 from "../assets/images/cars-big/golf6-box.png"
import golf2 from "../assets/images/cars-big/golf6.jpg"
import cc1 from "../assets/images/cars-big/passat-box.png"
import cc2 from "../assets/images/cars-big/passatcc.png"
import camry1 from "../assets/images/cars-big/toyota-box.png"
import camry2 from "../assets/images/cars-big/toyotacamry.jpg"

import miller from "../assets/images/team/1.png"
import diaz from "../assets/images/team/2.png"
import ross from "../assets/images/team/3.png"
import rivera from "../assets/images/team/4.png"
import rizz from "../assets/images/team/5.png"
import hunt from "../assets/images/team/6.png"

import johnDoe from "../assets/images/team/5.png"
import janeDoe from "../assets/images/team/6.png"

// VEHICLES
export const vehicles = [
  {
    id: 1,
    brand: "Audi",
    model: "A1",
    line: "S-Line",
    doors: "2/3",
    transmission: "manual",
    fuel: "Diesel",
    cost: "$45",
    image1: audi1,
    image2: audi2,
    ac: "yes",
    year: "2012",
  },

  {
    id: 2,
    brand: "Volkswagen",
    model: "Golf",
    doors: "4/5",
    transmission: "automatic",
    fuel: "Diesel",
    cost: "$37",
    image1: golf1,
    image2: golf2,
    ac: "yes",
    year: "2008",
  },

  {
    id: 3,
    brand: "Toyota",
    model: "Camry",
    doors: "4/5",
    transmission: "manual",
    fuel: "Petrol",
    cost: "$30",
    image1: camry1,
    image2: camry2,
    ac: "yes",
    year: "2006",
  },
  {
    id: 4,
    brand: "BMW",
    model: "320",
    line: "Modern-Line",
    doors: "4/5",
    transmission: "automatic",
    fuel: "Diesel",
    cost: "$35",
    image1: bmw1,
    image2: bmw2,
    ac: "yes",
    year: "2012",
  },
  {
    id: 5,
    brand: "Mercedes-Benz",
    model: "GLK",
    doors: "4/5",
    transmission: "automatic",
    fuel: "Diesel",
    cost: "$50",
    image1: mercedes1,
    image2: mercedes2,
    ac: "yes",
    year: "2006",
  },
  {
    id: 6,
    brand: "Volkswagen",
    model: "Passat CC",
    doors: "4/5",
    transmission: "automatic",
    fuel: "Petrol",
    cost: "$25",
    image1: cc1,
    image2: cc2,
    ac: "yes",
    year: "2008",
  },
]

// PEOPLE
export const people = [
  {
    id: 1,
    name: "Стоянович Рома",
    position: "Директор",
    image: diaz,
  },
  {
    id: 2,
    name: "Костюк Илья",
    position: "Продавец",
    image: miller,
  },
  {
    id: 3,
    name: "Рябцева Яна",
    position: "Автослесарь",
    image: ross,
  },
  {
    id: 4,
    name: "Булка Галя",
    position: "Фотограф",
    image: rivera,
  },
  {
    id: 5,
    name: "Чилей Дима",
    position: "Механик",
    image: rizz,
  },
  {
    id: 6,
    name: "Полуянчик Виталик",
    position: "Менеджер",
    image: hunt,
  },
]

// FAQ
export const faq = [
  {
    id: 1,
    question: "Что особенного в сравнении предложений по аренде автомобилей?",
    answer:
      "Сравнение предложений по аренде автомобилей очень важно, поскольку оно помогает найти наилучшую сделку, соответствующую вашему бюджету и требованиям, гарантируя, что вы получите максимальную выгоду за свои деньги. Сравнивая различные варианты, вы можете найти предложения, предлагающие более низкие цены, дополнительные услуги или лучшие модели автомобилей. Вы можете найти предложения по аренде автомобилей, изучив информацию в Интернете и сравнив цены в различных прокатных компаниях.",
  },
  {
    id: 2,
    question: "Как найти предложения по аренде автомобилей?",
    answer:
      "Вы можете найти предложения по аренде автомобилей, поискав информацию в Интернете и сравнив цены в разных прокатных компаниях. Такие сайты, как Expedia, Kayak и Travelocity, позволяют сравнивать цены и просматривать доступные варианты аренды. Также рекомендуется подписаться на рассылку новостей по электронной почте и следить за компаниями по прокату автомобилей в социальных сетях, чтобы быть в курсе любых специальных предложений или акций.",
  },
  {
    id: 3,
    question: "Как найти такие низкие цены на аренду автомобилей?",
    answer:
      "Бронируйте заранее: Заблаговременное бронирование автомобиля в аренду часто приводит к снижению цен. Сравните цены у нескольких компаний: Используйте такие сайты, как Kayak, Expedia или Travelocity, чтобы сравнить цены в нескольких компаниях по прокату автомобилей. Ищите коды скидок и купоны: Ищите коды скидок и купоны, которые можно использовать для снижения цены аренды. Аренда за пределами аэропорта иногда может привести к более низким ценам.",
  },
]

// LOCATIONS
export const locations = ["Cracow", "Gdansk", "Poznan", "Warsaw", "Wroclaw"]

// TESTIMONIALS
export const testimonials = [
  {
    id: 1,
    author: "Платонов Иван",
    opinion:
      "Мы арендовали автомобиль на этом сайте и получили потрясающий опыт! Бронирование было простым, а цены на аренду очень доступными.",
    place: "Павлово, Брестская область",
    picture: johnDoe,
  },
  {
    id: 2,
    author: "Бугаенко Вера",
    opinion:
      "Автомобиль был в отличном состоянии и сделал нашу поездку еще лучше. Очень рекомендую этот сайт по аренде автомобилей!",
    place: "Лысково, Брестская область",
    picture: janeDoe,
  },
]
