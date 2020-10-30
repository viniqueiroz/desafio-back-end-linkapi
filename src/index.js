const express = require("express");
const db = require("./database/config");
const mongoose = require("mongoose");

require('dotenv').config();
require("./schedules").boot();

class App {
  constructor() {
    this.express = express();

    this.database();
    this.middlewares();
    this.routes();
    this.express.listen(3001, () =>
      console.log(`Sua API REST está funcionando na porta 3001 em modo ${process.env.NODE_ENV}`)
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