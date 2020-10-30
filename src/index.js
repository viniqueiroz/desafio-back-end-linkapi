require('dotenv').config();
const express = require("express");
const db = require("./database/config");
const mongoose = require("mongoose");
const config = require("./config/app");
require("./schedules").boot();

class App {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
    this.express.listen(config.port, () =>
      console.log(`The App is running on port ${config.port} in ${process.env.NODE_ENV} mode`)
    );
  }

  database() {
    mongoose.connect(db[process.env.NODE_ENV], {
      useNewUrlParser: true, useUnifiedTopology: true
    });
  }

  middlewares() {
    this.express.use(express.json());
  }

  routes() {
    this.express.use(require("./routes"));
  }
}
module.exports = new App().express;