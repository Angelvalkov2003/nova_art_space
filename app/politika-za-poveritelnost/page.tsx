import Navigation from "../components/Navigation";
import Link from "next/link";
import { siteConfig } from "../lib/site-config";

export const metadata = {
  title: "Политика за Поверителност - nOva art space",
  description: "Политика за поверителност и защита на личните данни на nOva art space",
};

export default function PolitikaZaPoveritelnost() {
  return (
    <div className="min-h-screen bg-white">
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16">
        <Link
          href="/"
          className="back-button-animate inline-flex items-center gap-1.5 bg-[#495464] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#495464]/90 transition-all duration-300 hover:shadow-md hover:scale-105 group mb-8"
          style={{ fontFamily: "var(--font-playfair), serif" }}
        >
          <svg
            className="w-3.5 h-3.5 transition-transform duration-300 group-hover:-translate-x-1"
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
          <span
            className="text-sm font-semibold text-[#495464] uppercase tracking-wider"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Политика за Поверителност
          </span>
        </div>

        <div className="prose prose-lg max-w-none">
          <h1
            className="text-3xl md:text-4xl font-bold text-[#495464] mb-6"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            Политика за Поверителност
          </h1>

          <p
            className="text-base text-[#495464]/80 mb-6"
            style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
          >
            <strong>Последна актуализация:</strong> {new Date().toLocaleDateString('bg-BG', { year: 'numeric', month: 'long', day: 'numeric' })}
          </p>

          <div className="space-y-8">
            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                1. Въведение
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                nOva art space ("ние", "нас", "наш") се ангажираме да защитаваме вашата поверителност. 
                Тази Политика за Поверителност обяснява как събираме, използваме, разкриваме и защитаваме 
                вашата лична информация, когато посещавате нашия уебсайт или използвате нашите услуги.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                2. Лични данни, които събираме
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Когато използвате нашия уебсайт или се свържете с нас, можем да събираме следната информация:
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li><strong>Контактна информация:</strong> Имейл адрес, телефонен номер, име (когато използвате контактната форма)</li>
                <li><strong>Информация за комуникация:</strong> Съобщения, които изпращате чрез нашата контактна форма</li>
                <li><strong>Техническа информация:</strong> IP адрес (анонимизиран), тип браузър, операционна система, страници, които посещавате</li>
                <li><strong>Информация за съгласие:</strong> Вашето решение относно бисквитките се записва в cookie файл за период от 365 дни</li>
                <li><strong>Аналитични данни:</strong> Анонимна статистика за използването на уебсайта (само ако дадете съгласие за аналитични бисквитки)</li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                3. Как използваме вашите данни и правна основа
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Използваме събраната информация за следните цели и на съответната правна основа:
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li><strong>Отговор на вашите запитвания:</strong> Обработваме вашите контактни данни и съобщения за да отговорим на вашите запитвания. <em>Правна основа: изпълнение на договор или стъпки преди сключване на договор (GDPR чл. 6, ал. 1, буква "б")</em></li>
                <li><strong>Анализ на използването на уебсайта:</strong> Използваме Google Analytics за статистически цели и подобряване на уебсайта. <em>Правна основа: ваше съгласие (GDPR чл. 6, ал. 1, буква "а")</em></li>
                <li><strong>Спазване на правни задължения:</strong> Съхраняваме данни, когато това е изискано от закон. <em>Правна основа: правно задължение (GDPR чл. 6, ал. 1, буква "в")</em></li>
                <li><strong>Защита на правата и сигурността:</strong> Обработваме данни за защита на законните интереси. <em>Правна основа: законен интерес (GDPR чл. 6, ал. 1, буква "е")</em></li>
              </ul>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                4. Споделяне на данни с трети страни
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Не продаваме, не търгуваме и не предаваме вашите лични данни на трети страни, освен в следните случаи:
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4 mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li><strong>Google Analytics:</strong> Ако дадете съгласие за аналитични бисквитки, данните се споделят с Google LLC (САЩ) за аналитични цели. Google обработва данните в съответствие с техните политики за поверителност и използва стандартни договорни клаузи за защита на данните.</li>
                <li><strong>Доставчици на имейл услуги:</strong> Използваме Resend за изпращане на имейли от контактната форма. Те обработват само необходимите данни за изпълнение на услугата.</li>
                <li><strong>Хостинг провайдъри:</strong> Нашият уебсайт е хостиран на Vercel и Supabase, които обработват техническите данни за работата на уебсайта.</li>
                <li><strong>Правни изисквания:</strong> Когато е изисквано от закон или по заповед на съда</li>
                <li><strong>Защита на правата:</strong> За защита на правата, собствеността или сигурността на nOva art space</li>
              </ul>
              <p
                className="text-base text-[#495464]/70 leading-relaxed italic"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <strong>Важно:</strong> Когато данните се предават на трети страни извън ЕС/ЕИП (като Google в САЩ), 
                използваме стандартни договорни клаузи, одобрени от Европейската комисия, за да гарантираме адекватна 
                защита на вашите данни.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                5. Защита на данните и период на съхранение
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Прилагаме подходящи технически и организационни мерки за защита на вашите лични данни срещу 
                неоторизиран достъп, загуба, унищожаване или промяна. Въпреки това, никой метод за предаване 
                в интернет или електронно съхранение не е 100% сигурен.
              </p>
              <h3
                className="text-xl font-semibold text-[#495464] mb-3 mt-6"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                5.1. Период на съхранение на данните
              </h3>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li><strong>Контактни данни от формата:</strong> Съхраняваме до 2 години след последния контакт или до заявка за изтриване</li>
                <li><strong>Cookie съгласие:</strong> Съхранява се в cookie файл за период от 365 дни</li>
                <li><strong>Аналитични данни (Google Analytics):</strong> До 14 месеца (съгласно настройките на Google Analytics)</li>
                <li><strong>Технически логове:</strong> До 90 дни</li>
              </ul>
              <p
                className="text-base text-[#495464]/70 leading-relaxed mt-4 italic"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                След изтичане на периода на съхранение, данните се изтриват автоматично или анонимизират, 
                освен ако законът не изисква по-дълго съхранение.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                6. Вашите права
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                В съответствие с GDPR и българското законодателство, имате правото да:
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li>Достъп до вашите лични данни</li>
                <li>Корекция на неточни или непълни данни</li>
                <li>Изтриване на вашите данни ("право на забвение")</li>
                <li>Ограничаване на обработката на данните</li>
                <li>Преносимост на данните</li>
                <li>Възражение срещу обработката</li>
                <li>Оттегляне на съгласието по всяко време</li>
              </ul>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mt-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                За упражняване на тези права, моля свържете се с нас на:{" "}
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="text-[#495464] hover:underline font-semibold"
                >
                  {siteConfig.email}
                </a>
              </p>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mt-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Ще отговорим на вашата заявка в срок от 30 дни. Ако заявката е сложна или имаме много заявки, 
                можем да удължим срока с още 60 дни, като ви уведомим за това.
              </p>
              <h3
                className="text-xl font-semibold text-[#495464] mb-3 mt-6"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                6.1. Право на жалба до надзорен орган
              </h3>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Ако смятате, че обработката на вашите лични данни нарушава GDPR, имате право да подадете жалба 
                до надзорния орган в България:
              </p>
              <div
                className="bg-[#E8E8E8]/30 rounded-lg p-4 border border-[#E8E8E8] mt-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <p className="text-base text-[#495464] mb-2">
                  <strong>Комисия за защита на личните данни</strong>
                </p>
                <p className="text-base text-[#495464]/80 mb-2">
                  ул. "Проф. Цветан Лазаров" № 2, София 1592
                </p>
                <p className="text-base text-[#495464]/80 mb-2">
                  Телефон: 02 91 53 518
                </p>
                <p className="text-base text-[#495464]/80">
                  Уебсайт:{" "}
                  <a
                    href="https://www.cpdp.bg"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#495464] hover:underline"
                  >
                    www.cpdp.bg
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                7. Бисквитки (Cookies) и Технологии за Проследяване
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Нашият уебсайт използва бисквитки и подобни технологии за подобряване на функционалността 
                и анализиране на използването на уебсайта. Използваме cookie consent банер, който ви позволява 
                да изберете кои бисквитки да приемете.
              </p>
              
              <h3
                className="text-xl font-semibold text-[#495464] mb-3 mt-6"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                7.1. Видове бисквитки, които използваме
              </h3>
              
              <div className="space-y-4 mb-4">
                <div className="bg-[#E8E8E8]/30 rounded-lg p-4 border border-[#E8E8E8]">
                  <h4
                    className="text-lg font-semibold text-[#495464] mb-2"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Аналитични бисквитки (Google Analytics)
                  </h4>
                  <p
                    className="text-base text-[#495464]/80 leading-relaxed mb-2"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Използваме Google Analytics 4 (GA4) за да анализираме как посетителите използват нашия уебсайт. 
                    Тези бисквитки събират анонимна статистическа информация като:
                  </p>
                  <ul
                    className="list-disc list-inside space-y-1 text-base text-[#495464]/80 ml-4"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    <li>Брой посетители и страници, които посещават</li>
                    <li>Времето, прекарано на уебсайта</li>
                    <li>Как посетителите са достигнали до нашия уебсайт</li>
                    <li>IP адреси (анонимизирани)</li>
                    <li>Тип браузър и устройство</li>
                  </ul>
                  <p
                    className="text-base text-[#495464]/80 leading-relaxed mt-2"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    <strong>Правна основа:</strong> Вашето съгласие (GDPR чл. 6, ал. 1, буква "а")<br />
                    <strong>Период на съхранение:</strong> До 14 месеца<br />
                    <strong>Трета страна:</strong> Google LLC (САЩ) - обработва данните в съответствие с 
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-[#495464] hover:underline font-medium"> Google Privacy Policy</a> и 
                    <a href="https://business.safety.google/adsprocessorterms/" target="_blank" rel="noopener noreferrer" className="text-[#495464] hover:underline font-medium"> Google Analytics Terms</a>
                  </p>
                  <p
                    className="text-sm text-[#495464]/70 leading-relaxed mt-2 italic"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    <strong>Важно:</strong> Google Analytics се зарежда само след като дадете изрично съгласие 
                    чрез нашия cookie consent банер. Можете да оттеглите съгласието си по всяко време чрез настройките 
                    на бисквитките или като изтриете cookie файла "cookie_consent" от вашия браузър.
                  </p>
                </div>
              </div>

              <h3
                className="text-xl font-semibold text-[#495464] mb-3 mt-6"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                7.2. Управление на бисквитките
              </h3>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Можете да управлявате вашите предпочитания за бисквитки по следните начини:
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4 mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li>Чрез нашия cookie consent банер в долната част на страницата</li>
                <li>Чрез настройките на вашия браузър (настройки → поверителност → бисквитки)</li>
                <li>Като изтриете съществуващите бисквитки от вашия браузър</li>
              </ul>
              <p
                className="text-base text-[#495464]/70 leading-relaxed italic"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <strong>Забележка:</strong> Отказът от аналитични бисквитки няма да повлияе на основната 
                функционалност на уебсайта, но няма да можем да анализираме използването му.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                8. Трансфер на данни извън Европейския съюз
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Някои от нашите доставчици на услуги (като Google Analytics) са базирани извън Европейския съюз. 
                Когато предаваме вашите данни на такива доставчици, използваме следните защитни механизми:
              </p>
              <ul
                className="list-disc list-inside space-y-2 text-lg text-[#495464]/80 ml-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <li><strong>Стандартни договорни клаузи:</strong> Използваме стандартни договорни клаузи, одобрени от Европейската комисия, които гарантират адекватна защита на вашите данни</li>
                <li><strong>Адекватност:</strong> Някои страни имат решение за адекватност от Европейската комисия</li>
                <li><strong>Други гаранции:</strong> Използваме допълнителни технически и организационни мерки за защита</li>
              </ul>
              <p
                className="text-base text-[#495464]/70 leading-relaxed mt-4 italic"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Ако искате повече информация за защитните механизми, които използваме, моля свържете се с нас.
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                9. Промени в политиката
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Запазваме си правото да актуализираме тази Политика за Поверителност по всяко време. 
                Всички промени ще бъдат публикувани на тази страница с актуализирана дата. Препоръчваме 
                ви да преглеждате тази страница периодично. При значителни промени ще ви уведомим чрез 
                уведомление на уебсайта или по имейл (ако имаме вашия имейл адрес).
              </p>
            </section>

            <section>
              <h2
                className="text-2xl font-bold text-[#495464] mb-4"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                10. Контакт
              </h2>
              <p
                className="text-lg text-[#495464]/80 leading-relaxed mb-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Ако имате въпроси относно тази Политика за Поверителност или искате да упражните вашите права, 
                моля свържете се с нас:
              </p>
              <div
                className="bg-[#E8E8E8]/30 rounded-lg p-6 border border-[#E8E8E8] mt-4"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                <p className="text-lg text-[#495464] mb-2">
                  <strong>{siteConfig.name}</strong>
                </p>
                <p className="text-base text-[#495464]/80 mb-2">
                  {siteConfig.address.city}, {siteConfig.address.street}
                </p>
                <p className="text-base text-[#495464]/80 mb-2">
                  Email:{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[#495464] hover:underline"
                  >
                    {siteConfig.email}
                  </a>
                </p>
                <p className="text-base text-[#495464]/80">
                  Телефон:{" "}
                  <a
                    href={`tel:${siteConfig.phone.replace(/\s/g, '')}`}
                    className="text-[#495464] hover:underline"
                  >
                    {siteConfig.phone}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>

      <footer className="bg-gradient-to-b from-[#495464] to-[#3a4149] text-white py-12 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            className="text-white/80 text-sm"
            style={{ fontFamily: "var(--font-playfair), serif" }}
          >
            © {new Date().getFullYear()} nOva art space. Всички права запазени.
          </p>
        </div>
      </footer>
    </div>
  );
}
