const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./public/main.js",
  mode: "development",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist/",
  },
};
