const path = require("path");

module.exports = {
    entry: "./src/Freeland.js",
    output: {
        filename: "freeland.js",
        path: path.resolve(__dirname, "dist")
    },
    mode: "development",
    target: 'node-webkit', // 支持 NW.js 环境
    externals: {
        net: 'commonjs net' // 将 net 模块标记为外部模块
    }
};

