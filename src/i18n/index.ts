//* Import necessary modules and libraries for internationalization (i18n)
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

//* Import translation data for English language
import en from './translations/en.json';

//* Import constants, in this case, language codes
import { LOCALS } from './constants.ts';

//* Define language resources with English translations
const resources = {
  [LOCALS.EN]: {
    translation: en,
  },
};
//* Initialize i18n with necessary plugins
i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    fallbackLng: LOCALS.EN,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
