const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production',
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: '9000',
    Meta_WA_accessToken:'EAAJCXbH3AhgBALOIyDr0STVWJBm0Ju2OSxqZAvDOJmH1af0zQve7GYu8ZAxtWNMQdClzOPlsUZBGAduTdalZA1hRnC7C2alGOZC9CxgvZBkZCbDgcxYAQoiwR565AHc7O32wo64yoDGpSPMRo51RAaQ5nwLm57aTioDdZBbl9ehK2GfGms2FDaqAMGLiAKeBDZBFuWZCWXMaG2XQZDZD',
    Meta_WA_SenderPhoneNumberId: '102205112750129',
    Meta_WA_wabaId: '100962766209949',
    Meta_WA_VerifyToken: '123456ABXSS',
};

const fallback = {
    ...process.env,
    NODE_ENV: undefined,
};

module.exports = (environment) => {
    console.log(`Execution environment selected is: "${environment}"`);
    if (environment === 'production') {
        return production;
    } else if (environment === 'development') {
        return development;
    } else {
        return fallback;
    }
};