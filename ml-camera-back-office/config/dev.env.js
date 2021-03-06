'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  API_URL: '"http://localhost:8000"',
  NODE_API_URL: '"http://localhost:3000"',
  PYTHON_API_URL: '"http://localhost:8080"',
  MAIN_TYPE: '"dev"',
})
