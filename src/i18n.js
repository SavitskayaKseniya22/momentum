import i18next from 'i18next';
import locI18next from "loc-i18next";
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from "i18next-http-backend";

i18next.use(Backend).use(LanguageDetector).init({
  fallbackLng: "en",
  debug: true,
  backend: {
    loadPath: "/assets/json/locales/{{lng}}/{{ns}}.json",
  }
});

export const localize = locI18next.init(i18next);

export function translateContent() {
  localize('body');
}

export function checkLanguage() {
  return i18next.language || window.localStorage.getItem('i18nextLng') || 'en';
}

i18next.on('languageChanged', () => {
  translateContent();
});









