//
// Momo.js — Momo
// today is 7/25/12, it is now 3:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var url = require('url'),
	MomoJob = require('./Momo-Job.js');
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
		//Try to format each Momo-Job into container
		if (ok && resp && resp.length > 0) { MomoInstance.parseServerResponse(resp);
		}else { console.log(ok,"Error when fetching CSV from server.",resp); }
	});
};

/*
Parse CSV and insert jobs if can
*/
Momo.prototype.parseServerResponse = function parseServerResponse(resp) {
	//Check for container and clean if needed
	if (MomoInstance.container && MomoInstance.container.length > 0) { MomoInstance.container.slice(0,MomoInstance.container.length); }
	//Start jobs parsing
	var jobs = resp.split("\n");
	if (jobs && jobs.length > 0) {
		for (var i = 0; i < jobs.length; i++) {
			var newJob = null;
			//Try to initialize Momo-Job
			try { 
				var tmp = MomoJob(jobs[i]);
				if (tmp == false) { console.log("Error when parsing line '"+jobs[i]+"'."); }
				else { newJob = tmp; }
			}catch (err){ console.log("Exception when parsing line '"+jobs[i]+"'. Err:",err.stack); }
			//Check if got a Job
			if (newJob != null) {
				MomoInstance.container.push(newJob);
				console.log("PUSH JOB",newJob);
			}
		}
	}else { return false; }
}

var MM = new Momo({ cronURL:"https://dl.dropbox.com/u/72669102/teste.csv" });