import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-chained-backend';
// import LocalStorageBackend from 'i18next-localstorage-backend';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
// don't want to use this?
// have a look at the Quick start guide
// for passing in lng and translations on init
// const localStorageOptions = {
//   /* below options */
//   // prefix for stored languages
//   prefix: 'i18next_res_',

//   // expiration
//   expirationTime: 7 * 24 * 60 * 60 * 1000,

//   // can be either window.localStorage or window.sessionStorage. Default: window.localStorage
//   store: window.localStorage,
// };
const httpOptions = {
  /* translation file path */
  loadPath: '/assets/i18n/{{ns}}/{{lng}}/translations.json',
};

i18n
  // load translation using http -> see /public/locales (i.e. https://github.com/i18next/react-i18next/tree/master/example/react/public/locales)
  // learn more: https://github.com/i18next/i18next-http-backend
  .use(Backend)
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    lng: process.env.REACT_APP_DEFAULT_LANG || 'vi',
    backend: {
      backends: [
        // LocalStorageBackend, // primary
        HttpBackend, // fallback
      ],
      backendOptions: [
        // localStorageOptions, // primary
        httpOptions,
      ], // fallback
    },
    fallbackLng: ['en', 'vi'],
    debug: false,
    ns: ['xcbt'],
    defaultNS: 'xcbt',
    nsSeparator: false,
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
      formatSeparator: ',',
    },
    react: {
      // wait: true,
      useSuspense: true,
    },
  });

export default i18n;
