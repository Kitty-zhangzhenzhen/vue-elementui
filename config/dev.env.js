'use strict'
const merge = require('webpack-merge')
// const prodEnv = require('./prod.env')

module.exports = merge({
  NODE_ENV: '"dev"',
  // BASE_API: '"/api"' //如果不需要代理，则替换为接口域名
})
