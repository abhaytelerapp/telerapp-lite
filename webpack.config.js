module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "src"),
          path.resolve(__dirname, "node_modules/@abhaytelerapp/telerapp-lite"), // Ensure your plugin is transpiled
        ],
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
        },
      },
    ],
  },
};
