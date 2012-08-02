//
// Momo.js — Momo
// today is 7/25/12, it is now 3:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var url = require('url');
/**
* Initialize Momo function
* @param Object options - options object - REQUIRED
* @param url options.cronURL - End point to fecth cronjob list - REQUIRED
* @param integer options.cronFetchLoop - Time interval to Momo fetch `options.cronURL` in seconds - Default value is:3600 seconds - OPTIONAL
* @param integer options.momoFPS - Momo Check Loop (aka.FPS) in seconds of course - Default value is:60 seconds - OPTIONAL
**/
module.exports = function (options) { return new Momo(options); }
function Momo(options) {
	MomoInstance = this;
	//Check for required values on options
	if (!options) { assert.ok(false,"Momo options are not specified."); }
	else if (!options["cronURL"] || options["cronURL"].length == 0) { assert.ok(false,"Momo options 'cronURL' is **REQUIRED**, but is not specified."); }
	//Get required values
	MomoInstance.cronURL = options["cronURL"];
	//Optional options
	if (!options["cronFetchLoop"] || options["cronFetchLoop"].length == 0) { MomoInstance.cronFetchLoop = options["cronFetchLoop"]; }//set default value
	else { MomoInstance.cronFetchLoop = "3600"; }
	if (!options["momoFPS"] || options["momoFPS"].length == 0) { MomoInstance.momoRunLoopInterval = options["momoFPS"]; }//set default value
	else { MomoInstance.momoRunLoopInterval = "60"; }
	//Jobs container
	MomoInstance.container = new Array();
	//Fetch CSV
	MomoInstance.getCronList();
};

/*
Get Cronjob hook list
*/
Momo.prototype.getCronList = function getCronList(callback) {
	//Make request
	var MomoRequest = require("./Momo-Request.js")(MomoInstance.cronURL,function (ok,resp) {
		//Try to format each Mono-Job into container
		console.log(ok,resp);
	});
};

var MM = new Momo({ cronURL:"https://dl.dropbox.com/u/72669102/teste.csv" });