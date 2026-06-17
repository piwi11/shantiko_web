const baseUrl = (process.env.SITE_URL || "https://shantiko.com").replace(
    /\/+$/,
    ""
);

export default {
    url: baseUrl
};
