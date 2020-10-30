const Deal = require("../models/deal");
var moment = require('moment');

class DealController {

  async storeDeal(deal) {
    const data = await Deal.create(deal).catch((error) => {
      console.log(error);
    });

    return data;
  }
  async index(req, res) {
    // Get all deals
    const data = await Deal.find({}).catch((error) => {
      return res.status(500).send({
        message:
          error.message || "A Error ocurred on retrieve data."
      });
    });
    return res.json(data);
  }

  async show(req, res) {
    // Find deals by id
    const data = await Deal.findById(req.params.id).catch((error) => {
      return res.status(500).send({
        message:
          error.message || "Some error occurred while retrieving deal."
      });
    });

    if (!data) {
      return res.status(404).send({ message: `Not found Deal with id ${req.params.id}` });
    } else {
      return res.send(data);
    }
  }

  async reports(req, res) {
    // Find all deals
    const data = await Deal.find({}).catch((error) => {
      return res.status(500).send({
        message:
          error.message || "A Error ocurred on retrieve data."
      });
    });
    // Group the deals
    const deals = agregateDeals(data);

    return res.json(deals);
  }



}

function agregateDeals(deals) {
  let agregatedDeals = [];
  // Reduces array in another array based on date that deal occurs
  deals.reduce(function (res, current) {
    const orderDate = moment(current.date).format('DD/MM/YYYY');
    if (!res[orderDate]) {
      res[orderDate] = { date: orderDate, value: 0 };
      agregatedDeals.push(res[orderDate])
    }
    res[orderDate].value += current.value;
    return res;
  }, {});

  return agregatedDeals;
}

module.exports = new DealController();