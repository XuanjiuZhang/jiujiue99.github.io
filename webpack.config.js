const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const ROOT = path.resolve(__dirname);

module.exports = {
  devServer: {
    contentBase: './dist'
  },
  resolve: {
    extensions: [".jsx", ".js"],
    alias: {
      '@src': path.resolve(ROOT, "src"),
      '@api': path.resolve(ROOT, "src/api")
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9999
  },
  externals: {
    "react": "React",
    "react-dom": "ReactDOM",
    "react-router-dom": "ReactRouterDOM",
    "mobx": "mobx",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      }, 
      {
        test: /\.(png|jpg|gif|svg)/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 100000000,
              name: "[name].[hash:8].[ext]"
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: "body"
    })
  ],
};