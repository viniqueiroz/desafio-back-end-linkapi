const schedule = require('node-schedule');
const syncPipedriveBlingDeals = require('./app/jobs/sync-pipedrive-bling-deals');
const config = require("./config/app");
exports.boot = () => {
    // Run the syncPipedriveBlingDeals continuously based on configured frequency
    schedule.scheduleJob(config.integrationFrequency, function () {
        syncPipedriveBlingDeals.run();
    });
}