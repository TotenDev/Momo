//
// Momo-Job.js — Momo
// today is 7/25/12, it is now 3:25 PM
// created by TotenDev
// see LICENSE for details.
//
	
var assert = require("assert"),
	parser = require('./Momo-Parser.js')(),
	util = require('util'),
	url = require('url');

/**
* Initialize Momo-Job function
**/
module.exports = function (momoLine) { return new MomoJob(momoLine); }
function MomoJob(momoLine) {
	this.initLine = momoLine;

	//Do some formating job
	if (this.initLine.substr(0,1) == " ") {
		this.initLine = this.initLine.substr(1,(this.initLine.length - 1));
	}
	//Checks
	if (this.isCurrentInitLineValid() == false) { assert.ok(false,"Initial MomoJob line is not valid, something is missing"); }
};

/** Validate Line **/
MomoJob.prototype.isCurrentInitLineValid = function isCurrentInitLineValid() {
	var commands = this.initLine.split(" ");
	if (commands.length > 5) { 
		for (var i = 0; i < commands.length; i++) {
			switch (i) {
				case 0:/*Minutes*/{
					var response = parser.commandAllowedValues(commands[i],59);
					if (typeof response == 'boolean' && response == false) { return false; /*ABORT*/}
					else { this.minutesValue = response ; }
				}break;
				case 1:/*Hours*/{
					var response = parser.commandAllowedValues(commands[i],23);
					if (typeof response == 'boolean' && response == false) { return false; /*ABORT*/}
					else { this.hoursValue = response ; }
				}break;
				case 2:/*Days of Month*/{
					var response = parser.commandAllowedValues(commands[i],31);
					if (typeof response == 'boolean' && response == false) { return false; /*ABORT*/}
					else { this.monthDaysValue = response ; }
				}break;
				case 3:/*Months*/{
					var response = parser.commandAllowedValues(commands[i],12);
					if (typeof response == 'boolean' && response == false) { return false; /*ABORT*/}
					else { this.monthsValue = response ; }
				}break;
				case 4:/*Days of Week*/{
					var response = parser.commandAllowedValues(commands[i],6);
					if (typeof response == 'boolean' && response == false) { return false; /*ABORT*/}
					else { this.daysOfWeekValue = response ; }
				}break;
				case 5:/*Hook URL*/{
					if (commands[i] && commands[i].length > 0) { this.hookURL = url.parse(commands[i]); }
					else { return false; /*ABORT*/}
				}break;
				default: break;
			}
		} return true; /*valid condition*/
	}
	else if (commands.length == 2) {
		//Auxs
		var zero = new Array(); zero.push(0);
		var one = new Array(); one.push(1);
		//Check for valid url
		if (commands[1] && commands[1].length > 0) {
			//Check for match special keywords
			if (commands[0].match("@yearly") || commands[0].match("@annually")) {
				this.minutesValue = zero; this.hoursValue = zero; this.monthDaysValue = one; 
				this.monthsValue = one; this.daysOfWeekValue = '*';
			}else if (commands[0].match("@monthly")) {
				this.minutesValue = zero; this.hoursValue = zero; this.monthDaysValue = one; 
				this.monthsValue = '*'; this.daysOfWeekValue = '*';
			}else if (commands[0].match("@weekly")) {
				this.minutesValue = zero; this.hoursValue = zero; this.monthDaysValue = '*';
				this.monthsValue = '*'; this.daysOfWeekValue = zero;
			}else if (commands[0].match("@daily")) {
				this.minutesValue = zero; this.hoursValue = zero; this.monthDaysValue = '*';
				this.monthsValue = '*'; this.daysOfWeekValue = '*';
			}else if (commands[0].match("@hourly")) {
				this.minutesValue = zero; this.hoursValue = '*'; this.monthDaysValue = '*';
				this.monthsValue = '*'; this.daysOfWeekValue = '*';
			}else { return false; }
			//Valid condition
			this.hookURL = url.parse(commands[1]);
			return true;	
		}
	}
	return false;
};
/** Check if should execute or not **/
MomoJob.prototype.shouldExecuteOnDate = function shouldExecuteOnDate(date) {
	//Count needed aprove commands 
	var approvePending = 0,deactivateds = 0;
	if (this.minutesValue != '*') { approvePending++; } else { deactivateds++; }
	if (this.hoursValue != '*') { approvePending++; } else { deactivateds++; }
	if (this.monthDaysValue != '*') { approvePending++; } else { deactivateds++; }
	if (this.monthsValue != '*') { approvePending++; } else { deactivateds++; }
	if (this.daysOfWeekValue != '*') { approvePending++; } else { deactivateds++; }
	//Check for minutes
	if (this.minutesValue.indexOf(date.getMinutes()) != -1) { approvePending--; }
	//Check for hours
	if (this.hoursValue.indexOf(date.getHours()) != -1) { approvePending--; }
	//Check for day of month
	if (this.monthDaysValue.indexOf(date.getDate()) != -1) { approvePending--; }
	//Check for months
	if (this.monthsValue.indexOf(date.getMonth()) != -1) { approvePending--; }
	//Check for days of week
	if (this.daysOfWeekValue.indexOf(date.getDay()) != -1) { approvePending--; }
	return (approvePending == 0 && deactivateds != 5);
}
/** Execution URL **/
MomoJob.prototype.executionURL = function executionURL() { 
	return this.hookURL; 
}