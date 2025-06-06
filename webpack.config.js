
module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules\/(?!@abhaytelerapp\/telerapp-lite)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
            plugins: ["@babel/plugin-transform-react-jsx"], // Ensure JSX is transformed correctly
          }
        }
      },
    ],
  },
};
