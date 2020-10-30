
const express = require("express");
const routes = express.Router();
const DealController = require("./app/controllers/deal-controller");

routes.get("/", function (req, res) {
    res.send("Welcome to my app");
});
routes.get("/deals/reports", DealController.reports);
routes.get("/deals", DealController.index);
routes.get("/deals/:id", DealController.show);

module.exports = routes;