const path = require("path");

module.exports = {
    entry: "./src/Freeland.js",
    output: {
        filename: "freeland.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "development"
};

