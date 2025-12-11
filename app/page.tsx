import Navigation from "./components/Navigation";
import MainSlider from "./components/MainSlider";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      <MainSlider />

      {/* Настояща изложба */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
              Настояща изложба: „Ренесанс"
            </h2>
            <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
              Проектът "Ренесанс" представя синтез между живопис и керамика, дело на шестима утвърдени български творци - Валентин Ангелов, Васил Стоев, Георги Миленов, Гергана Лалова, Евгения Георгиева и Михаил Лалов.
            </p>
            <p className="text-lg text-[#495464]/80 leading-relaxed mb-4">
              Обединени около идеята за художествено възраждане на керамиката, авторите търсят границите на формата, цвета и живописното мислене, трансформирани в триизмерната пластика на глината. В изложбата виждаме как преплетеното между традицията и съвременността, между класическата живопис и модерната пластика, се превръща в смисъл и визуално изживяване.
            </p>
            <p className="text-lg text-[#495464]/80 leading-relaxed mb-6">
              Изложбата ще се проведе от 24 до 30 ноември в галерия nOva art space, ул. Съборна №3 (ниво -1). Откриването е на 24 ноември от 18:00ч.
            </p>
            <p className="text-base text-[#495464]/70 mb-8 italic">
              Проектът се осъществява със средствата на Recovery and Resilience Plan и подкрепата на Национале фонд "Култура".
            </p>
            <Link
              href="/izlozhbi"
              className="inline-block bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-colors"
            >
              Разгледай изложбата
            </Link>
          </div>
        </div>
      </section>

      {/* Организирай събитие */}
      <section className="py-16 bg-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-4">
              nOva art space – сцена за Вашите идеи
            </h2>
            <h3 className="text-xl md:text-2xl text-[#495464]/90 mb-6 font-medium">
              Пространство, създадено да издига всяка идея — с възможностите на галерия и въздействието на премиум локация.
            </h3>
            <Link
              href="/subitiya"
              className="inline-block bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-colors"
            >
              Изпрати запитване
            </Link>
          </div>
        </div>
      </section>

      {/* За nOva art space */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-6">
              Галерия с история на две поколения и поглед към бъдещето
            </h2>
            <p className="text-lg text-[#495464]/80 leading-relaxed mb-8">
              nOva art space е съвременна галерия и премиум пространство за събития, което съчетава изкуство, архитектура и бизнес визия.
            </p>
            <p className="text-lg text-[#495464]/80 leading-relaxed mb-8">
              Нашият фокус е върху стойностни произведения — от големите български майстори до силни съвременни автори — представени в среда, създадена за фокус, усещане и престиж.
            </p>
            <Link
              href="/za-nas"
              className="inline-block bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-colors"
            >
              Научи повече
            </Link>
          </div>
        </div>
      </section>

      {/* Новини и акценти */}
      <section className="py-16 bg-[#E8E8E8]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-4">
              Новини и акценти
            </h2>
            <p className="text-lg text-[#495464]/80 leading-relaxed mb-8">
              Следете последните изложби, събития и инициативи на nOva art space.
            </p>
            <p className="text-lg text-[#495464]/80 leading-relaxed mb-8">
              Тук споделяме моменти, които оформят нашата културна и професионална динамика.
            </p>
            <Link
              href="/novini"
              className="inline-block bg-[#495464] text-white px-8 py-3 rounded-md font-medium hover:bg-[#495464]/90 transition-colors"
            >
              Виж всички новини
            </Link>
          </div>
        </div>
      </section>

      {/* Контакти */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-[#495464] mb-8">
              Свържете се с нас
            </h2>
            <div className="space-y-4 text-lg text-[#495464]/80">
              <div>
                <strong className="text-[#495464]">Адрес:</strong>{" "}
                <a
                  href="https://maps.google.com/?q=ул.+Съборна+№+3,+София"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#495464] underline"
                >
                  гр. София, ул. Съборна № 3, ниво -1
                </a>
              </div>
              <div>
                <strong className="text-[#495464]">Телефон:</strong>{" "}
                <a
                  href="tel:0888426610"
                  className="hover:text-[#495464] underline"
                >
                  0888 426 610
                </a>
              </div>
              <div>
                <strong className="text-[#495464]">Имейл:</strong>{" "}
                <a
                  href="mailto:novaartspace@gmail.com"
                  className="hover:text-[#495464] underline"
                >
                  novaartspace@gmail.com
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <a
                  href="https://www.instagram.com/nova_art_space/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495464] hover:text-[#495464]/80 underline"
                >
                  Instagram
                </a>
                <a
                  href="https://www.facebook.com/artspacenOva"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#495464] hover:text-[#495464]/80 underline"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#495464] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#BBBFCA]">
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}
