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
	//Check if valid and `parsable`
	var matches = command.match(/([0-9\/\/,*-])+/);
	if (matches && matches.length > 0) {
		//Get only first match
		var theCMD = matches[0];
		//
		if (theCMD == '*') { /*Deactivated Command*/
			return true;
		}else if (theCMD.split("/").length > 0) { /*Multi Command*/
			
		}else { /*Single Command*/
		
		}
	}else { return false; }
};
//
MomoJob.prototype.commandAllowedValues = function commandAllowedValues() {
	
};
//
MomoJob.prototype.commandAllowedValues = function commandAllowedValues() {
	
};

new MomoJob(" * 1 2 * * * /coomand/");
new MomoJob("* 1 2 * * * /coomand/");