const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.js", // Ensure entry point is correct
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js", // Ensure Webpack generates output
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!@abhaytelerapp\/telerapp-lite)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]",
              outputPath: "images",
              publicPath: "images",
            },
          },
        ],
      },      
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/components/image/icon/lite"),
          to: "images", // This will copy to "dist/images/"
          globOptions: {
            ignore: ["**/.DS_Store"],
          },
          noErrorOnMissing: true,
        },
      ],
    }),
  ],
};
