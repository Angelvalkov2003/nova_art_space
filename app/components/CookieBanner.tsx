"use client";

import { useEffect, useState } from "react";
import {
  getConsentCookie,
  hasConsentDecision,
  acceptAllCookies,
  rejectAllCookies,
  updateConsentPreferences,
  type ConsentPreferences,
} from "../lib/cookie-consent";

export default function CookieBanner() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<ConsentPreferences>({
    necessary: true,
    functional: false,
    analytics: false,
    performance: false,
    advertisement: false,
  });

  useEffect(() => {
    // Only show banner if user hasn't made a decision yet
    if (!hasConsentDecision()) {
      setShowBanner(true);
    } else {
      // Load existing preferences
      const consent = getConsentCookie();
      if (consent) {
        setPreferences(consent);
      }
    }
  }, []);

  const handleAcceptAll = () => {
    acceptAllCookies();
    setShowBanner(false);
    // Trigger custom event to notify GoogleAnalytics component
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { 
        detail: { analytics: true } 
      }));
    }
  };

  const handleReject = () => {
    rejectAllCookies();
    setShowBanner(false);
    // Trigger custom event to notify GoogleAnalytics component
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { 
        detail: { analytics: false } 
      }));
    }
  };

  const handleSaveSettings = () => {
    updateConsentPreferences(preferences);
    setShowSettings(false);
    setShowBanner(false);
    // Trigger custom event to notify GoogleAnalytics component
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent('cookieConsentUpdated', { 
        detail: { analytics: preferences.analytics } 
      }));
    }
  };

  const handleToggleCategory = (category: keyof ConsentPreferences) => {
    // Necessary cannot be disabled
    if (category === 'necessary') return;
    
    setPreferences((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-[#E8E8E8] shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 lg:py-6">
        {!showSettings ? (
          // Main banner view
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 sm:gap-4 lg:gap-6">
            <div className="flex-1">
              <h3
                className="text-[#495464] mb-1.5 sm:mb-2 text-base sm:text-lg lg:text-xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Бисквитки и поверителност
              </h3>
              <p
                className="text-[#495464]/80 leading-relaxed mb-1.5 text-xs sm:text-sm"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Използваме бисквитки, за да подобрим вашето изживяване и да
                анализираме използването на нашия уебсайт. Можете да изберете
                кои бисквитки да приемете.
              </p>
              <p
                className="text-[#495464]/70 text-xs"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                За повече информация вижте нашата{" "}
                <a
                  href="/politika-za-poveritelnost"
                  className="text-[#495464] hover:underline font-medium"
                >
                  Политика за поверителност
                </a>
                .
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full lg:w-auto">
              <button
                onClick={handleReject}
                className="px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm text-[#495464] bg-white border border-[#E8E8E8] rounded-md hover:bg-[#E8E8E8] transition-all duration-200 font-medium"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Отхвърли
              </button>
              <button
                onClick={() => setShowSettings(true)}
                className="px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm text-[#495464] bg-white border border-[#E8E8E8] rounded-md hover:bg-[#E8E8E8] transition-all duration-200 font-medium"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Настройки
              </button>
              <button
                onClick={handleAcceptAll}
                className="px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm text-white bg-[#495464] rounded-md hover:bg-[#3a4149] transition-all duration-200 font-medium"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Приеми всички
              </button>
            </div>
          </div>
        ) : (
          // Settings view
          <div className="space-y-3 sm:space-y-4">
            <div>
              <h3
                className="text-[#495464] mb-1.5 sm:mb-2 text-base sm:text-lg lg:text-xl"
                style={{ fontFamily: "var(--font-playfair), serif" }}
              >
                Настройки на бисквитките
              </h3>
              <p
                className="text-[#495464]/80 text-xs sm:text-sm"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Използваме бисквитки, за да ви помогнем да навигирате ефективно и да изпълнявате определени функции. 
                Ще намерите подробна информация за всички бисквитки под всяка категория за съгласие по-долу.
              </p>
              <p
                className="text-[#495464]/70 text-xs mt-1.5 sm:mt-2"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Бисквитките, които са категоризирани като "Необходими", се съхраняват във вашия браузър, 
                тъй като са от съществено значение за активиране на основните функции на сайта.
              </p>
            </div>

            <div className="space-y-2 sm:space-y-3">
              {/* Necessary Cookies - Always Active */}
              <div className="flex items-center justify-between p-2.5 sm:p-3 lg:p-4 bg-[#E8E8E8]/30 rounded-md border border-[#E8E8E8] opacity-75">
                <div className="flex-1 pr-2 sm:pr-3 lg:pr-4">
                  <div className="flex items-center gap-1.5 sm:gap-2 mb-0.5 sm:mb-1">
                    <h4
                      className="text-[#495464] font-medium text-xs sm:text-sm"
                      style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                    >
                      Необходими бисквитки
                    </h4>
                    <span className="text-[10px] sm:text-xs text-[#495464]/60 bg-[#E8E8E8] px-1.5 sm:px-2 py-0.5 rounded">
                      Винаги активни
                    </span>
                  </div>
                  <p
                    className="text-[#495464]/70 text-[11px] sm:text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Необходимите бисквитки са задължителни за основната функционалност на сайта, 
                    като защитено влизане или настройка на вашите предпочитания за съгласие. 
                    Тези бисквитки не съхраняват лично идентифицируеми данни.
                  </p>
                </div>
                <div className="ml-2 sm:ml-3 lg:ml-4 shrink-0">
                  <div className="w-9 h-5 sm:w-10 sm:h-5.5 lg:w-11 lg:h-6 bg-[#495464] rounded-full flex items-center justify-end px-0.5 sm:px-1">
                    <div className="w-4 h-4 sm:w-4.5 sm:h-4.5 lg:w-5 lg:h-5 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Functional Cookies */}
              <div className="flex items-center justify-between p-2.5 sm:p-3 lg:p-4 bg-[#E8E8E8]/30 rounded-md border border-[#E8E8E8]">
                <div className="flex-1 pr-2 sm:pr-3 lg:pr-4">
                  <h4
                    className="text-[#495464] font-medium mb-0.5 sm:mb-1 text-xs sm:text-sm"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Функционални бисквитки
                  </h4>
                  <p
                    className="text-[#495464]/70 text-[11px] sm:text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Функционалните бисквитки помагат за изпълнение на определени функции като споделяне 
                    на съдържанието на уебсайта в социалните мрежи, събиране на обратна връзка и други 
                    функции на трети страни.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-2 sm:ml-3 lg:ml-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.functional}
                    onChange={() => handleToggleCategory('functional')}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 sm:w-10 sm:h-5.5 lg:w-11 lg:h-6 bg-[#bbbfca] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#495464] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E8E8E8] after:border after:rounded-full after:h-4 after:w-4 sm:after:h-4.5 sm:after:w-4.5 lg:after:h-5 lg:after:w-5 after:transition-all peer-checked:bg-[#495464]"></div>
                </label>
              </div>

              {/* Analytics Cookies */}
              <div className="flex items-center justify-between p-2.5 sm:p-3 lg:p-4 bg-[#E8E8E8]/30 rounded-md border border-[#E8E8E8]">
                <div className="flex-1 pr-2 sm:pr-3 lg:pr-4">
                  <h4
                    className="text-[#495464] font-medium mb-0.5 sm:mb-1 text-xs sm:text-sm"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Аналитични бисквитки
                  </h4>
                  <p
                    className="text-[#495464]/70 text-[11px] sm:text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Аналитичните бисквитки се използват за разбиране как посетителите взаимодействат с уебсайта. 
                    Тези бисквитки помагат да се предостави информация за метрики като броя посетители, 
                    процент на отказ, източник на трафик и др. Използваме Google Analytics.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-2 sm:ml-3 lg:ml-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.analytics}
                    onChange={() => handleToggleCategory('analytics')}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 sm:w-10 sm:h-5.5 lg:w-11 lg:h-6 bg-[#bbbfca] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#495464] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E8E8E8] after:border after:rounded-full after:h-4 after:w-4 sm:after:h-4.5 sm:after:w-4.5 lg:after:h-5 lg:after:w-5 after:transition-all peer-checked:bg-[#495464]"></div>
                </label>
              </div>

              {/* Performance Cookies */}
              <div className="flex items-center justify-between p-2.5 sm:p-3 lg:p-4 bg-[#E8E8E8]/30 rounded-md border border-[#E8E8E8]">
                <div className="flex-1 pr-2 sm:pr-3 lg:pr-4">
                  <h4
                    className="text-[#495464] font-medium mb-0.5 sm:mb-1 text-xs sm:text-sm"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Бисквитки за производителност
                  </h4>
                  <p
                    className="text-[#495464]/70 text-[11px] sm:text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Бисквитките за производителност се използват за разбиране и анализиране на ключовите 
                    индекси за производителност на уебсайта, което помага за доставка на по-добро 
                    потребителско изживяване за посетителите.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-2 sm:ml-3 lg:ml-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.performance}
                    onChange={() => handleToggleCategory('performance')}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 sm:w-10 sm:h-5.5 lg:w-11 lg:h-6 bg-[#bbbfca] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#495464] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E8E8E8] after:border after:rounded-full after:h-4 after:w-4 sm:after:h-4.5 sm:after:w-4.5 lg:after:h-5 lg:after:w-5 after:transition-all peer-checked:bg-[#495464]"></div>
                </label>
              </div>

              {/* Advertisement Cookies */}
              <div className="flex items-center justify-between p-2.5 sm:p-3 lg:p-4 bg-[#E8E8E8]/30 rounded-md border border-[#E8E8E8]">
                <div className="flex-1 pr-2 sm:pr-3 lg:pr-4">
                  <h4
                    className="text-[#495464] font-medium mb-0.5 sm:mb-1 text-xs sm:text-sm"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Рекламни бисквитки
                  </h4>
                  <p
                    className="text-[#495464]/70 text-[11px] sm:text-xs leading-relaxed"
                    style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
                  >
                    Рекламните бисквитки се използват за предоставяне на посетителите персонализирани 
                    реклами въз основа на страниците, които сте посетили преди това, и за анализиране 
                    на ефективността на рекламните кампании.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer ml-2 sm:ml-3 lg:ml-4 shrink-0">
                  <input
                    type="checkbox"
                    checked={preferences.advertisement}
                    onChange={() => handleToggleCategory('advertisement')}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 sm:w-10 sm:h-5.5 lg:w-11 lg:h-6 bg-[#bbbfca] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#495464] rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#E8E8E8] after:border after:rounded-full after:h-4 after:w-4 sm:after:h-4.5 sm:after:w-4.5 lg:after:h-5 lg:after:w-5 after:transition-all peer-checked:bg-[#495464]"></div>
                </label>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-1.5 sm:pt-2">
              <button
                onClick={() => setShowSettings(false)}
                className="px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm text-[#495464] bg-white border border-[#E8E8E8] rounded-md hover:bg-[#E8E8E8] transition-all duration-200 font-medium"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Назад
              </button>
              <button
                onClick={handleSaveSettings}
                className="px-4 sm:px-5 lg:px-6 py-1.5 sm:py-2 lg:py-2.5 text-xs sm:text-sm text-white bg-[#495464] rounded-md hover:bg-[#3a4149] transition-all duration-200 font-medium"
                style={{ fontFamily: "var(--font-montserrat), sans-serif" }}
              >
                Запази моите предпочитания
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
