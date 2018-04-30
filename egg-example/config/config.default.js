'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1525084892509_2294';

  // add your config here
  config.middleware = [];

  exports.mongoose = {
    url: 'mongodb://127.0.0.1/JserUser',
    options: {}
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
