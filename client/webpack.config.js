const Dotenv = require('dotenv-webpack');

// require('dotenv').config();

Dotenv.config()

module.exports = {
  plugins: [new Dotenv()],
};
