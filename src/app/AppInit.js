import axios from 'axios';
import moment from 'moment';
import logger from 'loglevel';
import prefix from 'loglevel-plugin-prefix';
import * as Sentry from '@sentry/browser';
import './AppLanguage';

function configSentry() {
  console.debug = () => {};
  console.error = () => {};
  if (process.env.NODE_ENV !== 'development') {
    console.log = () => {};

    let release = '';
    if (
      typeof process.env.REACT_APP_SENTRY_RELEASE == 'undefined ' ||
      process.env.REACT_APP_SENTRY_RELEASE == '@@REACT_APP_SENTRY_RELEASE@@'
    ) {
      release = moment().format('YYYYMMDDHHMM');
    } else {
      release = process.env.REACT_APP_SENTRY_RELEASE;
    }
    if (process.env.REACT_APP_SENTRY_ENVIRONMENT == 'production') {
      Sentry.init({
        release: release,
        environment: process.env.REACT_APP_SENTRY_ENVIRONMENT,
        dsn: process.env.REACT_APP_SENTRY_DSN,
      });
    }
  }
}

function configAxios() {
  axios.defaults.timeout = 30000;
}

function configLoggers() {
  logger.getLogger('CM.16-upload-corporate').setLevel('DEBUG');
  logger.setDefaultLevel('INFO'); // default level INFO, dont need to set others
  prefix.reg(logger);
}

function unregisterServiceWorker() {
  if (navigator && navigator.serviceWorker) {
    navigator.serviceWorker.getRegistrations().then(function (registrations) {
      for (let registration of registrations) {
        registration.unregister();
      }
    });
  }
}

export default async function () {
  configAxios();
  configSentry();
  configLoggers();

  unregisterServiceWorker();

  return;
}
