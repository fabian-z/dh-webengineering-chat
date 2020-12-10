const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '..', 'static', 'js'),
    filename: 'bundle.js'
  },
  mode: "development",
  devtool: 'source-map',
  optimization: {
   usedExports: true,
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty',
    // prevent webpack from injecting eval / new Function through global polyfill
    global: false,
  },
};
