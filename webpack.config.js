const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  module: {
    plugins: [
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/components/image/icon/lite'),
                    to: path.resolve(__dirname, 'dist/components/image/icon/lite')
                }
            ]
        })
    ],
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!@abhaytelerapp\/telerapp-lite)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"]
          }
        }
      },
    ],
  },
};
