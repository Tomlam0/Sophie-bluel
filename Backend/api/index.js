const app = require("../app");

module.exports = async (req, res) => {
    const { url, headers } = req;
    const [pathname, search] = url.split("?");
    const { host } = headers;

    req.url = pathname;
    req.headers.host = host.split(":")[0];
    req.query = Object.fromEntries(new URLSearchParams(search || ""));

    return app(req, res);
};
