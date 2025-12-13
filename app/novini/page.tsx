import Navigation from "../components/Navigation";
import Link from "next/link";
import {
  IconTrophy,
  IconShirt,
  IconBuilding,
  IconChat,
  IconCamera,
  IconFacebook,
  IconVideo,
} from "../components/Icons";

export default function Novini() {
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
            Новини
          </span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-[#495464] mb-6">
          Новини и акценти
        </h1>
        <p className="text-xl text-[#495464]/80 mb-12 leading-relaxed">
          Следете последните изложби, събития и инициативи на nOva art space.
        </p>

        <div className="space-y-16">
          {/* Новина 1 */}
          <article className="pb-12 border-b-2 border-[#E8E8E8] hover:bg-[#E8E8E8]/20 transition-colors duration-300 rounded-lg p-6 -m-6">
            <div className="flex items-start gap-4 mb-4">
              <IconTrophy className="w-10 h-10 text-[#495464] flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-4">
                  Конкурс за млади автори „SCULPTING THE FUTURE"
                </h2>
                <h3 className="text-xl md:text-2xl text-[#495464]/90 mb-6 font-medium">
                  nOva art space даде сцена на новото поколение таланти.
                </h3>
                <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
                  С огромна радост обявяваме победителите в конкурса за млади
                  артисти Sculpting the future. Благодарим на над 150-те
                  кандидата, които изпратиха портфолиата си - вдъхновихте ни с
                  таланта, смелостта и разнообразието на идеите си.
                </p>
                <div className="mb-4">
                  <p className="text-lg font-semibold text-[#495464] mb-2">
                    Честито на:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-lg text-[#495464]/80 ml-4">
                    <li>Десислава Латинова - първо място</li>
                    <li>Стефан Коцев - второ място</li>
                    <li>Никола Цветанов - трето място</li>
                  </ul>
                </div>
                <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
                  Искаме да изразим своята дълбока благодарност към всички
                  участници.
                </p>
                <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
                  Нямаме търпение да споделим предстоящата самостоятелна изложба
                  на Десислава Латинова през 2026 г.
                </p>
                <p className="text-lg text-[#495464]/80 leading-relaxed">
                  Сърдечно благодарим и на @credissimo - нашия генерален
                  спонсор, чиято подкрепа направи възможно този конкурс да се
                  случи.
                </p>
              </div>
            </div>
          </article>

          {/* Новина 2 */}
          <article className="pb-12 border-b-2 border-[#E8E8E8] hover:bg-[#E8E8E8]/20 transition-colors duration-300 rounded-lg p-6 -m-6">
            <div className="flex items-start gap-4 mb-4">
              <IconShirt className="w-10 h-10 text-[#495464] flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-4">
                  Мода и изкуство: Бляскавото ревю на студентите и
                  преподавателите по мода на НБУ
                </h2>
                <h3 className="text-xl md:text-2xl text-[#495464]/90 mb-6 font-medium">
                  Галерийното пространство се превърна в моден подиум.
                </h3>
                <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
                  nOva art space бе домакин на бляскавото ревю на студентите и
                  преподавателите по мода на НБУ — изискано светско събитие,
                  което преобрази галерията в моден подиум с артистична визия.
                </p>
                <p className="text-lg text-[#495464]/80 leading-relaxed mb-4 flex items-start gap-2">
                  <IconVideo className="w-5 h-5 text-[#495464] flex-shrink-0 mt-0.5" />
                  <span>
                    Вижте моменти от вечерта — как светлината, естетиката и
                    динамичният дизайн превръщат nOva art space в предпочитан
                    избор за арт събития във всичките им форми.
                  </span>
                </p>
                <p className="text-lg text-[#495464]/80 leading-relaxed">
                  nOva art space — галерия, която живее с пулса на града и
                  създава стойност за вашия бранд.
                </p>
              </div>
            </div>
          </article>

          {/* Новина 3 */}
          <article className="pb-12 border-b-2 border-[#E8E8E8] hover:bg-[#E8E8E8]/20 transition-colors duration-300 rounded-lg p-6 -m-6">
            <div className="flex items-start gap-4 mb-4">
              <IconBuilding className="w-10 h-10 text-[#495464] flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-4">
                  Нов етап за nOva art space: разширено пространство и нови
                  възможности
                </h2>
                <h3 className="text-xl md:text-2xl text-[#495464]/90 mb-6 font-medium">
                  Галерията представи обновена визия и 400 кв.м премиум площ за
                  изложби и събития.
                </h3>
                <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
                  Новото пространство на nOva art space впечатлява със своята
                  архитектура, ескалаторен достъп, професионално оборудване и
                  възможности за реализиране на големи изложби и престижни
                  корпоративни събития.
                </p>
                <p className="text-lg text-[#495464]/80 leading-relaxed">
                  Разширението подчертава амбицията на галерията да бъде водещ
                  културен и бизнес хъб в София.
                </p>
              </div>
            </div>
          </article>

          {/* Новина 4 */}
          <article className="hover:bg-[#E8E8E8]/20 transition-colors duration-300 rounded-lg p-6 -m-6">
            <div className="flex items-start gap-4">
              <IconChat className="w-10 h-10 text-[#495464] flex-shrink-0" />
              <div className="flex-1">
                <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-4">
                  Открит разговор за съвременното изкуство и инвестиция ли е
                  изкуството в България?
                </h2>
                <div className="flex flex-col sm:flex-row gap-4 mt-6">
                  <a
                    href="https://www.instagram.com/p/DI1XiSmsE32/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#495464] hover:text-[#495464] font-medium transition-colors duration-300 hover:underline"
                  >
                    <IconCamera className="w-4 h-4 text-[#495464]" />
                    Виж в Instagram
                  </a>
                  <a
                    href="https://www.facebook.com/reel/1854580805335661"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-[#495464] hover:text-[#495464] font-medium transition-colors duration-300 hover:underline"
                  >
                    <IconFacebook className="w-4 h-4 text-[#495464]" />
                    Виж във Facebook
                  </a>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#495464] text-sm">
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}
