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
	MomoObjectInstance = this;
	
	//Check for required values on options
	if (!options) { assert.ok(false,"Momo options are not specified."); }
	else if (!options["cronURL"] || options["cronURL"].length == 0) { assert.ok(false,"Momo options 'cronURL' is **REQUIRED**, but is not specified."); }
	//Get required values
	MomoObjectInstance.cronURL = options["cronURL"];
	//Optional options
	if (!options["cronFetchLoop"] || options["cronFetchLoop"].length == 0) { MomoObjectInstance.cronFetchLoop = options["cronFetchLoop"]; }//set default value
	else { MomoObjectInstance.cronFetchLoop = "3600"; }
	if (!options["momoFPS"] || options["momoFPS"].length == 0) { MomoObjectInstance.momoRunLoopInterval = options["momoFPS"]; }//set default value
	else { MomoObjectInstance.momoRunLoopInterval = "60"; }
	//Fetch CSV
	MomoObjectInstance.container = new Array();
	MomoObjectInstance.getCronList();
};

/*
Get Cronjob hook list
*/
Momo.prototype.getCronList = function getCronList(callback) {
	//Get if is http or https
	var http = null;
	var requestURL = url.parse(MomoObjectInstance.cronURL);
	console.log(requestURL);
	if (requestURL.protocol == "https:") { http = require('https'); }
	else { http = require('http'); }
	//Make options from url
	var options = { host: requestURL['host'], port: 80, path:requestURL['path'], method: 'GET' }, responsed = false;
	var request = http.request(options,function (response) {
		response.on('data',function () {
			if (responsed == false) {
				responsed = true;
			}				
		});
		response.on('error',function () {
			if (responsed == false) {
				responsed = true;
			}				
		});
	});
	request.on('error',function () {
		if (responsed == false) {
			responsed = true;
		}
	});
	request.end();
};

var MM = new Momo({ cronURL:"https://dl.dropbox.com/u/72669102/teste.csv" });