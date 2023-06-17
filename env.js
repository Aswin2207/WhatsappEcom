const production = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'production',
};

const development = {
    ...process.env,
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: '9000',
    Meta_WA_accessToken:"EAAJCXbH3AhgBAAPWPBbaeEbN4FHrRr0cvK2wgReDAEM1hmi6MMNgSZC89VrINx4ovs3v83WjZBQrDen6FCEiIKxgaNmz42oZCMw7YYUbCv7jNZATSx6p2CLann8IZA3cE9Q6GItZCu1qQJX8tEhtnYjyjcROldLWSf8mwWCn51ZBIojkur7cZBa7vhrZCOsIKeb4DYkWsh3YngwZDZD",
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