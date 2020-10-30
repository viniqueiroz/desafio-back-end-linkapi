module.exports = {
    pipedriveApiToken: process.env.PIPEDRIVE_API_TOKEN,
    blingApiKey: process.env.BLING_API_KEY,
    blingApiUrl: process.env.BLING_API_URL,
    integrationFrequency: (process.env.BLING_API_URL) ? process.env.BLING_API_URL : '* * * * *',
    port: (process.env.PORT) ? process.env.PORT : 3001,
};