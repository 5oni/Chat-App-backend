// Fetching the environment
const env = process.env.NODE_ENV || 'development';

// Common Environment Variables
const commonVariables = {

    PASS_SALT_STATIC: 'dSDFeFenyL2jaSDasdaeFenyL2jas@766sar7^^#&W^FSDBGxg7dgBGxg7dgqw3FSQ',
    STATUS: [200, 500, 400, 401],
    SERVICE_REST_PORT: '8100',
    mongoConnectionString: 'mongodb://localhost/chat-app',
}

//setting the common variables
Object.keys(commonVariables).forEach((key) => {
    process.env[key] = commonVariables[key];
})

if (env === 'development') {
    var developmentEnvConfig = require('./development');
    Object.keys(developmentEnvConfig).forEach((key) => {
        process.env[key] = developmentEnvConfig[key];
    })

} else { // PRODUCTION

    var productionEnvConfig = require('./prod');
    Object.keys(productionEnvConfig).forEach((key) => {
        process.env[key] = productionEnvConfig[key];
    })
}

