import translations from "./translations";
// import Configuration from './offline/Configuration.json';
import Roles from "./offline/Roles.json";
import lastUpdated from "./offline/lastUpdate.json";
import Translations from "./offline/Translations.json";
import Pages from "./offline/Pages.json";
import Forms from "./offline/Forms.json";
import LocalConfiguration from "./LocalConfiguration";

// const loadedConfig = process.env.FAST_CONFIG_URL ? Configuration : LocalConfiguration;
const loadedConfig = LocalConfiguration;
export default {
  type: "remote",
  fluentFormioBaseUrl: process.env.REACT_APP_FLUENT_FORMIO_BASEURL,
  appConfigUrl: process.env.REACT_APP_FAST_CONFIG_URL,
  expressBaseUrl: process.env.REACT_APP_EXPRESS_BASEURL,
  loopbackBaseUrl: process.env.REACT_APP_LOOPBACK_BASEURL,
  i18n: translations,
  offlineFiles: {
    Configuration: loadedConfig,
    Roles,
    lastUpdated,
    Translations,
    Pages,
    Forms
  }
};
