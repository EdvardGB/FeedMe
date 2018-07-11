const HtmlWebPackPlugin = require("html-webpack-plugin");

const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html"
});

module.exports = {
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }, {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, {
        test: /\.less$/,
        loaders: ["style-loader", "css-loader", "less-loader"]
      }, 
      {
        test: /\.(png|jpg)$/, 
        loader: 'url-loader?limit=8192' 
      }
    ]
  },
  plugins: [htmlPlugin]
};