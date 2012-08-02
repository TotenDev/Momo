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
					else { MomoJobInstance.monthDaysValue = response ; }
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
				case 5:/*Hook URL*/{
					if (commands[i] && commands[i].length > 0) { MomoJobInstance.hookURL = commands[i]; }
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
/** Check if should execute or not **/
MomoJob.prototype.shouldExecuteOnDate = function shouldExecuteOnDate(date) {
	//Count needed aprove commands 
	var approvePending = 0;
	if (MomoJobInstance.minutesValue == '*') { approvePending++; }
	if (MomoJobInstance.hoursValue == '*') { approvePending++; }
	if (MomoJobInstance.monthDaysValue == '*') { approvePending++; }
	if (MomoJobInstance.monthsValue == '*') { approvePending++; }
	if (MomoJobInstance.daysOfWeekValue == '*') { approvePending++; }
	
	//Check for minutes
	if (MomoJobInstance.minutesValue.indexOf(date.getMinutes()) != -1) { approvePending--; }
	//Check for hours
	if (MomoJobInstance.hoursValue.indexOf(date.getHours()) != -1) { approvePending--; }
	//Check for day of month
	if (MomoJobInstance.monthDaysValue.indexOf(date.getDate()) != -1) { approvePending--; }
	//Check for months
	if (MomoJobInstance.monthsValue.indexOf(date.getMonth()) != -1) { approvePending--; }
	//Check for days of week
	if (MomoJobInstance.daysOfWeekValue.indexOf(date.getDay()) != -1) { approvePending--; }
	return (approvePending == 0);
}
/** Execution URL **/
MomoJob.prototype.executionURL = function executionURL() { return MomoJobInstance.hookURL; }