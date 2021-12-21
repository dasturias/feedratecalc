var ConfigCommon = require('./webpack.config.js');

ConfigCommon[ 'devtool' ] = 'source-map';
ConfigCommon[ 'watch' ] = true;
ConfigCommon[ 'mode' ] = 'development';

module.exports = ConfigCommon;
