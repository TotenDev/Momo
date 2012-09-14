var Momo = require("./src/Momo.js");
var MM = new Momo({ cronURL:"https://dl.dropbox.com/u/72669102/teste.csv" });

//FULL OPTIONS
//var MM = new Momo({ cronURL:"https://dl.dropbox.com/u/72669102/teste.csv", cronFetchLoop:90000, momoFPS: 8000 });

//Set GMT into heroku with "heroku config:add TZ=GMT --app myApp"