import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
//*Data
import en from './translations/en.json';
//*Constants
import { LOCALS } from './constants.ts';

const resources = {
  [LOCALS.EN]: {
    translation: en,
  },
};

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
