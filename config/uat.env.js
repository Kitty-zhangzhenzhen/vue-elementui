'use strict'
const merge = require('webpack-merge')
// const devEnv = require('./dev.env')

module.exports = merge({
  NODE_ENV: '"uat"',
  // BASE_API: '"/api"'
})
