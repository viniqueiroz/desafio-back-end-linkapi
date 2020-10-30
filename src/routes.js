
const express = require("express");
const routes = express.Router();
const DealController = require("./app/controllers/deal-controller");

routes.get("/", function (req, res) {
    res.json([
        {
            route: '/deals',
            descriptions: 'Return all deals storeds'
        },
        {
            route: '/deals/:id',
            descriptions: 'Return a specific deal information'
        },
        {
            route: '/deals/reports',
            descriptions: 'Return all deals grouped by day with amount sum'
        },
    ]);
});
routes.get("/deals/reports", DealController.reports);
routes.get("/deals", DealController.index);
routes.get("/deals/:id", DealController.show);

module.exports = routes;