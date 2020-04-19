const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const SRC = path.resolve(__dirname, "src");
const DIST = path.resolve(__dirname, "dist");

const base = {
  context: SRC,
  resolve: {
    modules: ["node_modules", SRC],
    extensions: [".js", ".ts", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "ts-loader"],
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ],
  },
  plugins: [new CompressionPlugin()],
  externals: {
    effector: "effector",
  },
};

const core = {
  ...base,
  entry: { index: "./index.ts" },
  output: {
    library: "effector-extensions",
    libraryTarget: "commonjs2",
    filename: "./[name].js",
    path: DIST,
  },
};

module.exports = core;
