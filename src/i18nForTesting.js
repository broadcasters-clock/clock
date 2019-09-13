import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "../public/locales/en/translation.json";
import miTranslations from "../public/locales/mi/translation.json";

i18n.use(initReactI18next).init({
  resources: {
    EN: {
      translation: enTranslations
    },
    MI: {
      translation: miTranslations
    }
  },
  react: {
    useSuspense: false
  }
});

export default i18n;
