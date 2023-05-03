const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  devtool: "eval-source-map",
  entry: "./src/index.ts",
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        include: [path.resolve(__dirname, "src")],
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader", // compiles Sass to CSS
        ],
      },
      // Models
      {
        test: /\.(glb|gltf|fbx|obj)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              outputPath: "assets/models/",
            },
          },
        ],
      },
      {
        test: /\.(csv|tsv)$/i,
        use: ["csv-loader"],
      },
      {
        test: /\.xml$/i,
        use: ["xml-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  output: {
    publicPath: "",
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/assets"),
          to: path.resolve(__dirname, "dist/assets"),
        },
        {
          from: path.resolve(__dirname, "src/libs"),
          to: path.resolve(__dirname, "dist/libs"),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
};
