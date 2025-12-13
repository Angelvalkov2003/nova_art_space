import Navigation from "../components/Navigation";
import Link from "next/link";
import {
  IconOffice,
  IconBuilding,
  IconTheater,
  IconStairs,
  IconSpeaker,
  IconTV,
  IconLightBulb,
  IconDoor,
  IconPalette,
  IconShirt,
  IconNewspaper,
  IconBriefcase,
  IconChampagne,
  IconHandshake,
} from "../components/Icons";

export default function Subitiya() {
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

        <div className="flex items-center gap-3 mb-6">
          <span className="w-12 h-0.5 bg-[#495464]"></span>
          <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
            Събития
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-6">
          nOva art space – сцена за Вашите идеи
        </h1>
        <h2 className="text-2xl md:text-3xl text-[#495464]/90 mb-12 font-medium leading-relaxed">
          Пространство, създадено да издига всяка идея — с възможностите на
          галерия и въздействието на премиум локация.
        </h2>

        {/* Какво предлагаме */}
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              Услуги
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-12">
            Какво предлагаме
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconOffice className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                400 кв.м адаптивно пространство
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Гъвкава архитектура, която позволява изграждане на различни
                формати — от корпоративни срещи и коктейли до модни и PR
                събития. Пространството се персонализира спрямо концепцията на
                вашия бранд.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconBuilding className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Високи тавани за премиум присъствие
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Впечатляващ вертикален обем, който създава усещане за свобода,
                стил и престиж — идеална среда за събития, които искат да
                оставят следа.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconTheater className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Професионален подиум / сцена
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Изцяло оборудвана зона за презентации, модни ревюта, дискусии и
                специални акценти. Сцената е проектирана да поставя фокуса там,
                където трябва да бъде — върху вашето послание.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconStairs className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Ескалаторен достъп
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Уникален елемент, който предлага запомнящо се влизане и
                максимално удобство. Детайл, който подсилва усещането за премиум
                пространство още от първата секунда.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconSpeaker className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Професионално озвучаване
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Висококачествена аудио система с професионални микрофони,
                тонколони и аудио пулт, гарантиращи кристален и равномерен звук
                за всякакъв тип формати — реч, музика, лайв изпълнения.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconTV className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Мултимедийна техника и брандинг решения
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Екрани 75" и 55", възможности за визуална идентичност и
                дигитални акценти. Подходящо за презентации, премиери,
                продуктови активации и корпоративни събития.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconLightBulb className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Галерийно осветление
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Професионално светлинно оформление, което подчертава детайла и
                създава отлична атмосфера за фото, видео и premium имидж
                комуникация.
              </p>
            </div>

            <div className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] hover:shadow-md transition-all duration-300 hover:bg-[#E8E8E8]/50">
              <IconDoor className="w-10 h-10 mb-4 text-[#495464]" />
              <h3 className="text-xl font-bold text-[#495464] mb-3">
                Депо / Backstage зона
              </h3>
              <p className="text-[#495464]/80 leading-relaxed">
                Функционално оборудвана бекстейдж площ за подготовка на
                участници, екип и логистика — идеална за модни ревюта,
                артистични формати и корпоративни събития със сложна
                организация.
              </p>
            </div>
          </div>
        </div>

        {/* Подходящо за */}
        <div className="mb-16 bg-gradient-to-br from-[#E8E8E8] to-[#F5F5F5] p-8 md:p-12 rounded-lg border border-[#E8E8E8] shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <span className="w-12 h-0.5 bg-[#495464]"></span>
            <span className="text-sm font-semibold text-[#495464] uppercase tracking-wider">
              Формати
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-8">
            Подходящо за:
          </h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <IconPalette className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">Изложби</span>
            </div>
            <div className="flex items-start gap-3">
              <IconBriefcase className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">
                Корпоративни срещи и презентации
              </span>
            </div>
            <div className="flex items-start gap-3">
              <IconNewspaper className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">
                PR и медийни събития
              </span>
            </div>
            <div className="flex items-start gap-3">
              <IconShirt className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">
                Модни формати и продуктови премиери
              </span>
            </div>
            <div className="flex items-start gap-3">
              <IconChampagne className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">
                Частни коктейли и специални поводи
              </span>
            </div>
            <div className="flex items-start gap-3">
              <IconHandshake className="w-5 h-5 mt-1 text-[#495464]" />
              <span className="text-lg text-[#495464]/80">
                Ексклузивни бизнес срещи и networking събития
              </span>
            </div>
          </div>
        </div>

        {/* Общо послание */}
        <div className="mb-12 bg-white/60 backdrop-blur-sm rounded-lg p-8 border-l-4 border-[#495464]">
          <p className="text-xl text-[#495464] leading-relaxed italic">
            В nOva art space пространството не е просто фон — то е активен
            елемент, който оформя впечатление, стил и стойност. Вашето събитие
            става изживяване, което гостите помнят.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <a
            href="mailto:novaartspace@gmail.com?subject=Запитване за събитие"
            className="inline-flex items-center gap-2 bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-lg hover:scale-105 group"
          >
            Изпрати запитване
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
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
