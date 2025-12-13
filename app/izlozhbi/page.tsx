import Navigation from "../components/Navigation";
import Link from "next/link";
import { IconCalendar, IconLocation, IconParty } from "../components/Icons";

export default function Izlozhbi() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        <Link
          href="/"
          className="inline-flex items-center gap-2 mb-8 text-[#495464] hover:text-[#495464] font-medium transition-colors duration-300 group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Назад към началната страница
        </Link>

        <div className="flex items-center gap-3 mb-8">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
            Изложби
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-12">
          Изложби
        </h1>

        {/* Настояща изложба */}
        <div className="mb-20 pb-16 border-b-2 border-[#E8E8E8] relative">
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#E8E8E8] rounded-full blur-3xl opacity-20 -ml-32 -mt-32"></div>
          <div className="relative z-10">
            <div className="mb-6">
              <span className="inline-flex items-center gap-2 bg-[#495464] text-white px-5 py-2 rounded-full text-sm font-medium shadow-md">
                <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                Настояща
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
              „Ренесанс"
            </h2>
            <div className="space-y-4 mb-6">
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Проектът "Ренесанс" представя синтез между живопис и керамика,
                дело на шестима утвърдени български творци - Валентин Ангелов,
                Васил Стоев, Георги Миленов, Гергана Лалова, Евгения Георгиева и
                Михаил Лалов.
              </p>
              <p className="text-lg text-[#495464]/80 leading-relaxed">
                Обединени около идеята за художествено възраждане на керамиката,
                авторите търсят границите на формата, цвета и живописното
                мислене, трансформирани в триизмерната пластика на глината. В
                изложбата виждаме как преплетеното между традицията и
                съвременността, между класическата живопис и модерната пластика,
                се превръща в смисъл и визуално изживяване.
              </p>
            </div>
            <div className="bg-[#E8E8E8]/50 rounded-lg p-6 mb-6 border-l-4 border-[#495464]">
              <div className="space-y-2">
                <p className="text-lg text-[#495464]/90 leading-relaxed font-medium flex items-center gap-2">
                  <IconCalendar className="w-5 h-5 text-[#495464]" />
                  Изложбата ще се проведе от 24 до 30 ноември
                </p>
                <p className="text-base text-[#495464]/70 flex items-center gap-2">
                  <IconLocation className="w-5 h-5 text-[#495464]" />
                  Галерия nOva art space, ул. Съборна №3 (ниво -1)
                </p>
                <p className="text-base text-[#495464]/70 flex items-center gap-2">
                  <IconParty className="w-5 h-5 text-[#495464]" />
                  Откриването е на 24 ноември от 18:00ч.
                </p>
              </div>
            </div>
            <p className="text-base text-[#495464]/70 italic border-l-2 border-[#BBBFCA] pl-4">
              Проектът се осъществява със средствата на Recovery and Resilience
              Plan и подкрепата на Национале фонд "Култура".
            </p>
          </div>
        </div>

        {/* Минали изложби */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              История
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-12">
            Минали изложби
          </h2>

          <div className="space-y-16">
            {/* COLLECTIVE PULSE */}
            <div className="pb-12 border-b border-[#E8E8E8] hover:bg-[#E8E8E8]/30 transition-colors duration-300 rounded-lg p-6 -m-6">
              <div className="mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#495464] mb-4">
                  COLLECTIVE PULSE
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-[#495464] mb-1">
                      Автори
                    </p>
                    <p className="text-[#495464]/70">
                      Илия Желев, Евгени Йонов, Борислав Георгиев, Илиана Илиева
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#495464] mb-1">
                      Дата
                    </p>
                    <p className="text-[#495464]/70">9-30 октомври 2025</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#495464] mb-1">
                      Куратор
                    </p>
                    <p className="text-[#495464]/70">Каролина Панаинте</p>
                  </div>
                </div>
                <p className="text-lg text-[#495464]/80 leading-relaxed">
                  Поп арт манифест на колективната енергия. Без рамки. Без
                  тишина. Само ритъм и цвят. Благодарим на всички, които усетиха
                  пулса на изкуството.
                </p>
              </div>
            </div>

            {/* Моят Дон Кихот */}
            <div className="pb-12 border-b border-[#E8E8E8] hover:bg-[#E8E8E8]/30 transition-colors duration-300 rounded-lg p-6 -m-6">
              <div className="mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#495464] mb-4">
                  Моят Дон Кихот
                </h3>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-[#495464] mb-1">
                    Автор
                  </p>
                  <p className="text-[#495464]/70">Васил Василев – Зуек</p>
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-[#495464]/80 leading-relaxed">
                    Изкуството събра своята публика. Откриването на изложбата на
                    Васил Василев-Зуека в nOva art space се превърна в изискано
                    културно събитие, което обедини артистичния свят, ценителите
                    и представители на светския и бизнес елит в София.
                  </p>
                  <p className="text-lg text-[#495464]/80 leading-relaxed">
                    Благодарим на всички, които споделиха този специален момент
                    с нас. @nova_art_space е пространство, в което съвременното
                    изкуство среща стойностна публика и нови хоризонти.
                  </p>
                </div>
              </div>
            </div>

            {/* НЕграфика */}
            <div className="pb-12 border-b border-[#E8E8E8] hover:bg-[#E8E8E8]/30 transition-colors duration-300 rounded-lg p-6 -m-6">
              <div className="mb-4">
                <h3 className="text-2xl md:text-3xl font-bold text-[#495464] mb-4">
                  „НЕграфика"
                </h3>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <p className="text-sm font-semibold text-[#495464] mb-1">
                      Автор
                    </p>
                    <p className="text-[#495464]/70">Людмил Георгиев</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#495464] mb-1">
                      Дата
                    </p>
                    <p className="text-[#495464]/70">26 март – 12 април 2025</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="text-lg text-[#495464]/80 leading-relaxed">
                    nOva art space представя „НЕграфика" - новата самостоятелна
                    изложбa на Людмил Георгиев. Може ли графиката да се превърне
                    в живопис? Отговорът можете да откриете в новите творби на
                    графика Людмил Георгиев.
                  </p>
                  <p className="text-lg text-[#495464]/80 leading-relaxed">
                    „НЕграфика" е изложба, която разчупва установените порядки в
                    графиката – графични платна с размери от порядъка на 150х110
                    см. или 120х80 см., с наситени и ярки цветове, които дават
                    експресивност и редят строфи в творбата, които се римуват в
                    линии и елементи, прерастващи в емоции.
                  </p>
                  <p className="text-lg text-[#495464]/80 leading-relaxed">
                    В тази изложба ще видим един различен Людмил Георгиев, които
                    чрез приобщаване на елементи от бита като автомобилно стъкло
                    и корк, той достига нови висоти в графиката. Той си играе и
                    с цветовете, и ги превръща в една инфузия, която напомня на
                    живопис. Куратори на изложбата са Каролина Панаинте и
                    Доротея Павлова.
                  </p>
                </div>
              </div>
            </div>

            {/* Колекцията */}
            <div className="pb-8 hover:bg-[#E8E8E8]/30 transition-colors duration-300 rounded-lg p-6 -m-6">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#495464] mb-4">
                  „Колекцията"
                </h3>
                <div className="mb-4">
                  <p className="text-sm font-semibold text-[#495464] mb-1">
                    Дата
                  </p>
                  <p className="text-[#495464]/70">27.02.2025</p>
                </div>
                <p className="text-lg text-[#495464]/80 leading-relaxed">
                  Представяме Ви част от специалната колекция от произведения на
                  едни от най-видните ни класици, подбрана за нашата публика.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-white/80 text-sm">
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}
