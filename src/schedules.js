const schedule = require('node-schedule');
const syncPipedriveBlingDeals = require('./app/jobs/sync-pipedrive-bling-deals');

exports.boot = () => {
    var j = schedule.scheduleJob('* * * * *', function () {
        syncPipedriveBlingDeals.run();
    });
}