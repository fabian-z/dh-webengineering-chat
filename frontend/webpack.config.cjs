const path = require('path');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, '..', 'static', 'js'),
    filename: 'bundle.js'
  },
  optimization: {
   usedExports: true,
  },
};
