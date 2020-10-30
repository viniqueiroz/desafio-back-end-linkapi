const schedule = require('node-schedule');
const syncPipedriveBlingDeals = require('./app/jobs/sync-pipedrive-bling-deals');
const config = require("./config/app");
exports.boot = () => {
    schedule.scheduleJob(config.integrationFrequency, function () {
        syncPipedriveBlingDeals.run();
    });
}