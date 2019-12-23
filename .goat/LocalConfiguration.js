const currentDate = new Date();
const isoDate = currentDate.toISOString();

const config = {
  data: {
    APP_FANTACY_NAME: process.env.REACT_APP_APP_FANTACY_NAME,
    APP_PHRASE: process.env.REACT_APP_APP_PHRASE,
    loginKey: process.env.REACT_APP_LOGIN_KEY,
    APP_URL: process.env.REACT_APP_FLUENT_FORMIO_BASEURL,
    APP_NAME: process.env.REACT_APP_APP_FANTACY_NAME,
    LOCAL_DB_PASSWORD: process.env.REACT_APP_LOCAL_DB_PASSWORD,
    MD5_KEY: process.env.REACT_APP_MD5_KEY,
    OFFLINE_FIRST: process.env.REACT_APP_OFFLINE_FIRST
  },
  created: isoDate,
  modified: isoDate
};

export default config;
