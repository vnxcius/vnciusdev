import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

import br_translation from "./locales/br/translation.json";
import en_translation from "./locales/en/translation.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  en: { translation: en_translation.translation },
  br: { translation: br_translation.translation },
};

i18n
.use(initReactI18next) // passes i18n down to react-i18next
.use(LanguageDetector)
  .init({
    resources,
    supportedLngs: ["en", "br"],
    fallbackLng: "en",
    detection: {
      lookupLocalStorage: "lang",
    },

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;