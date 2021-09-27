const i18next = require('i18next');
const i18nFsBackend = require('i18next-fs-backend');
const i18nHttpMiddleware = require('i18next-http-middleware');

i18next
  .use(i18nFsBackend)
  .use(i18nHttpMiddleware.LanguageDetector)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    ns: ['translation'],
    defaultNS: 'translation',
    backend: {
      loadPath: './locales/{{lng}}/{{ns}}.json',
    },
    detection: {
      lookupHeader: 'accept-language',
    },
  });

module.exports = i18next;
