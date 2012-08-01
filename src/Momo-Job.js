//
// Momo-Job.js — Momo
// today is 7/25/12, it is now 3:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var assert = require("assert");

/**
* Initialize Momo-Job function
**/
module.exports = function () { return new MomoJob(momoLine); }
function MomoJob(momoLine) {
	MomoJobObjectInstance = this;
	MomoJobObjectInstance.initLine = momoLine;
	//Do some formating job
	if (MomoJobObjectInstance.initLine.substr(0,1) == " ") {
		MomoJobObjectInstance.initLine = MomoJobObjectInstance.initLine.substr(1,(MomoJobObjectInstance.initLine.length - 1));
	}
	//Checks
	if (MomoJobObjectInstance.isCurrentInitLineValid() == false) { assert.ok(false,"Initial MomoJob line is not valid, something is missing"); }
};

/** Validate Line **/
MomoJob.prototype.isCurrentInitLineValid = function isCurrentInitLineValid() {
	//
	var commands = MomoJobObjectInstance.initLine.split(" ");
	if (commands.length > 5) { 
		for (var i = 0; i < commands.length; i++) {
			if (i < 5) {
				console.log(commands[i]);
				console.log(eval("1,2"));
			}
		} 
		console.log("de");
		return true;
	}
	else { return false; }
};
//
MomoJob.isCommandValid = function isCommandValid(command) {
	//Check if have numbers
//	if (command.match(/[0-9]+/)) { return true; }
//	else if (command.match)) { }
//	else if () { }
//	else if () { }
//	else if () { }
//	else {
//		
//	}
}
//
MomoJob.prototype.isCurrentInitLineValid2 = function isCurrentInitLineValid2() {
//	var commands = MomoJobObjectInstance.initLine.split(" ");
//	console.log(commands);
//	if (commands > 5) { return true; }
//	else { return false; }
};
new MomoJob(" * 1 2 * * * /coomand/");
new MomoJob("* 1 2 * * * /coomand/");