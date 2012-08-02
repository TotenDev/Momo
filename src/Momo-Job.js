//
// Momo-Job.js — Momo
// today is 7/25/12, it is now 3:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var assert = require("assert"),
	parser = require('./Momo-Parser.js')();

/**
* Initialize Momo-Job function
**/
module.exports = function () { return new MomoJob(momoLine); }
function MomoJob(momoLine) {
	MomoJobInstance = this;
	MomoJobInstance.initLine = momoLine;
	//Do some formating job
	if (MomoJobInstance.initLine.substr(0,1) == " ") {
		MomoJobInstance.initLine = MomoJobInstance.initLine.substr(1,(MomoJobInstance.initLine.length - 1));
	}
	//Checks
	if (MomoJobInstance.isCurrentInitLineValid() == false) { assert.ok(false,"Initial MomoJob line is not valid, something is missing"); }
};

/** Validate Line **/
MomoJob.prototype.isCurrentInitLineValid = function isCurrentInitLineValid() {
	//
	var commands = MomoJobInstance.initLine.split(" ");
	if (commands.length > 5) { 
		for (var i = 0; i < commands.length; i++) {
			switch (i) {
				case 0:/*Minutes*/{
					var response = parser.commandAllowedValues(commands[i],59);
					if (response == false) { return false; /*ABORT*/}
					else { MomoJobInstance.minutesValue = response ; }
				}break;
				case 1:/*Hours*/{
					var response = parser.commandAllowedValues(commands[i],23);
					if (response == false) { return false; /*ABORT*/}
					else { MomoJobInstance.hoursValue = response ; }
				}break;
				case 2:/*Days of Month*/{
					var response = parser.commandAllowedValues(commands[i],31);
					if (response == false) { return false; /*ABORT*/}
					else { MomoJobInstance.monthsValue = response ; }
				}break;
				case 3:/*Months*/{
					var response = parser.commandAllowedValues(commands[i],12);
					if (response == false) { return false; /*ABORT*/}
					else { MomoJobInstance.monthsValue = response ; }
				}break;
				case 4:/*Days of Week*/{
					var response = parser.commandAllowedValues(commands[i],6);
					if (response == false) { return false; /*ABORT*/}
					else { MomoJobInstance.daysOfWeekValue = response ; }
				}break;
				case 5:/*Command*/{
					if (commands[i] && commands[i].length > 0) { MomoJobInstance.cmd = commands[i]; }
					else { return false; /*ABORT*/}
				}break;
				default:
					break;
			}
		} 
		return true;
	}
	else { return false; }
};
new MomoJob(" * 1 2 * * /coomand/");
new MomoJob("* 1-5/2 2 * 2/* /coomand/");