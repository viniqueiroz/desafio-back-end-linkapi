const PipedriveController = require('../controllers/pipedrive-controller');
const BlingController = require('../controllers/bling-controller');

exports.run = async () => {
    // Fetch deals from pipedrive api
    var deals = await PipedriveController.getDeals();
    // Save deals as Order on Bling and Locally
    await BlingController.storeOrders(deals);
}