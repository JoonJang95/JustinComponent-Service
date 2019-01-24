const path = require('path');

const dir_in = path.join(__dirname, '/client');
const dir_out = path.join(__dirname, '/client/dist');
const Dotenv = require('dotenv-webpack');

// fix webpacl config in morning

module.exports = {
  entry: `${dir_in}/index.jsx`,
  output: {
    filename: 'bundle.js',
    path: dir_out,
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        include: dir_in,
        loader: 'babel-loader',
        query: {
          presets: ['react'],
        },
      },
    ],
  },
  plugins: [new Dotenv()],
  node: {
    fs: 'empty',
  },
};
