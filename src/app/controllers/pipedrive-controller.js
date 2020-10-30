const lib = require('pipedrive');
const config = require("../../config/app");

class PipedriveController {
    constructor() {
        lib.Configuration.apiToken = config.pipedriveApiToken;
    }

    async getDeals() {
        try {
            var deals = [];
            // API Filters
            var input = [];
            input['status'] = 'won';
            input['start'] = 0;
            input['limit'] = 50;
            var pagination = null;
            var again = false;
            do {
                var response = await lib.DealsController.getAllDeals(input);
                pagination = response.additional_data.pagination;
                deals = [...deals, ...response.data];
                again = pagination.more_items_in_collection;
                input['start'] = (again) ? pagination.next_start : 0;
            } while (again);
            return deals;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = new PipedriveController();