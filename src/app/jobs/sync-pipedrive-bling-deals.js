const PipedriveController = require('../controllers/pipedrive-controller');
const BlingController = require('../controllers/bling-controller');

exports.run = async () => {
    var deals = await PipedriveController.getDeals();
    await BlingController.storeOrders(deals);
}