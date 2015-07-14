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
    //Hardcoded options
	MomoInstance.momoRunLoopInterval = "60000";

	//Fetch CSV
	MomoInstance.getCronList();	
	//Simple tick loop
	setInterval(function () { util.log("Cron Fetch Loop"); MomoInstance.getCronList(); },parseInt(MomoInstance.cronFetchLoop));

	//Cronjob function, called each time the cron is executed, so we schedule next call
	function cronJob() {
		//Schedule Synchronized Loop, so we dont get of sync 
		nextMinute(function () {
          util.log("Exec loop"); 
          MomoInstance.execCronsNow(); 
          cronJob();
		});
	}
	//Start it
	util.log("Starting cron loop routine..."); 
	cronJob();
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
Execute neededs crons with current date in GMT
*/
Momo.prototype.execCronsNow = function execCronsNow() {
	//Get current date
	var currentDate = GMTDate();
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
		util.log("Added "+MomoInstance.container.length+" cron job(s).");
	}else { return false; }
}


//HELPER FUNCTIONs
function GMTDate() { /*Get Date o GMT*/
	var now = new Date(); 
	var currentDate = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(),  now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds(),now.getUTCMilliseconds());
	return currentDate;
}
function nextMinute(callback) {
	//Sync microseconds ! (second 00. Ex. 12:34:00) 
	var _now = GMTDate();
  //reduce precision so we do not make cron before it time, for some os priority reason.
	var elapsed = (_now.getMilliseconds() > 100 ? _now.getMilliseconds() : 0);
	elapsed += (_now.getSeconds()*1000);
  //Async callback
	setTimeout(function () { /*Schedule callback*/ callback(); },(60000-elapsed));
	//Check for logging
	if (elapsed != 0) util.log("Fixing routine in " + elapsed + " milliseconds.\nNext routine in " + (60000-elapsed) + "!");
}	