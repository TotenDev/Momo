// Start new relic agent
process.env['NEW_RELIC_HOME'] = (__dirname + '/appConf/');
var newrelic = require('newrelic');

//Momo server
var Momo = require("./src/Momo.js");
var MM = new Momo({ cronURL:process.env["CRONS_URL"], cronFetchLoop: process.env["CRON_FETCH_LOOP"] });

//Set GMT into heroku with "heroku config:add TZ=GMT --app myApp"