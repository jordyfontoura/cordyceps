// config-overrides.js
const {alias, configPaths} = require('react-app-rewire-alias')
var sass = require('node-sass');


module.exports = function override(config) {
  return alias(configPaths('./tsconfig.paths.json'))(config)
}