const express = require('express');

const ioConf = require("./bin/conf/io"),
      routeConf = require("./bin/conf/routes"),
      engineConf = require("./bin/conf/engine");

const app = express();

module.exports = function(io) {

  /**
   * Configuration of the view engine
   * */
  engineConf(app, express);

  /**
   * Configuration of the Websockets
   * */
  ioConf(app, io);

  /**
   * Configuration of the web routes
   */
  routeConf(app);

  return app;
}
