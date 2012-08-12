//
// Momo.js — Momo
// today is 7/25/12, it is now 3:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var MomoJob = require('./Momo-Job.js'),
	util = require('util'),
	url = require('url');
/**
* Initialize Momo function
* @param Object options - options object - REQUIRED
* @param url options.cronURL - End point to fetch cronjob list - REQUIRED
* @param integer options.cronFetchLoop - Time interval to Momo fetch `options.cronURL` in seconds - Default value is:3600000 milliseconds - OPTIONAL
* @param integer options.momoFPS - Momo Check Loop (aka.FPS) in milliseconds - Default value is:60000 milliseconds - OPTIONAL
**/
module.exports = function (options) { return new Momo(options); }
function Momo(options) {
	MomoInstance = this;
	MomoInstance.container = new Array(); //Jobs container
	//Check for required values on options
	if (!options) { assert.ok(false,"Momo options are not specified."); }
	else if (!options["cronURL"] || options["cronURL"].length == 0) { assert.ok(false,"Momo options 'cronURL' is **REQUIRED**, but is not specified."); }
	//Get required values
	MomoInstance.cronURL = options["cronURL"];
	//Optional options
	if (!options["cronFetchLoop"] || options["cronFetchLoop"].length == 0) { MomoInstance.cronFetchLoop = "3600000"; }//set default value
	else { MomoInstance.cronFetchLoop = options["cronFetchLoop"]; }
	if (!options["momoFPS"] || options["momoFPS"].length == 0) { MomoInstance.momoRunLoopInterval = "60000"; }//set default value
	else { MomoInstance.momoRunLoopInterval = options["momoFPS"]; }
	
	//Fetch CSV
	MomoInstance.getCronList();
	//Try to execute jobs now
	MomoInstance.execCronsNow();
	
	//Ticks
	setInterval(function () { util.log("Cron Fetch Loop"); MomoInstance.getCronList();
	},parseInt(MomoInstance.cronFetchLoop));
	setInterval(function () { util.log("Cron Exec Loop"); MomoInstance.execCronsNow();
	},parseInt(MomoInstance.momoRunLoopInterval));
};




/*
Get Cronjob hook list
*/
Momo.prototype.getCronList = function getCronList(callback) {
	//Make request
	var MomoRequest = require("./Momo-Request.js")(url.parse(MomoInstance.cronURL),function (ok,resp) {
		//Try to format each Momo-Job into container
		if (ok && resp && resp.length > 0) { MomoInstance.parseServerResponse(resp);
		}else { util.log("Error when fetching CSV from server." + resp); }
	});
};
/*
Execute neededs crons with current date
*/
Momo.prototype.execCronsNow = function execCronsNow() {
	//Get current date
	var currentDate = new Date();
	//For all parsed jobs
	for (var i = 0; i < MomoInstance.container.length; i++) {
		var theJob = MomoInstance.container[i];//get job
		if (theJob.shouldExecuteOnDate(currentDate) == true) {//Check if should execute this jobs on this date
			var hookURL = theJob.executionURL();
			//Make request
			var MomoRequest = require("./Momo-Request.js")(hookURL,function (ok,resp,statusCode,url) { util.log("Hook response ("+ok+"-"+statusCode+") on: "+url); });
		}
	}
};



/*
Parse CSV and insert jobs if can
*/
Momo.prototype.parseServerResponse = function parseServerResponse(resp) {
	//Check for container and clean if needed
	if (MomoInstance.container && MomoInstance.container.length > 0) { MomoInstance.container.splice(0,MomoInstance.container.length); }
	//Start jobs parsing
	var jobs = resp.split("\n");
	if (jobs && jobs.length > 0) {
		for (var i = 0; i < jobs.length; i++) {
			var newJob = null;
			//Try to initialize Momo-Job
			try { 
				var tmp = MomoJob(jobs[i]);
				if (tmp == false) { util.log("Error when parsing line '"+jobs[i]+"'."); }
				else { newJob = tmp; }
			}catch (err){ util.log("Exception when parsing line '"+jobs[i]+"'. Err:"+err.stack); }
			//Check if got a Job
			if (newJob != null) { 
				MomoInstance.container.push(newJob); 
			}
		}
		util.log("("+MomoInstance.container.length+")Web CronJob Added");
	}else { return false; }
}